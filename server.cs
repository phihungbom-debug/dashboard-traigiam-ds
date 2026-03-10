using System;
using System.Net;
using System.IO;
using System.Collections.Generic;

class SimpleServer {
    static Dictionary<string, string> mimeTypes = new Dictionary<string, string> {
        {".html", "text/html; charset=utf-8"},
        {".htm",  "text/html; charset=utf-8"},
        {".css",  "text/css"},
        {".js",   "application/javascript"},
        {".json", "application/json"},
        {".png",  "image/png"},
        {".jpg",  "image/jpeg"},
        {".ico",  "image/x-icon"},
        {".woff2","font/woff2"},
        {".woff", "font/woff"},
        {".svg",  "image/svg+xml"},
    };

    static void Main(string[] args) {
        int port = 8000;
        string folder = Directory.GetCurrentDirectory();

        if (args.Length > 0) int.TryParse(args[0], out port);
        if (args.Length > 1) folder = args[1].TrimEnd('\\', '/');

        HttpListener listener = new HttpListener();
        // Lắng nghe trên TẤT CẢ địa chỉ IP — kể cả điện thoại cùng mạng
        listener.Prefixes.Add("http://+:" + port + "/");

        try {
            listener.Start();
        } catch {
            // Nếu không có quyền dùng http://+, fallback về localhost
            listener = new HttpListener();
            listener.Prefixes.Add("http://localhost:" + port + "/");
            listener.Start();
            Console.WriteLine("[!] Chay o che do localhost (chi xem duoc tren may nay).");
            Console.WriteLine("[!] De xem tren dien thoai, chay file nay voi quyen Admin.");
        }

        Console.WriteLine("==============================================");
        Console.WriteLine("  KHO SAN XUAT TRAI GIAM DONG SON - Server");
        Console.WriteLine("==============================================");
        Console.WriteLine("  Truy cap tren may nay: http://localhost:" + port);
        Console.WriteLine("  Truy cap mang noi bo : http://192.168.1.9:" + port);
        Console.WriteLine("  (Quet QR hoac copy link nay de xem tren dien thoai)");
        Console.WriteLine("  Thu muc phuc vu      : " + folder);
        Console.WriteLine("----------------------------------------------");
        Console.WriteLine("  De dung server: An Ctrl+C hoac dong cua so nay");
        Console.WriteLine("==============================================");

        while (true) {
            try {
                HttpListenerContext context = listener.GetContext();
                HttpListenerRequest request = context.Request;
                HttpListenerResponse response = context.Response;

                string urlPath = request.Url.LocalPath.TrimStart('/');
                if (string.IsNullOrEmpty(urlPath)) urlPath = "index.html";
                urlPath = urlPath.Replace('/', Path.DirectorySeparatorChar);

                string filePath = Path.Combine(folder, urlPath);

                if (urlPath.StartsWith("api" + Path.DirectorySeparatorChar + "fetch")) {
                    try {
                        string targetUrl = request.QueryString["url"];
                        if (!string.IsNullOrEmpty(targetUrl)) {
                            using (WebClient client = new WebClient()) {
                                // Giả lập trình duyệt để tránh bị Google chặn
                                client.Headers.Add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
                                byte[] data = client.DownloadData(targetUrl);
                                response.ContentType = "text/plain; charset=utf-8";
                                response.ContentLength64 = data.Length;
                                response.OutputStream.Write(data, 0, data.Length);
                            }
                            response.OutputStream.Close();
                            Console.WriteLine("[PROXY] " + targetUrl);
                            continue;
                        }
                    } catch (Exception ex) {
                        Console.WriteLine("[PROXY ERR] " + ex.Message);
                    }
                }

                if (File.Exists(filePath)) {
                    byte[] buffer = File.ReadAllBytes(filePath);
                    string ext = Path.GetExtension(filePath).ToLower();
                    string mime = "application/octet-stream";
                    if (mimeTypes.ContainsKey(ext)) mime = mimeTypes[ext];
                    response.ContentType = mime;
                    response.ContentLength64 = buffer.Length;
                    response.OutputStream.Write(buffer, 0, buffer.Length);
                    Console.WriteLine("[OK] " + request.Url.LocalPath);
                } else {
                    response.StatusCode = 404;
                    byte[] notFound = System.Text.Encoding.UTF8.GetBytes("404 Not Found: " + urlPath);
                    response.OutputStream.Write(notFound, 0, notFound.Length);
                }

                response.OutputStream.Close();

            } catch (Exception ex) {
                Console.WriteLine("[ERR] " + ex.Message);
                break;
            }
        }

        listener.Stop();
    }
}

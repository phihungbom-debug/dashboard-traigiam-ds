/**
 * ================================================================
 * DASHBOARD 5 SHEETS — Phiên bản cập nhật theo cấu trúc thực tế
 * ================================================================
 * Sheet 1: Kho đầu vào
 *   A=Ngày | B=Hàng | C=Chủng loại | D=Nhà cung cấp | E=Nhập(Bao) | F=Nhập(Kg)
 *   G=Xuất(Bao) | H=Xuất(Kg) | I=Tồn(Bao) | J=Tồn(Kg) | K=Hao hụt(%) | L=Ghi chú
 *
 * Sheet 2: Nhật Ký Sản Xuất (39 cột A..AM)
 *   A=Ngày tháng | B=Tên Đội | C=Lô
 *   D=Xuất A+ | E=Xuất A | F=Xuất B | G=Xuất C | H=Xuất Phá | I=Xuất Tiều C
 *   J=Xuất Mài lưng | K=Xuất Tỉa lưng | ... (nhiều cột Xuất)
 *   Sau đó: Nhập A+ TP | Nhập A TP | Nhập B TP | Nhập C TP | Nhập Phá TP | Nhập Dăm phá
 *           Nhập Tiểu TP | Nhập Dăm tiểu | Nhập Tỉa lưng TP | Nhập Dăm tỉa lưng
 *           Nhập Mài lưng TP | Nhập Dăm mài lưng | Nhập Tỉa mỏ TP | Nhập Dăm tỉa mỏ
 *           Nhập Hàu TP | Nhập Ruột hàu | Nhập Cơm | Nhập Khoan | Nhập Bột | Nhập Vụn
 *           Nhập Sánh A B C | Phạm dầu | Tổng KL nhập | Ghi chú
 *
 * Sheet 3: Nhật Ký Xuất Bán
 *   A=Ngày tháng | B=Khách hàng | C=Lô
 *   D=A+ TP | E=A TP | F=B TP | G=C TP | H=Sánh A | I=Sánh B | J=Sánh C
 *   K=Phá TP | L=Dăm phá | M=Tiểu TP | N=Dăm tiểu | ...
 *
 * Sheet 4: Tồn Kho Thành Phẩm
 *   A=Tên Thành Phẩm | B=Tổng Nhập Kho | C=Tổng Xuất Bán | D=🔥 TÒN KHO THỰC TẾ
 *   Tên hàng: A+ TP, A TP, B TP, C TP, Sánh A, Sánh B, Sánh C, Phá TP, Dăm phá,
 *             Tiểu TP, Dăm tiểu, Tỉa lưng TP, Dăm tỉa lưng, Mài lưng TP, Dăm mài lưng,
 *             Tỉa mỏ TP, Dăm tỉa mỏ, Hàu TP, Ruột hàu, Cơm, Khoan, Bột, Vụn, Sánh A B C
 *
 * Sheet 5: Năng Suất Các Đội (Cấu trúc tương tự Nhật Ký Sản Xuất)
 *   A=Ngày tháng | B=Tên Đội | C=Lô | D=Xuất... | ...
 * ================================================================
 */

// ---------------------------------------------------------------
// DỮ LIỆU MẪU (sát với dữ liệu thực tế)
// ---------------------------------------------------------------
const DEMO = {
    s1_khoDauVao: [
        { ngay: '28/02/2026', hang: 'Lứt', chungLoai: 'Đẽo', ncc: 'NCC Dịu', nhapKg: 4202, xuatKg: 4100, tonKg: 102 },
    ],
    s2_nhatKySX: [
        // 12 dòng dữ liệu từ 02/03 đến 03/03 — sát ảnh chụp thực
        { ngay: '02/03/2026', doi: 'Đội 42', tongNhapTP: 0, tongXuatTP: 348, tongKL: 348, xuatDetail: { 'Xuất Phá': 348 }, nhapDetail: {} },
        { ngay: '02/03/2026', doi: 'Đội 44', tongNhapTP: 160, tongXuatTP: 160, tongKL: 160, xuatDetail: { 'Xuất Tiều C': 160 }, nhapDetail: { 'Nhập Tiểu TP': 160 } },
        { ngay: '02/03/2026', doi: 'Đội 39', tongNhapTP: 0, tongXuatTP: 0, tongKL: 0, xuatDetail: {}, nhapDetail: {} },
        { ngay: '02/03/2026', doi: 'Đội 38', tongNhapTP: 0, tongXuatTP: 0, tongKL: 0, xuatDetail: {}, nhapDetail: {} },
        { ngay: '02/03/2026', doi: 'Đội 09', tongNhapTP: 145, tongXuatTP: 145, tongKL: 145, xuatDetail: { 'Xuất Tiều C': 145 }, nhapDetail: { 'Nhập Tiểu TP': 145 } },
        { ngay: '02/03/2026', doi: 'Đội 45', tongNhapTP: 138, tongXuatTP: 138, tongKL: 138, xuatDetail: { 'Xuất Tiều C': 138 }, nhapDetail: { 'Nhập Tiểu TP': 138 } },
        { ngay: '03/03/2026', doi: 'Đội 44', tongNhapTP: 0, tongXuatTP: 0, tongKL: 0, xuatDetail: {}, nhapDetail: {} },
        { ngay: '03/03/2026', doi: 'Đội 45', tongNhapTP: 103, tongXuatTP: 103, tongKL: 103, xuatDetail: { 'Xuất Tiều C': 103 }, nhapDetail: { 'Nhập Tiểu TP': 103 } },
        { ngay: '03/03/2026', doi: 'Đội 38', tongNhapTP: 52, tongXuatTP: 52, tongKL: 52, xuatDetail: { 'Xuất Tỉa lưng': 52 }, nhapDetail: { 'Nhập Tỉa lưng TP': 52 } },
        { ngay: '03/03/2026', doi: 'Đội 39', tongNhapTP: 0, tongXuatTP: 0, tongKL: 0, xuatDetail: {}, nhapDetail: {} },
        { ngay: '03/03/2026', doi: 'Đội 09', tongNhapTP: 38, tongXuatTP: 38, tongKL: 38, xuatDetail: { 'Xuất Phá': 38 }, nhapDetail: { 'Nhập Phá TP': 38 } },
    ],
    s3_xuatBan: [
        { ngay: '05/03/2026', khachHang: '', tongKL: 10000, detail: { 'A TP': 4000, 'B TP': 3000, 'C TP': 3000 } },
    ],
    s4_tonKho: [
        { ten: 'A+ TP', nhap: 410, xuat: 0, ton: 410 },
        { ten: 'A TP', nhap: 9960, xuat: 4000, ton: 5960 },
        { ten: 'B TP', nhap: 2313, xuat: 3000, ton: -687 },
        { ten: 'C TP', nhap: 3342.9, xuat: 3000, ton: 342.9 },
        { ten: 'Phá TP', nhap: 0, xuat: 0, ton: 0 },
        { ten: 'Dăm phá', nhap: 40, xuat: 0, ton: 40 },
        { ten: 'Tiểu TP', nhap: 914.5, xuat: 0, ton: 914.5 },
        { ten: 'Dăm tiểu', nhap: 67, xuat: 0, ton: 67 },
        { ten: 'Mài lưng TP', nhap: 738, xuat: 0, ton: 738 },
    ],
    s5_nangSuat: []
};

// ---------------------------------------------------------------
// LINK DỮ LIỆU — Google Sheet ID và GID từng sheet
// Sheet phải ở chế độ chia sẻ "Ai có link đều xem được"
// ---------------------------------------------------------------
const SHEET_ID = ''; // Đã nhúng link trực tiếp bên dưới
const SHEET_GIDS = { s1: '229518276', s2: '152877592', s3: '1603650706', s4: '1834568500', s5: '535952435' };

// Tạo các URL khác nhau cho cùng 1 sheet để thử lần lượt
function buildUrls(gid) {
    const base = `https://docs.google.com/spreadsheets/d/${SHEET_ID}`;
    return [
        // Cách 1: export CSV trực tiếp (cần sheet "chia sẻ cho mọi người xem")
        `${base}/export?format=csv&gid=${gid}`,
        // Cách 2: gviz (thường hoạt động tốt nhất qua proxy)
        `${base}/gviz/tq?tqx=out:csv&gid=${gid}`,
        // Cách 3: Pub URL (cần Publish to web) — user có thể nhập tay
        '',
    ].filter(Boolean);
}

// URL Publish CSV đã cấu hình sẵn (áp dụng cho mọi thiết bị)
const DEFAULT_URLS = {
    s1: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4sTDXZwd9HMdYijyn9vWYkBBzoUvOycH7o6MJ9pvFELuaEL4-wtbee0_59wbRXwkRLEcK7N2vxJ4m/pub?gid=229518276&single=true&output=csv',
    s2: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4sTDXZwd9HMdYijyn9vWYkBBzoUvOycH7o6MJ9pvFELuaEL4-wtbee0_59wbRXwkRLEcK7N2vxJ4m/pub?gid=152877592&single=true&output=csv',
    s3: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4sTDXZwd9HMdYijyn9vWYkBBzoUvOycH7o6MJ9pvFELuaEL4-wtbee0_59wbRXwkRLEcK7N2vxJ4m/pub?gid=1603650706&single=true&output=csv',
    s4: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4sTDXZwd9HMdYijyn9vWYkBBzoUvOycH7o6MJ9pvFELuaEL4-wtbee0_59wbRXwkRLEcK7N2vxJ4m/pub?gid=1834568500&single=true&output=csv',
    s5: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4sTDXZwd9HMdYijyn9vWYkBBzoUvOycH7o6MJ9pvFELuaEL4-wtbee0_59wbRXwkRLEcK7N2vxJ4m/pub?gid=535952435&single=true&output=csv'
};

// ---------------------------------------------------------------
// GLOBAL STATE
// ---------------------------------------------------------------
let CHARTS = {};
let DATA = { s1: null, s2: null, s3: null, s4: null, s5: null, tonRawMaterial: 0 };
let t3Days = '7', t5Days = '7';


// ---------------------------------------------------------------
// INIT
// ---------------------------------------------------------------
let _autoRefreshTimer = null;
let _refreshCountdown = 0;
const AUTO_REFRESH_MINUTES = 5; // Tự động làm mới mỗi X phút

document.addEventListener('DOMContentLoaded', () => {
    checkUrlForConfig(); // Đọc cấu hình từ URL (nếu có) để nạp cho máy mới
    setCurrentDate();
    loadSavedUrls();
    initDashboard();
    startAutoRefresh();
});

// Chức năng: Cho phép 1 link chứa tất cả cấu hình để máy khác mở lên là tự có!
function checkUrlForConfig() {
    const params = new URLSearchParams(window.location.search);
    let changed = false;
    ['s1', 's2', 's3', 's4', 's5'].forEach(k => {
        if (params.has(k)) {
            const val = params.get(k);
            if (val) localStorage.setItem(`url_${k}`, val);
            else localStorage.removeItem(`url_${k}`);
            changed = true;
        }
    });
    // Xóa query dơ khỏi url sau khi đã nạp
    if (changed) {
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

function startAutoRefresh() {
    if (_autoRefreshTimer) clearInterval(_autoRefreshTimer);
    _refreshCountdown = AUTO_REFRESH_MINUTES * 60;
    updateCountdown();
    _autoRefreshTimer = setInterval(() => {
        _refreshCountdown--;
        if (_refreshCountdown <= 0) {
            _refreshCountdown = AUTO_REFRESH_MINUTES * 60;
            initDashboard(); // tự động tải lại
        }
        updateCountdown();
    }, 1000);
}

function updateCountdown() {
    const el = elId('countdown');
    if (!el) return;
    const m = Math.floor(_refreshCountdown / 60);
    const s = _refreshCountdown % 60;
    el.textContent = `Làm mới sau: ${m}:${s.toString().padStart(2, '0')}`;
}

function setCurrentDate() {
    document.getElementById('currentDate').textContent =
        new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// ---------------------------------------------------------------
// BẢO VỆ MẬT KHẨU — Chỉ Admin mới vào được cài đặt
// ---------------------------------------------------------------
const ADMIN_PIN = '1407';        // ← Đổi mật khẩu ở đây
const SESSION_MINUTES = 30;            // Giữ đăng nhập X phút

function requirePin() {
    const lastAuth = parseInt(localStorage.getItem('pin_auth_time') || '0');
    if (Date.now() - lastAuth < SESSION_MINUTES * 60 * 1000) {
        toggleSettingsPanel(); // còn session → mở thẳng
        return;
    }
    const overlay = document.getElementById('pinOverlay');
    const input = document.getElementById('pwInput');
    const err = document.getElementById('pinError');
    if (overlay) overlay.classList.add('open');
    if (err) err.textContent = '';
    if (input) { input.value = ''; setTimeout(() => input.focus(), 120); }
}

function closePinModal() {
    const overlay = document.getElementById('pinOverlay');
    if (overlay) overlay.classList.remove('open');
}

function checkPin() {
    const input = document.getElementById('pwInput');
    const err = document.getElementById('pinError');
    const entered = input ? input.value.trim() : '';

    if (entered === ADMIN_PIN) {
        localStorage.setItem('pin_auth_time', Date.now().toString());
        closePinModal();
        setTimeout(() => toggleSettingsPanel(), 200);
        // Đổi icon 🔒→🔓 tạm 3 giây
        const ico = document.querySelector('#btnSettings i');
        if (ico) {
            ico.className = 'fa-solid fa-lock-open';
            setTimeout(() => { ico.className = 'fa-solid fa-lock'; }, 3000);
        }
    } else {
        // Sai mật khẩu
        if (err) err.textContent = '❌ Mật khẩu không đúng! Vui lòng thử lại.';
        if (input) {
            input.value = '';
            input.classList.add('shake');
            setTimeout(() => { input.classList.remove('shake'); input.focus(); }, 500);
        }
    }
}

function togglePwEye() {
    const input = document.getElementById('pwInput');
    const icon = document.getElementById('pwEyeIcon');
    if (!input || !icon) return;
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fa-solid fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fa-solid fa-eye';
    }
}

// ---------------------------------------------------------------
// SETTINGS
// ---------------------------------------------------------------

function toggleSettingsPanel() {
    document.getElementById('settingsPanel').classList.toggle('open');
    document.getElementById('settingsOverlay').classList.toggle('open');
}
function loadSavedUrls() {
    const keys = ['s1', 's2', 's3', 's4', 's5'];
    keys.forEach(k => {
        const saved = localStorage.getItem(`url_${k}`);
        const el = document.getElementById(`url_${k}`);
        if (el) el.value = saved || DEFAULT_URLS[k] || '';
    });
}
function saveSettings() {
    const keys = ['s1', 's2', 's3', 's4', 's5'];
    keys.forEach(k => {
        const el = document.getElementById(`url_${k}`);
        if (!el) return;
        const v = el.value.trim();
        // Nếu người dùng xóa trắng -> ưu tiên quay về mặc định
        if (v && v !== DEFAULT_URLS[k]) localStorage.setItem(`url_${k}`, v);
        else localStorage.removeItem(`url_${k}`);
    });
    toggleSettingsPanel();
    initDashboard();
}

function clearCacheAndReload() {
    if (confirm('Hành động này sẽ xóa các link cài đặt cũ và dùng lại link gốc tôi vừa nhúng. Bạn có muốn tiếp tục?')) {
        ['s1', 's2', 's3', 's4', 's5'].forEach(k => localStorage.removeItem(`url_${k}`));
        location.reload();
    }
}


function generateShareLink() {
    const keys = ['s1', 's2', 's3', 's4', 's5'];
    const params = new URLSearchParams();
    let hasData = false;
    keys.forEach(k => {
        const v = localStorage.getItem(`url_${k}`);
        if (v) { params.set(k, v); hasData = true; }
    });
    if (!hasData) return alert('Chưa có cấu hình tùy chỉnh để chia sẻ!');
    const shareUrl = window.location.origin + window.location.pathname + '?' + params.toString();
    navigator.clipboard.writeText(shareUrl).then(() => {
        alert('✅ ĐÃ COPY LINK CHIA SẺ! \n\nGửi link này cho sếp hoặc điện thoại khác, khi họ mở lên hệ thống sẽ TỰ ĐỘNG CẤU HÌNH cho họ luôn mà không cần nhập tay!');
    });
}

// ---------------------------------------------------------------
// MAIN INIT
// ---------------------------------------------------------------
async function initDashboard() {
    try {
        showLoading(true);
        spinRefresh(true);
        setStatus('info', '🔄 Đang tải dữ liệu đồng thời (Tăng tốc)...');

        const keys = ['s1', 's2', 's3', 's4', 's5'];
        const names = ['Kho đầu vào', 'Nhật Ký SX', 'Nhật Ký Xuất', 'Tồn Kho', 'Năng Suất'];

        // Dọn dẹp link cũ
        keys.forEach(k => {
            const saved = localStorage.getItem(`url_${k}`);
            if (saved && !saved.includes('2PACX-')) {
                localStorage.removeItem(`url_${k}`);
            }
        });

        const customUrls = keys.map(k => localStorage.getItem(`url_${k}`) || DEFAULT_URLS[k]);

        // TẢI SONG SONG (PARALLEL) ĐỂ TỐI ƯU TỐC ĐỘ
        const fetchPromises = keys.map((key, i) => 
            fetchCSVSmart(key, names[i], customUrls[i])
                .then(data => ({ data, name: names[i], success: true }))
                .catch(e => {
                    console.error(`❌ Lỗi ${names[i]}:`, e);
                    return { data: null, name: names[i], success: false };
                })
        );

        const results = await Promise.all(fetchPromises);
        const raw = results.map(r => r.data);
        const statusDetails = results.map(r => r.success ? `✅ ${r.name}` : `❌ ${r.name}`);
        const failCount = raw.filter(r => !r).length;

        // Gán dữ liệu (dùng Demo nếu lỗi)
        DATA.s1 = raw[0] ? parseKhoDauVao(raw[0]) : DEMO.s1_khoDauVao;
        DATA.s2 = raw[1] ? parseNhatKySX(raw[1]) : DEMO.s2_nhatKySX;
        DATA.s3 = raw[2] ? parseXuatBan(raw[2]) : DEMO.s3_xuatBan;
        const tonKhoData = raw[3] ? parseTonKho(raw[3]) : { items: DEMO.s4_tonKho, tonRaw: 0 };
        DATA.s4 = tonKhoData.items;
        DATA.tonRawMaterial = tonKhoData.tonRaw;
        DATA.s5 = raw[4] ? parseNangSuatCacDoi(raw[4]) : (raw[1] ? DATA.s2 : DEMO.s2_nhatKySX);

        if (failCount === 5) {
            loadDemo();
            setStatus('error', '❌ Lỗi kết nối toàn bộ! Vui lòng kiểm tra Internet.');
        } else {
            const msg = failCount > 0 ? '⚠️ Kết nối một phần' : '✅ Đã kết nối';
            setStatus(failCount > 0 ? 'demo' : 'success', `${msg}: ${statusDetails.join(' | ')}`);
            renderAll();
        }

        showLoading(false);
        spinRefresh(false);
    } catch (err) {
        console.error("Lỗi:", err);
        setStatus('error', '❌ Lỗi hệ thống: ' + err.message);
        showLoading(false);
        spinRefresh(false);
    }
}

function loadDemo() {
    DATA.s1 = DEMO.s1_khoDauVao;
    DATA.s2 = DEMO.s2_nhatKySX;
    DATA.s3 = DEMO.s3_xuatBan;
    DATA.s4 = DEMO.s4_tonKho;
    DATA.s5 = DEMO.s2_nhatKySX;
    renderAll();
}

function showErrorGuide() {
    setStatus('error', '❌ Không kết nối được! Sheet chưa "Xuất bản lên web" hoặc link sai định dạng. Bấm ⚙️ xem hướng dẫn.');
    setTimeout(() => toggleSettingsPanel(), 900);
}

// ---------------------------------------------------------------
// FETCH CSV SMART — Thử nhiều URL + nhiều proxy
// ---------------------------------------------------------------
async function fetchCSVSmart(sheetKey, name = '', customUrl = '') {
    const pubUrl = customUrl || DEFAULT_URLS[sheetKey] || '';
    if (!pubUrl) throw new Error('Không có URL');

    const strategies = [];

    // CHIẾN THUẬT VÀNG: Dùng Server nội bộ làm cầu nối (Ổn định tuyệt đối 100%)
    const localProxy = `${window.location.origin}/api/fetch?url=${encodeURIComponent(pubUrl)}`;
    strategies.push({ url: localProxy, desc: 'Máy chủ nội bộ (Ưu tiên)' });

    // Các phương án dự phòng khác
    strategies.push({ url: pubUrl, desc: 'Kết nối Google trực tiếp' });
    strategies.push({ url: `https://api.allorigins.win/raw?url=${encodeURIComponent(pubUrl)}`, desc: 'Cầu nối AllOrigins' });

    // Thử lần lượt
    for (const s of strategies) {
        try {
            const data = await fetchCSV_WithTimeout(s.url, 15000);
            if (data && data.length > 0) return data;
        } catch (e) {
            console.warn(`⚠️ ${name}: Thử bại qua ${s.desc}`);
        }
    }
    throw new Error('Không thể lấy dữ liệu dù đã thử qua Server nội bộ.');
}

// Fetch với tính năng Fail-Fast Timeout, loại bỏ treo máy
function fetchCSV_WithTimeout(url, maxWaitMs = 6000) {
    return new Promise(async (resolve, reject) => {
        let isDone = false;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            if (!isDone) {
                controller.abort();
                reject(new Error("Timeout quá số giây quy định"));
            }
        }, maxWaitMs);

        try {
            const res = await fetch(url, { signal: controller.signal });
            if (!res.ok) throw new Error(`HTTP Lỗi ${res.status}`);

            const text = await res.text();
            isDone = true;
            clearTimeout(timeoutId);

            Papa.parse(text, {
                header: false,
                skipEmptyLines: true,
                complete: result => {
                    const d = result.data;
                    if (d?.length > 0) {
                        const f = String(d[0][0] || '').toLowerCase();
                        if (f.startsWith('<!') || f.includes('<html') || f.includes('doctype html') || f.includes('google.com/url?')) {
                            return reject(new Error('Bị chặn HTML, không phải file Dữ liệu gốc'));
                        }
                    }
                    if (result.errors.length > 0 && (!d || d.length < 2)) {
                        return reject(new Error(result.errors[0].message));
                    }
                    resolve(d);
                }
            });
        } catch (e) {
            isDone = true;
            clearTimeout(timeoutId);
            reject(e);
        }
    });
}

// ---------------------------------------------------------------
// PARSERS — CẤU TRÚC THỰC TẾ
// ---------------------------------------------------------------

/**
 * Sheet 1: Kho đầu vào
 * A=Ngày | B=Hàng | C=Chủng loại | D=Nhà cung cấp | E=Nhập(Bao) | F=Nhập(Kg)
 * G=Xuất(Bao) | H=Xuất(Kg) | I=Tồn(Bao) | J=Tồn(Kg) | K=Hao hụt | L=Ghi chú
 */
function parseKhoDauVao(rows) {
    if (!rows || rows.length < 2) return DEMO.s1_khoDauVao;
    const h = rows[0].map(c => norm(c));

    // Tìm linh hoạt các cột dựa trên tên tiêu đề thực tế
    const iNhapKg = findAnd(h, 'nhap', 'kg') >= 0 ? findAnd(h, 'nhap', 'kg') : 5;
    const iXuatKg = findAnd(h, 'xuat', 'kg');
    const iTonKg = findAnd(h, 'ton', 'kg');
    const iHaoHut = findCol(h, 'hao');
    const iHang = findCol(h, 'hang') >= 0 ? findCol(h, 'hang') : 1;
    const iLoai = findCol(h, 'loai') >= 0 ? findCol(h, 'loai') : 2;
    const iNcc = findCol(h, 'cung') >= 0 ? findCol(h, 'cung') : 3;
    const iGhiChu = findCol(h, 'ghi');

    const result = [];
    for (let i = 1; i < rows.length; i++) {
        const r = rows[i];
        const ngay = String(r[0] || '').trim();
        if (!ngay || ngay.startsWith('<!')) continue;
        const nhapKg = pn(r[iNhapKg]);
        const xuatKg = pn(r[iXuatKg]);
        const tonKg = pn(r[iTonKg]);
        const haoHutKg = pn(r[iHaoHut]);

        if (nhapKg === 0 && xuatKg === 0 && tonKg === 0 && haoHutKg === 0) continue;
        result.push({
            ngay, hang: str(r[iHang]), chungLoai: str(r[iLoai]), ncc: str(r[iNcc]),
            nhapKg, xuatKg, tonKg, haoHutKg
        });
    }
    return result.length > 0 ? result : DEMO.s1_khoDauVao;
}

/**
 * Sheet 2 & 5: Nhật Ký Sản Xuất / Năng Suất Các Đội
 * A=Ngày tháng | B=Tên Đội | C=Lô
 * Các cột Xuất...: Xuất A+, Xuất A, Xuất B, Xuất C, Xuất Phá, Xuất Tiều C,
 *                  Xuất Mài lưng, Xuất Tỉa lưng, Xuất Tỉa mỏ, ...
 * Các cột Nhập...: Nhập A+ TP, Nhập A TP, Nhập B TP, Nhập C TP, Nhập Phá TP,
 *                  Nhập Dăm phá, Nhập Tiểu TP, Nhập Dăm tiểu, ...Nhập Sánh A B C
 * Cuối: Phạm dầu | Tổng KL nhập | Ghi chú
 */
function parseNhatKySX(rows) {
    if (!rows || rows.length < 2) return DEMO.s2_nhatKySX;
    const headers = rows[0];
    const hNorm = headers.map(c => norm(c));

    // Tìm cột Trạng thái (Nhập/Xuất)
    const iStatus = hNorm.findIndex(c => c.includes('trang thai') || c.includes('nhap/xuat') || c.includes('trangthai'));

    // Tìm các cột Đội (thường bắt đầu bằng từ "Đội")
    const teamCols = [];
    headers.forEach((h, idx) => {
        const hn = norm(h);
        if (hn.includes('doi')) teamCols.push({ idx, label: h.trim() });
    });

    // Nếu không tìm thấy cấu trúc cột theo chiều dọc (Status + Team Cols), dùng logic cũ (ngang)
    if (iStatus < 0 || teamCols.length === 0) {
        return parseNhatKySX_Legacy(rows);
    }

    const result = [];
    for (let i = 1; i < rows.length; i++) {
        const r = rows[i];
        const ngay = String(r[0] || '').trim();
        if (!ngay || ngay.startsWith('<!')) continue;

        const statusStr = norm(r[iStatus]);
        const isNhap = statusStr.includes('nhap');

        // QUAN TRỌNG: Tách mỗi đội thành một dòng dữ liệu riêng để biểu đồ có thể phân nhóm
        teamCols.forEach(col => {
            const val = pn(r[col.idx]);
            if (val === 0) return; // Bỏ qua đội không có sản lượng ở dòng này

            result.push({
                ngay,
                doi: col.label, // Gán tên Đội cụ thể (vd: "Đội 04")
                tongNhapTP: isNhap ? val : 0,
                tongXuatTP: !isNhap ? val : 0,
                tongKL: val,
                nhapDetail: isNhap ? { [col.label]: val } : {},
                xuatDetail: !isNhap ? { [col.label]: val } : {}
            });
        });
    }
    return result.length > 0 ? result : DEMO.s2_nhatKySX;
}

// Logic cũ cho các sheet có cấu trúc dàn ngang (như Sheet 5 cũ)
function parseNhatKySX_Legacy(rows) {
    const headers = rows[0];
    const hNorm = headers.map(c => norm(c));
    const iDoi = hNorm.findIndex(c => c.includes('doi') || c.includes('ten')) >= 0 ? hNorm.findIndex(c => c.includes('doi') || c.includes('ten')) : 1;

    const colsXuat = [], colsNhap = [];
    headers.forEach((h, idx) => {
        if (idx < 3) return;
        const hn = norm(h);
        if (hn.includes('xuat')) colsXuat.push({ idx, label: h.trim() });
        else if (hn.includes('nhap')) colsNhap.push({ idx, label: h.trim() });
    });

    const result = [];
    for (let i = 1; i < rows.length; i++) {
        const r = rows[i];
        const ngay = String(r[0] || '').trim();
        if (!ngay || ngay.startsWith('<!')) continue;
        const doi = str(r[iDoi]) || 'N/A';
        let tN = 0, tX = 0;
        const nD = {}, xD = {};
        colsNhap.forEach(c => { const v = pn(r[c.idx]); if (v) { tN += v; nD[c.label] = v; } });
        colsXuat.forEach(c => { const v = pn(r[c.idx]); if (v) { tX += v; xD[c.label] = v; } });
        if (tN === 0 && tX === 0) continue;
        result.push({ ngay, doi, tongNhapTP: tN, tongXuatTP: tX, tongKL: tN || tX, xuatDetail: xD, nhapDetail: nD });
    }
    return result;
}


/**
 * Sheet 3: Nhật Ký Xuất Bán
 * A=Ngày tháng | B=Khách hàng | C=Lô
 * D=A+ TP | E=A TP | F=B TP | G=C TP | H=Sánh A | I=Sánh B | J=Sánh C
 * K=Phá TP | L=Dăm phá | M=Tiểu TP | N=Dăm tiểu | ...
 */
function parseXuatBan(rows) {
    if (!rows || rows.length < 2) return DEMO.s3_xuatBan;
    const headers = rows[0];
    const hNorm = headers.map(c => norm(c));

    // Tìm cột Số lượng (thường là F - index 5)
    const iQty = hNorm.findIndex(c => c === 'so luong' || (c.includes('so luong') && c.includes('kg')));

    // Nếu tìm thấy cột Số lượng đơn lẻ (kiểu sheet mới)
    if (iQty >= 0) {
        const result = [];
        for (let i = 1; i < rows.length; i++) {
            const r = rows[i];
            const ngay = String(r[0] || '').trim();
            if (!ngay || ngay.startsWith('<!')) continue;
            const tongKL = pn(r[iQty]);
            if (tongKL === 0) continue;
            const hang = (str(r[1]) + " " + str(r[2])).trim(); // Ghép Hàng miếng + Hàng cây và xóa khoảng trắng dư
            result.push({ ngay, khachHang: str(r[4]) || 'N/A', tongKL, detail: { [hang]: tongKL } });
        }
        return result;
    }

    // Logic cũ (dàn ngang các loại hàng)
    const iKH = hNorm.findIndex(c => c.includes('khach')) >= 0 ? hNorm.findIndex(c => c.includes('khach')) : 1;
    const colsHang = [];
    headers.forEach((h, idx) => {
        if (idx < 3) return;
        const hn = norm(h);
        if (!hn || hn.includes('tong') || hn.includes('ghi') || hn.includes('don gia')) return;
        colsHang.push({ idx, label: h.trim() });
    });

    const result = [];
    for (let i = 1; i < rows.length; i++) {
        const r = rows[i];
        const ngay = String(r[0] || '').trim();
        if (!ngay || ngay.startsWith('<!')) continue;
        const detail = {};
        let sumHang = 0;
        colsHang.forEach(c => { const v = pn(r[c.idx]); if (v > 0) { detail[c.label] = v; sumHang += v; } });
        if (sumHang === 0) continue;
        result.push({ ngay, khachHang: str(r[iKH]), tongKL: sumHang, detail });
    }
    return result;
}


/**
 * Sheet 4: Tồn Kho Thành Phẩm
 * A=Tên Thành Phẩm | B=Tổng Nhập Kho | C=Tổng Xuất Bán | D=🔥 TÒN KHO THỰC TẾ
 */
function parseTonKho(rows) {
    if (!rows || rows.length < 2) return DEMO.s4_tonKho;
    const h = rows[0].map(c => String(c || ''));
    const hn = h.map(c => norm(c));

    // Tìm từng cột
    const iNhap = hn.findIndex(c => c.includes('nhap'));
    const iXuat = hn.findIndex(c => c.includes('xuat'));
    // Tồn: tìm 'ton' hoặc emoji 🔥
    let iTon = hn.findIndex(c => c.includes('ton') || c.includes('thuc'));
    if (iTon < 0) iTon = h.findIndex(c => c.includes('🔥'));

    const nIdx = iNhap >= 0 ? iNhap : 1;
    const xIdx = iXuat >= 0 ? iXuat : 2;
    const tIdx = iTon >= 0 ? iTon : 3;

    const result = [];
    let tonRaw = 0;
    // Lấy tồn nguyên liệu thô từ cột E (index 4), thường ở ô E2 (dòng dữ liệu đầu tiên)
    if (rows.length > 1) {
        tonRaw = pn(rows[1][4]);
    }

    for (let i = 1; i < rows.length; i++) {
        const r = rows[i];
        const ten = String(r[0] || '').trim();
        if (!ten) continue;
        const nhap = pn(r[nIdx]);
        const xuat = pn(r[xIdx]);
        const ton = pn(r[tIdx]);
        result.push({ ten, nhap, xuat, ton });
    }
    return { items: (result.length > 0 ? result : DEMO.s4_tonKho), tonRaw };
}

/**
 * Sheet 5: Năng Suất Các Đội (Đặc thù cột Tháng, Đội, Nhập, Xuất)
 */
function parseNangSuatCacDoi(rows) {
    if (!rows || rows.length < 2) return [];
    const h = rows[0].map(c => norm(c));
    // Tìm linh hoạt hơn: "đội", "đội trưởng", "tên đội"
    const iDoi = h.findIndex(c => c.includes('doi') || c.includes('ten'));
    const iXuat = h.findIndex(c => c.includes('xuat'));
    const iNhap = h.findIndex(c => c.includes('nhap'));

    if (iDoi < 0) return [];

    const result = [];
    for (let i = 1; i < rows.length; i++) {
        const r = rows[i];
        const month = String(r[0] || '').trim();
        if (!month || month.startsWith('<!')) continue;
        const doi = str(r[iDoi]) || "N/A";
        const tN = pn(r[iNhap]);
        const tX = pn(r[iXuat]);
        if (tN === 0 && tX === 0) continue;
        result.push({
            ngay: month,
            doi,
            tongNhapTP: tN,
            tongXuatTP: tX,
            tongKL: tN || tX,
            nhapDetail: { 'Nhập TP': tN },
            xuatDetail: { 'Xuất làm': tX }
        });
    }
    return result.length > 0 ? result : (DATA.s2 || []);
}


// ---------------------------------------------------------------
// RENDER TẤT CẢ
// ---------------------------------------------------------------
function renderAll() {
    renderKPIs();
    renderChart1();
    renderChart2();
    renderChart3();
    renderChart4();
    renderChart5();
    renderChart6();
    renderChart7();
    renderTable();
}

// ===== KPI =====
function renderKPIs() {
    const s1 = DATA.s1 || [];
    const s2 = DATA.s2 || [];
    const s3 = DATA.s3 || [];
    const s4 = DATA.s4 || [];

    const tongNhapNL = s1.reduce((a, r) => a + r.nhapKg, 0);
    const tongNhapTP = s2.reduce((a, r) => a + r.tongNhapTP, 0);
    const tongXuatBan = s3.reduce((a, r) => a + r.tongKL, 0);
    const tongTon = s4.filter(r => r.ton > 0).reduce((a, r) => a + r.ton, 0);
    const tonNguyenLieu = DATA.tonRawMaterial || 0;

    animCountKg(elId('kv1'), tongNhapNL);
    animCountKg(elId('kv2'), tongNhapTP);
    animCountKg(elId('kv3'), tongXuatBan);
    animCountKg(elId('kv4'), tongTon);
    animCountKg(elId('kv5'), tonNguyenLieu);
}

// ===== Chart 1: Kho Đầu Vào — Combo Bar (Nhập/Xuất) + Line (Tồn) =====
function renderChart1() {
    const s1 = DATA.s1 || [];
    const s3 = DATA.s3 || [];
    const s4 = DATA.s4 || [];

    // Nhập lấy ở tổng cột F sheet Kho đầu vào
    const tongNhapNL = s1.reduce((a, r) => a + (r.nhapKg || 0), 0);
    // Xuất lấy ở tổng cột F sheet Nhật Ký Xuất Bán
    const tongXuatBan = s3.reduce((a, r) => a + (r.tongKL || 0), 0);
    // Tồn lấy ở tổng cột D sheet Tồn Kho Thành Phẩm
    const tongTonTP = s4.filter(r => r.ton > 0).reduce((a, r) => a + (r.ton || 0), 0);

    destroyChart('c1');
    const ctx = elId('chart1').getContext('2d');

    CHARTS.c1 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['📦 Nhập nguyên liệu', '📤 Xuất thành phẩm', '📦 Tồn thành phẩm'],
            datasets: [
                {
                    label: 'Khối lượng (Kg)',
                    data: [tongNhapNL, tongXuatBan, tongTonTP],
                    backgroundColor: [
                        'rgba(245, 158, 11, 0.85)', // Vàng cam cho Nhập
                        'rgba(16, 185, 129, 0.85)', // Xanh lá cho Xuất
                        'rgba(139, 92, 246, 0.85)'  // Tím cho Tồn
                    ],
                    borderColor: ['#f59e0b', '#10b981', '#8b5cf6'],
                    borderWidth: 2,
                    borderRadius: 10,
                    barThickness: 60,
                    maxBarThickness: 80,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            // Tối ưu hóa hiệu năng: Tắt bớt hiệu ứng chuyển động khi di chuột
            hover: { animationDuration: 0 },
            animation: { duration: 400 }, // Animation lúc hiện biểu đồ lần đầu thôi
            interaction: {
                mode: 'nearest',
                axis: 'y', // Đổi sang 'y' vì biểu đồ đang nằm ngang
                intersect: true // Để 'true' giúp tooltip chỉ hiện khi chạm đúng thanh, đỡ lag hơn
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    enabled: true,
                    animation: false,
                    backgroundColor: 'rgba(8, 14, 26, 0.95)',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: (c) => ` Tổng: ${fmtKg(c.raw)}`
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false },
                    ticks: { color: '#94a3b8', font: { size: 12 }, callback: v => fmtKg(v) }
                },
                y: {
                    grid: { display: false },
                    ticks: { 
                        color: '#f8fafc', 
                        font: { size: 13, weight: '600', family: "'Outfit', sans-serif" } 
                    }
                }
            }
        }
    });
}

// ===== Chart 2: Sản lượng từng Đội (grouped bar) =====
function renderChart2() {
    const src = ((DATA.s5 && DATA.s5.length) ? DATA.s5 : DATA.s2) || [];
    if (!src.length) return;

    const byDoi = {};
    src.forEach(r => {
        const d = r.doi || 'N/A';
        if (!byDoi[d]) byDoi[d] = { nhap: 0, xuat: 0 };
        byDoi[d].nhap += r.tongNhapTP;
        byDoi[d].xuat += r.tongXuatTP;
    });
    const sorted = Object.entries(byDoi)
        .filter(([, v]) => v.nhap + v.xuat > 0)
        .sort((a, b) => (b[1].nhap + b[1].xuat) - (a[1].nhap + a[1].xuat));

    if (!sorted.length) return;
    destroyChart('c2');
    CHARTS.c2 = new Chart(elId('chart2').getContext('2d'), {
        type: 'bar',
        data: {
            labels: sorted.map(([k]) => k), datasets: [
                { label: 'Nhập TP (Kg)', data: sorted.map(([, v]) => v.nhap), backgroundColor: 'rgba(16,185,129,0.75)', borderColor: '#10b981', borderWidth: 1, borderRadius: 5 },
                { label: 'Xuất TP (Kg)', data: sorted.map(([, v]) => v.xuat), backgroundColor: 'rgba(239,68,68,0.65)', borderColor: '#ef4444', borderWidth: 1, borderRadius: 5 },
            ]
        },
        options: { ...cOpts(), plugins: { ...cOpts().plugins, tooltip: { ...cOpts().plugins.tooltip, callbacks: { label: c => `${c.dataset.label}: ${fmt(c.raw)} Kg` } } }, scales: dScales() }
    });
}

// ===== Chart 3: Nhật Ký Xuất Bán theo ngày =====
function renderChart3() {
    const d = DATA.s3 || [];
    if (!d.length) return;
    const byDate = {};
    d.forEach(r => byDate[r.ngay] = (byDate[r.ngay] || 0) + r.tongKL);
    let dates = Object.keys(byDate).sort();
    if (t3Days !== 'all') dates = dates.slice(-parseInt(t3Days));

    destroyChart('c3');
    const ctx = elId('chart3').getContext('2d');
    const gBar = ctx.createLinearGradient(0, 0, 0, 300);
    gBar.addColorStop(0, 'rgba(59,130,246,0.8)');
    gBar.addColorStop(1, 'rgba(59,130,246,0.2)');

    CHARTS.c3 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dates, datasets: [
                { label: 'Xuất Bán (Kg)', data: dates.map(dt => byDate[dt] || 0), backgroundColor: gBar, borderColor: '#3b82f6', borderWidth: 1, borderRadius: 6 }
            ]
        },
        options: { ...cOpts(), plugins: { ...cOpts().plugins, tooltip: { ...cOpts().plugins.tooltip, callbacks: { label: c => `Xuất bán: ${fmtKg(c.raw)}` } } }, scales: dScales() }
    });
}
function switchTab3(btn, days) {
    btn.closest('.chart-tabs').querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active'); t3Days = days; renderChart3();
}

// ===== Chart 4: Tồn Kho TP (Donut — chỉ hàng có tồn > 0) =====
function renderChart4() {
    const d = DATA.s4 || [];
    const hasTon = d.filter(r => r.ton > 0);
    if (!hasTon.length) {
        // Nếu không có tồn kho dương, hiển thị tất cả nhập
        const hasNhap = d.filter(r => r.nhap > 0);
        if (!hasNhap.length) return;
    }
    const sorted = [...(hasTon.length ? hasTon : d.filter(r => r.nhap > 0))].sort((a, b) => b.ton - a.ton);
    const labels = sorted.map(r => r.ten);
    const vals = sorted.map(r => Math.abs(r.ton));
    const pal = ['#8b5cf6', '#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#84cc16', '#f97316', '#a855f7', '#14b8a6', '#6366f1'];

    destroyChart('c4');
    CHARTS.c4 = new Chart(elId('chart4').getContext('2d'), {
        type: 'doughnut',
        data: { labels, datasets: [{ data: vals, backgroundColor: pal.slice(0, labels.length).map(c => c + 'cc'), borderColor: pal.slice(0, labels.length), borderWidth: 2, hoverOffset: 8 }] },
        options: {
            responsive: true, maintainAspectRatio: false, cutout: '68%', plugins: {
                legend: { position: 'bottom', labels: { color: '#94a3b8', padding: 8, font: { size: 10, family: "'Inter',sans-serif" }, usePointStyle: true, pointStyleWidth: 7 } },
                tooltip: {
                    backgroundColor: 'rgba(8,14,26,0.95)', titleColor: '#f1f5f9', bodyColor: '#94a3b8', padding: 12, cornerRadius: 8,
                    callbacks: { label: c => { const tot = vals.reduce((a, b) => a + b, 0); return ` ${fmtKg(c.raw)} (${tot > 0 ? ((c.raw / tot) * 100).toFixed(1) : 0}%)`; } }
                }
            }
        }
    });
}

// ===== Chart 5: Cân đối SX vs Xuất Bán theo ngày =====
function renderChart5() {
    // Ưu tiên dùng dữ liệu Nhật ký SX hàng ngày (s2) để so sánh khớp mốc thời gian với Xuất bán (s3)
    const sx = (DATA.s2 && DATA.s2.length) ? DATA.s2 : (DATA.s5 || []);
    const xb = DATA.s3 || [];

    const bySX = {}, byXB = {};
    sx.forEach(r => bySX[r.ngay] = (bySX[r.ngay] || 0) + r.tongNhapTP);
    xb.forEach(r => byXB[r.ngay] = (byXB[r.ngay] || 0) + r.tongKL);

    let dates = [...new Set([...Object.keys(bySX), ...Object.keys(byXB)])].sort();
    if (t5Days !== 'all') dates = dates.slice(-parseInt(t5Days));

    destroyChart('c5');
    const ctx = elId('chart5').getContext('2d');
    const gSX = ctx.createLinearGradient(0, 0, 0, 300);
    gSX.addColorStop(0, 'rgba(16,185,129,0.5)'); gSX.addColorStop(1, 'rgba(16,185,129,0.02)');
    const gXB = ctx.createLinearGradient(0, 0, 0, 300);
    gXB.addColorStop(0, 'rgba(236,72,153,0.5)'); gXB.addColorStop(1, 'rgba(236,72,153,0.02)');

    CHARTS.c5 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates, datasets: [
                { label: 'Nhập Thành Phẩm (SX)', data: dates.map(d => bySX[d] || 0), borderColor: '#10b981', backgroundColor: gSX, fill: true, tension: 0.4, borderWidth: 3, pointRadius: 4, pointHoverRadius: 7, pointBackgroundColor: '#fff', pointBorderColor: '#10b981' },
                { label: 'Xuất Bán', data: dates.map(d => byXB[d] || 0), borderColor: '#ec4899', backgroundColor: gXB, fill: true, tension: 0.4, borderWidth: 3, pointRadius: 4, pointHoverRadius: 7, pointBackgroundColor: '#fff', pointBorderColor: '#ec4899' },
            ]
        },
        options: { ...cOpts(), plugins: { ...cOpts().plugins, tooltip: { ...cOpts().plugins.tooltip, callbacks: { label: c => `${c.dataset.label}: ${fmtKg(c.raw)}` } } }, scales: dScales() }
    });
}
function switchTab5(btn, days) {
    document.querySelectorAll('#card5 .tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active'); t5Days = days; renderChart5();
}

// ===== Chart 6: Xếp hạng hiệu suất Đội (horizontal bar) =====
function renderChart6() {
    const src = ((DATA.s5 && DATA.s5.length) ? DATA.s5 : DATA.s2) || [];
    if (!src.length) return;

    const byDoi = {};
    src.forEach(r => {
        const d = r.doi || 'N/A';
        if (!byDoi[d]) byDoi[d] = { nhap: 0, xuat: 0 };
        byDoi[d].nhap += r.tongNhapTP;
        byDoi[d].xuat += r.tongXuatTP;
    });
    const sorted = Object.entries(byDoi)
        .filter(([, v]) => v.nhap + v.xuat > 0)
        .sort((a, b) => (b[1].nhap + b[1].xuat) - (a[1].nhap + a[1].xuat));

    if (!sorted.length) return;
    destroyChart('c6');

    CHARTS.c6 = new Chart(elId('chart6').getContext('2d'), {
        type: 'bar',
        data: {
            labels: sorted.map(([k]) => k), datasets: [
                { label: 'Tổng Nhập TP (Kg)', data: sorted.map(([, v]) => v.nhap), backgroundColor: 'rgba(16,185,129,0.75)', borderColor: '#10b981', borderWidth: 1, borderRadius: 5 },
                { label: 'Tổng Xuất TP (Kg)', data: sorted.map(([, v]) => v.xuat), backgroundColor: 'rgba(139,92,246,0.75)', borderColor: '#8b5cf6', borderWidth: 1, borderRadius: 5 },
            ]
        },
        options: {
            ...cOpts(),
            indexAxis: 'y',
            // Lưu ý: Chart nằm ngang (indexAxis: 'y') cần axis: 'y' để phản hồi cột chính xác nhất
            interaction: { mode: 'nearest', axis: 'y', intersect: false },
            plugins: {
                ...cOpts().plugins,
                tooltip: {
                    ...cOpts().plugins.tooltip,
                    mode: 'index',
                    axis: 'y',
                    animation: false,
                    callbacks: { label: c => `${c.dataset.label}: ${fmtKg(c.raw)}` }
                }
            },
            scales: dScales()
        }
    });
}

// ===== TABLE: Tồn Kho Thành Phẩm =====
function renderTable() {
    const d = DATA.s4 || [];
    const tbody = elId('tableBody');
    if (!d.length) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--muted)">Chưa có dữ liệu tồn kho</td></tr>';
        return;
    }
    const sorted = [...d].sort((a, b) => b.nhap - a.nhap);
    const totalNhap = sorted.reduce((s, r) => s + r.nhap, 0);

    tbody.innerHTML = sorted.map((r, i) => {
        const pct = totalNhap > 0 ? ((r.nhap / totalNhap) * 100).toFixed(1) : 0;
        const badge = r.ton > 200
            ? '<span class="badge-status badge-ok"><i class="fa-solid fa-check"></i> Đủ hàng</span>'
            : r.ton > 0
                ? '<span class="badge-status badge-warn"><i class="fa-solid fa-triangle-exclamation"></i> Còn ít</span>'
                : '<span class="badge-status badge-danger"><i class="fa-solid fa-circle-exclamation"></i> Hết/Âm kho</span>';
        const tonColor = r.ton < 0 ? 'color:#fca5a5' : 'color:#c4b5fd';
        return `<tr>
            <td style="color:var(--muted);font-weight:600">${i + 1}</td>
            <td style="font-weight:700">${r.ten}</td>
            <td style="color:#6ee7b7">${fmtKg(r.nhap)}</td>
            <td style="color:#fca5a5">${fmtKg(r.xuat)}</td>
            <td style="font-weight:700;${tonColor}">${fmtKg(r.ton)}</td>
            <td><div class="pct-bar"><div class="pct-fill" style="width:${pct}%"></div><span>${pct}%</span></div></td>
            <td>${badge}</td>
        </tr>`;
    }).join('');
}

// ---------------------------------------------------------------
// CHART HELPERS
// ---------------------------------------------------------------
function destroyChart(key) { if (CHARTS[key]) { CHARTS[key].destroy(); CHARTS[key] = null; } }

function cOpts() {
    return {
        responsive: true, maintainAspectRatio: false,
        // interaction: mode 'nearest' + axis 'x' giúp chọn cột nhanh và chính xác hơn trên điện thoại
        interaction: { mode: 'nearest', axis: 'x', intersect: false },
        // Giảm thời gian animation để dashboard cảm giác mượt hơn
        animation: { duration: 400, easing: 'easeOutQuart' },
        plugins: {
            legend: { labels: { color: '#94a3b8', font: { size: 11, family: "'Inter',sans-serif" }, usePointStyle: true, pointStyleWidth: 8, padding: 14 } },
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
                position: 'nearest',
                animation: false, // Tắt animation của tooltip để hiện số ngay lập tức
                backgroundColor: 'rgba(8,14,26,0.98)',
                titleColor: '#f1f5f9',
                bodyColor: '#94a3b8',
                padding: 12,
                cornerRadius: 8,
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1
            }
        }
    };
}
function dScales() {
    return {
        x: { grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false }, ticks: { color: '#64748b', font: { size: 11, family: "'Inter',sans-serif" }, maxRotation: 45 } },
        y: { grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false }, ticks: { color: '#64748b', font: { size: 11, family: "'Inter',sans-serif" }, callback: v => fmtKg(v) } }
    };
}

// ===== Chart 7: Hao Hụt Nguyên Liệu Theo Đội =====
function renderChart7() {
    const d = DATA.s1 || [];
    if (!d.length) return;
    const canvas = elId('chart7');
    if (!canvas) return; // Tránh lỗi vỡ hệ thống nếu file HTML cũ chưa kịp update lên

    destroyChart('c7');
    const ctx = canvas.getContext('2d');

    // Gom dữ liệu Hao hụt & Xuất theo Đội (Cột NCC)
    const stats = {};
    d.forEach(r => {
        let tenDoi = r.ncc;
        if (!tenDoi) tenDoi = "Khác";
        if (!stats[tenDoi]) stats[tenDoi] = { xuat: 0, haoHut: 0 };
        stats[tenDoi].xuat += r.xuatKg || 0;
        stats[tenDoi].haoHut += r.haoHutKg || 0;
    });

    const labels = [];
    const dataHaoHut = [];
    const dataTyLe = [];

    // Lấy đội có phát sinh xuất hoặc có hao hụt
    for (const [ten, s] of Object.entries(stats)) {
        if (s.xuat > 0 || s.haoHut > 0) {
            labels.push(ten);
            dataHaoHut.push(s.haoHut);
            // Tỷ lệ % = Hao hụt / Xuất Kg 
            const tyle = s.xuat > 0 ? (s.haoHut / s.xuat) * 100 : 0;
            dataTyLe.push(tyle);
        }
    }

    if (!labels.length) return;

    // Sắp xếp theo mức độ hao hụt (Kg) cao nhất
    const zipped = labels.map((l, i) => ({ l, ht: dataHaoHut[i], tl: dataTyLe[i] }));
    zipped.sort((a, b) => b.ht - a.ht);

    const sortedLabels = zipped.map(z => z.l);
    const sortedHaoHut = zipped.map(z => z.ht);
    const sortedTyLe = zipped.map(z => z.tl);

    const gradBar = ctx.createLinearGradient(0, 0, 0, 400);
    gradBar.addColorStop(0, 'rgba(239, 68, 68, 0.9)');
    gradBar.addColorStop(1, 'rgba(248, 113, 113, 0.4)');

    CHARTS.c7 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedLabels,
            datasets: [
                {
                    type: 'line',
                    label: 'Tỷ lệ %',
                    data: sortedTyLe,
                    borderColor: '#facc15', // Vàng
                    backgroundColor: '#facc15',
                    borderWidth: 3,
                    pointRadius: 5,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#facc15',
                    pointBorderWidth: 2,
                    yAxisID: 'y1',
                    tension: 0.3
                },
                {
                    type: 'bar',
                    label: 'Hao hụt (Kg)',
                    data: sortedHaoHut,
                    backgroundColor: gradBar,
                    borderRadius: 6,
                    borderWidth: 0,
                    yAxisID: 'y'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: {
                    position: 'top',
                    labels: { color: '#94a3b8', font: { family: 'Outfit, sans-serif' } }
                },
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false,
                    animation: false,
                    backgroundColor: 'rgba(15, 23, 42, 0.98)',
                    titleColor: '#fff',
                    bodyColor: '#cbd5e1',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function (ctx) {
                            if (ctx.datasetIndex === 0) return ` Tỷ lệ Hao hụt: ${ctx.raw.toFixed(2)}%`;
                            return ` Khối lượng Hao: ${fmtKg(ctx.raw)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255,255,255,0.04)' },
                    ticks: { color: '#64748b', font: { size: 11, family: 'Inter' } }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid: { color: 'rgba(255,255,255,0.04)' },
                    ticks: { color: '#64748b', callback: v => fmtKg(v) }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: { drawOnChartArea: false },
                    ticks: { color: '#facc15', callback: v => v.toFixed(1) + '%' }
                }
            }
        }
    });
}

// ---------------------------------------------------------------
// UTILITIES
// ---------------------------------------------------------------
function norm(v) {
    if (!v) return '';
    return v.toString().toLowerCase().trim()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd');
}
function str(v) { return v ? v.toString().trim() : ''; }
function pn(v) {
    if (v === '' || v === null || v === undefined) return 0;
    const n = parseFloat(String(v).replace(/\./g, '').replace(',', '.'));
    return isNaN(n) ? 0 : n;
}
function fmt(n) { if (n === null || n === undefined) return '--'; return Math.round(n).toLocaleString('vi-VN'); }
function fmtKg(n) {
    if (n === null || n === undefined) return '--';
    if (Math.abs(n) >= 1000) return (n / 1000).toLocaleString('vi-VN', { maximumFractionDigits: 2 }) + ' Tấn';
    return Math.round(n).toLocaleString('vi-VN') + ' Kg';
}
function elId(id) { return document.getElementById(id); }
function findCol(h, kw) { return h.findIndex(c => c.includes(norm(kw))); }
function findAnd(h, k1, k2) { return h.findIndex(c => c.includes(norm(k1)) && c.includes(norm(k2))); }

function showLoading(show) {
    const el = elId('loadingOverlay');
    if (show) el.classList.remove('hidden');
    else setTimeout(() => el.classList.add('hidden'), 400);
}
function spinRefresh(spin) {
    const btn = elId('btnRefresh');
    if (spin) btn.classList.add('spinning'); else btn.classList.remove('spinning');
}
function setStatus(type, msg) {
    const bar = elId('statusBar');
    bar.className = 'status-bar ' + type;
    elId('statusMsg').textContent = msg;
    const icon = bar.querySelector('i');
    const map = { success: 'fa-circle-check', error: 'fa-circle-xmark', demo: 'fa-triangle-exclamation', info: 'fa-circle-info' };
    icon.className = 'fa-solid ' + (map[type] || map.info);
}
function animCount(el, end, sfx = '') {
    if (!el) return;
    const dur = 1200; let start = null;
    const step = ts => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const e = 1 - Math.pow(1 - p, 4);
        el.textContent = fmt(Math.round(e * end)) + sfx;
        if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}
function animCountKg(el, end) {
    if (!el) return;
    const dur = 1200; let start = null;
    const step = ts => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const e = 1 - Math.pow(1 - p, 4);
        el.textContent = fmtKg(Math.round(e * end));
        if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

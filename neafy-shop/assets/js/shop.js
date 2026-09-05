/* ==================================================================
   neafy shop — ตรรกะหน้าร้าน
   ทำงานฝั่งเบราว์เซอร์ล้วน ไม่ต้องมีเซิร์ฟเวอร์ ตะกร้าเก็บใน localStorage
   ================================================================== */
(function () {
  'use strict';

  const STORE_KEY  = 'neafy-shop-cart-v1';
  const COUPON_KEY = 'neafy-shop-coupon-v1';
  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const baht = n => '฿' + n.toLocaleString('th-TH');
  const byId = id => PRODUCTS.find(p => p.id === id);
  const sizeOf = (p, code) => p.sizes.find(s => s.code === code);

  function esc(str) {
    return String(str).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /* ---------------- ตะกร้า (สถานะ) ---------------- */

  let cart = load();

  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
      if (!Array.isArray(raw)) return [];
      // ทิ้งรายการที่สินค้า/ไซซ์ถูกลบออกจาก products.js ไปแล้ว
      return raw
        .filter(it => it && byId(it.id) && sizeOf(byId(it.id), it.size))
        .map(it => ({ id: it.id, size: it.size, qty: Math.max(1, Math.min(99, ~~it.qty || 1)) }));
    } catch (e) { return []; }
  }

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(cart)); } catch (e) { /* โหมดส่วนตัว */ }
  }

  /* ---------------- โค้ดส่วนลด ---------------- */

  let coupon = loadCoupon();     // อ็อบเจ็กต์โค้ดที่ใช้อยู่ หรือ null
  let couponMsg = '';            // ข้อความใต้ช่องกรอกโค้ด

  function findCoupon(code) {
    const want = String(code || '').trim().toUpperCase();
    if (!want) return null;
    return (SHOP.coupons || []).find(c => c.code.toUpperCase() === want) || null;
  }

  function loadCoupon() {
    try { return findCoupon(localStorage.getItem(COUPON_KEY)); } catch (e) { return null; }
  }

  function saveCoupon() {
    try {
      if (coupon) localStorage.setItem(COUPON_KEY, coupon.code);
      else localStorage.removeItem(COUPON_KEY);
    } catch (e) { /* โหมดส่วนตัว */ }
  }

  // ส่วนลดไม่เกินค่าสินค้าในตะกร้า
  function discount() {
    return coupon ? Math.min(coupon.discount, subtotal()) : 0;
  }

  function cartCount() { return cart.reduce((n, it) => n + it.qty, 0); }
  function subtotal() {
    return cart.reduce((sum, it) => sum + byId(it.id).price * it.qty, 0);
  }
  function shipping() {
    if (!cart.length) return 0;
    if (SHOP.freeShippingFrom && subtotal() >= SHOP.freeShippingFrom) return 0;
    return SHOP.shippingFee;
  }

  function addToCart(id, size, qty) {
    const line = cart.find(it => it.id === id && it.size === size);
    const stock = sizeOf(byId(id), size).stock;
    const want = ((line ? line.qty : 0) + qty);
    const capped = Math.min(want, stock);
    if (line) line.qty = capped; else cart.push({ id, size, qty: capped });
    save(); syncCart();
    return capped < want;   // true = ถูกจำกัดด้วยสต็อก
  }

  function setQty(i, qty) {
    const it = cart[i];
    if (!it) return;
    captureDraft();
    const stock = sizeOf(byId(it.id), it.size).stock;
    it.qty = Math.max(1, Math.min(qty, stock));
    save(); renderCart(); syncCart();
  }

  function removeAt(i) { captureDraft(); cart.splice(i, 1); save(); renderCart(); syncCart(); }

  function syncCart() {
    $('#cartCount').textContent = cartCount();
    renderCart();
  }

  /* ---------------- ส่วนคงที่ของหน้า ---------------- */

  function renderChrome() {
    $('#year').textContent = new Date().getFullYear();
    $('#faqLine').textContent = SHOP.contact.line;

    const promo = [];
    if (SHOP.freeShippingFrom) promo.push(`ส่งฟรีเมื่อสั่งครบ ${baht(SHOP.freeShippingFrom)}`);
    (SHOP.coupons || []).forEach(c => promo.push(`ใส่โค้ด ${c.code} ${c.note}`));
    promo.push('เปลี่ยนไซซ์ฟรีภายใน 7 วัน');
    $('#announce').textContent = promo.join(' · ');

    const c = SHOP.contact;
    $('#contactList').innerHTML = [
      `<li>ไลน์ <a href="https://line.me/R/ti/p/~${encodeURIComponent(c.line)}">${esc(c.line)}</a></li>`,
      `<li>โทร <a href="tel:${esc(c.phone.replace(/[^0-9+]/g, ''))}">${esc(c.phone)}</a></li>`,
      `<li>อีเมล <a href="mailto:${esc(c.email)}">${esc(c.email)}</a></li>`,
      `<li>ไอจี <a href="https://instagram.com/${encodeURIComponent(c.instagram)}">@${esc(c.instagram)}</a></li>`
    ].join('');
  }

  function renderGrid() {
    $('#productGrid').innerHTML = PRODUCTS.map(p => {
      const out = p.sizes.every(s => s.stock === 0);
      const badge = out
        ? '<span class="badge sold">สินค้าหมด</span>'
        : (p.badge ? `<span class="badge">${esc(p.badge)}</span>` : '');
      return `
        <a class="card" href="#product/${esc(p.id)}">
          <div class="card-media">
            ${badge}
            <img src="${esc(p.images[0])}" alt="${esc(p.nameTh)}" loading="lazy">
          </div>
          <div class="card-body">
            <h3>${esc(p.name)}</h3>
            <p class="card-th">${esc(p.nameTh)}</p>
            <p class="card-tag">${esc(p.tagline)}</p>
            <div class="price-row">
              <span class="price">${baht(p.price)}</span>
              ${p.compareAt ? `<span class="price-was">${baht(p.compareAt)}</span>` : ''}
            </div>
            <span class="card-cta">ดูรายละเอียด</span>
          </div>
        </a>`;
    }).join('');
  }

  function renderSizeTables() {
    $('#sizeTables').innerHTML = PRODUCTS.map(p => `
      <div class="size-block">
        <h3>${esc(p.name)}</h3>
        <table>
          <thead>
            <tr><th>ไซซ์</th><th>รอบอก</th><th>ความยาว</th><th>ไหล่</th></tr>
          </thead>
          <tbody>
            ${p.sizes.map(s => `
              <tr>
                <th scope="row">${esc(s.code)}</th>
                <td>${s.chest}"</td><td>${s.length}"</td><td>${s.shoulder}"</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>`).join('');
  }

  /* ---------------- หน้ารายละเอียดสินค้า ---------------- */

  let picked = null;      // ไซซ์ที่เลือกอยู่
  let qty = 1;

  function renderProduct(p) {
    picked = null; qty = 1;
    const out = p.sizes.every(s => s.stock === 0);

    $('#viewProduct').innerHTML = `
      <div class="pdp"><div class="wrap">
        <nav class="crumbs"><a href="#shop">สินค้าทั้งหมด</a> &nbsp;/&nbsp; ${esc(p.name)}</nav>
        <div class="pdp-grid">
          <div class="pdp-media">
            ${out ? '<span class="badge sold">สินค้าหมด</span>'
                  : (p.badge ? `<span class="badge">${esc(p.badge)}</span>` : '')}
            <img src="${esc(p.images[0])}" alt="${esc(p.nameTh)}">
          </div>
          <div class="pdp-info">
            <p class="eyebrow">neafy shop</p>
            <h1>${esc(p.name)}</h1>
            <p class="pdp-th">${esc(p.nameTh)}</p>
            <div class="pdp-price">
              <span class="price">${baht(p.price)}</span>
              ${p.compareAt ? `<span class="price-was">${baht(p.compareAt)}</span>` : ''}
            </div>
            <div class="pdp-desc"><p>${esc(p.description)}</p></div>
            <ul class="spec">${p.details.map(d => `<li>${esc(d)}</li>`).join('')}</ul>
            <dl class="meta">
              <div><dt>สี</dt><dd>${esc(p.color)}</dd></div>
              <div><dt>เนื้อผ้า</dt><dd>${esc(p.fabric)}</dd></div>
              <div><dt>จัดส่ง</dt><dd>1–2 วันทำการหลังยืนยันการชำระเงิน</dd></div>
            </dl>

            <div class="picker">
              <div class="picker-head">
                <span>เลือกไซซ์</span>
                <a href="#size">ดูตารางไซซ์</a>
              </div>
              <div class="sizes" id="sizes">
                ${p.sizes.map(s => `
                  <button class="size-opt" type="button" data-size="${esc(s.code)}"
                    aria-pressed="false" ${s.stock === 0 ? 'disabled aria-label="' + esc(s.code) + ' สินค้าหมด"' : ''}>
                    ${esc(s.code)}
                  </button>`).join('')}
              </div>
              <p class="stock" id="stockNote">${out ? 'สินค้าหมดทุกไซซ์ · ทักไลน์เพื่อสั่งจองรอบผลิตถัดไป' : ''}</p>
            </div>

            <div class="qty">
              <button type="button" id="qtyDown" aria-label="ลดจำนวน">−</button>
              <output id="qtyVal">1</output>
              <button type="button" id="qtyUp" aria-label="เพิ่มจำนวน">+</button>
            </div>

            <button class="btn btn-solid btn-block" id="addBtn" ${out ? 'disabled' : ''}>
              ${out ? 'สินค้าหมด' : 'ใส่ตะกร้า'}
            </button>
          </div>
        </div>
      </div></div>`;

    $$('#sizes .size-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        picked = btn.dataset.size;
        $$('#sizes .size-opt').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
        const s = sizeOf(p, picked);
        qty = Math.min(qty, s.stock);
        $('#qtyVal').textContent = qty;
        const note = $('#stockNote');
        note.textContent = s.stock <= 3
          ? `เหลือ ${s.stock} ตัวสุดท้ายในไซซ์ ${s.code}`
          : `พร้อมส่ง · มี ${s.stock} ตัวในไซซ์ ${s.code}`;
        note.classList.toggle('low', s.stock <= 3);
      });
    });

    const bump = d => {
      const max = picked ? sizeOf(p, picked).stock : 99;
      qty = Math.max(1, Math.min(qty + d, max));
      $('#qtyVal').textContent = qty;
    };
    $('#qtyUp').addEventListener('click', () => bump(1));
    $('#qtyDown').addEventListener('click', () => bump(-1));

    $('#addBtn').addEventListener('click', () => {
      if (!picked) {
        toast('เลือกไซซ์ก่อนใส่ตะกร้า');
        $('#sizes').scrollIntoView({ block: 'center' });
        return;
      }
      const capped = addToCart(p.id, picked, qty);
      toast(capped ? 'ใส่ตะกร้าแล้วเท่าที่มีในสต็อก' : `ใส่ตะกร้าแล้ว · ${p.name} (${picked})`);
      openCart();
    });
  }

  /* ---------------- เส้นทางหน้า (hash routing) ---------------- */

  function route() {
    const hash = location.hash || '';
    const m = hash.match(/^#product\/(.+)$/);
    const p = m ? byId(decodeURIComponent(m[1])) : null;

    if (p) {
      $('#viewShop').hidden = true;
      $('#viewProduct').hidden = false;
      renderProduct(p);
      window.scrollTo(0, 0);
    } else {
      $('#viewProduct').hidden = true;
      $('#viewProduct').innerHTML = '';
      $('#viewShop').hidden = false;
      if (m) location.replace('#shop');   // ไอดีสินค้าไม่ถูกต้อง
    }
    $('#mainnav').classList.remove('open');
    $('#menuBtn').setAttribute('aria-expanded', 'false');
  }

  /* ---------------- ลิ้นชักตะกร้า ---------------- */

  function openCart() {
    $('#cart').hidden = false;
    $('#scrim').hidden = false;
    document.body.style.overflow = 'hidden';
    $('#cartClose').focus();
  }
  function closeCart() {
    $('#cart').hidden = true;
    $('#scrim').hidden = true;
    document.body.style.overflow = '';
  }

  let checkoutOpen = false;
  let draft = {};   // ค่าที่ลูกค้าพิมพ์ในฟอร์ม เก็บไว้ไม่ให้หายเวลาหน้าตะกร้าถูกวาดใหม่

  function captureDraft() {
    const form = $('#orderForm');
    if (!form) return;
    ['name', 'tel', 'addr', 'zip', 'pay', 'note'].forEach(k => { draft[k] = form.elements[k].value; });
  }

  function restoreDraft() {
    const form = $('#orderForm');
    if (!form) return;
    Object.keys(draft).forEach(k => { if (form.elements[k]) form.elements[k].value = draft[k]; });
  }

  function renderCart() {
    const body = $('#cartBody');
    const foot = $('#cartFoot');

    if (!cart.length) {
      checkoutOpen = false; couponMsg = '';
      body.innerHTML = `
        <div class="empty">
          <h3>ตะกร้ายังว่างอยู่</h3>
          <p>เลือกเสื้อที่ถูกใจแล้วกลับมาที่นี่ได้เลย</p>
        </div>`;
      foot.innerHTML = `<a class="btn btn-line btn-block" href="#shop" data-close>ดูสินค้า</a>`;
      bindCartEvents();
      return;
    }

    body.innerHTML = cart.map((it, i) => {
      const p = byId(it.id);
      return `
        <div class="line-item">
          <img src="${esc(p.images[0])}" alt="">
          <div>
            <div class="li-name">${esc(p.name)}</div>
            <div class="li-meta">ไซซ์ ${esc(it.size)} · ${esc(p.color)}</div>
            <div class="li-controls">
              <button type="button" data-dec="${i}" aria-label="ลดจำนวน">−</button>
              <span>${it.qty}</span>
              <button type="button" data-inc="${i}" aria-label="เพิ่มจำนวน">+</button>
            </div>
          </div>
          <div class="li-right">
            <div class="li-price">${baht(p.price * it.qty)}</div>
            <button class="li-remove" type="button" data-del="${i}">ลบ</button>
          </div>
        </div>`;
    }).join('');

    const sub = subtotal(), ship = shipping(), off = discount();
    const gapToFree = SHOP.freeShippingFrom ? SHOP.freeShippingFrom - sub : 0;

    foot.innerHTML = `
      ${checkoutOpen ? '' : couponBox()}
      <div class="totals">
        <div><span>ยอดสินค้า</span><span>${baht(sub)}</span></div>
        ${off ? `<div class="off"><span>ส่วนลด (${esc(coupon.code)})</span><span>−${baht(off)}</span></div>` : ''}
        <div><span>ค่าจัดส่ง</span><span>${ship === 0 ? 'ฟรี' : baht(ship)}</span></div>
        <div class="grand"><span>รวมทั้งสิ้น</span><span>${baht(sub - off + ship)}</span></div>
        ${gapToFree > 0 ? `<p class="free-note">สั่งเพิ่มอีก ${baht(gapToFree)} รับส่งฟรี</p>` : ''}
      </div>
      ${checkoutOpen ? checkoutForm() : `
        <button class="btn btn-solid btn-block" id="toCheckout" style="margin-top:16px">สั่งซื้อ</button>`}`;

    bindCartEvents();
    restoreDraft();
  }

  function couponBox() {
    if (coupon) {
      return `
        <div class="coupon on">
          <span>ใช้โค้ด <b>${esc(coupon.code)}</b> แล้ว · ${esc(coupon.note)}</span>
          <button type="button" id="dropCoupon">ยกเลิก</button>
        </div>`;
    }
    return `
      <div class="coupon">
        <label for="couponInput">โค้ดส่วนลด</label>
        <div class="coupon-row">
          <input id="couponInput" placeholder="กรอกโค้ด" autocomplete="off" spellcheck="false">
          <button class="btn btn-line" type="button" id="applyCoupon">ใช้โค้ด</button>
        </div>
        ${couponMsg ? `<p class="coupon-msg">${esc(couponMsg)}</p>` : ''}
      </div>`;
  }

  function checkoutForm() {
    return `
      <form class="checkout" id="orderForm" novalidate style="margin-top:18px">
        <h3>ข้อมูลจัดส่ง</h3>
        <p class="small">กรอกแล้วกดยืนยัน ระบบจะสรุปรายการให้คัดลอกส่งทางไลน์ ${esc(SHOP.contact.line)}</p>
        <div class="two-col">
          <div class="field"><label for="f-name">ชื่อ–นามสกุล</label>
            <input id="f-name" name="name" autocomplete="name" required>
            <span class="err">กรุณากรอกชื่อผู้รับ</span></div>
          <div class="field"><label for="f-tel">เบอร์โทร</label>
            <input id="f-tel" name="tel" inputmode="tel" autocomplete="tel" required>
            <span class="err">กรุณากรอกเบอร์โทร 9–10 หลัก</span></div>
        </div>
        <div class="field"><label for="f-addr">ที่อยู่จัดส่ง</label>
          <textarea id="f-addr" name="addr" autocomplete="street-address" required></textarea>
          <span class="err">กรุณากรอกที่อยู่ให้ครบถ้วน</span></div>
        <div class="two-col">
          <div class="field"><label for="f-zip">รหัสไปรษณีย์</label>
            <input id="f-zip" name="zip" inputmode="numeric" maxlength="5" autocomplete="postal-code" required>
            <span class="err">รหัสไปรษณีย์ 5 หลัก</span></div>
          <div class="field"><label for="f-pay">ชำระเงินโดย</label>
            <select id="f-pay" name="pay">
              <option value="โอนผ่านธนาคาร / พร้อมเพย์">โอนผ่านธนาคาร / พร้อมเพย์</option>
              <option value="เก็บเงินปลายทาง">เก็บเงินปลายทาง</option>
            </select></div>
        </div>
        <div class="field"><label for="f-note">หมายเหตุ (ถ้ามี)</label>
          <textarea id="f-note" name="note" placeholder="เช่น ฝากไว้หน้าบ้าน / ขอใบเสร็จ"></textarea></div>
        <button class="btn btn-solid btn-block" type="submit">ยืนยันคำสั่งซื้อ</button>
        <button class="btn btn-line btn-block" type="button" id="backToCart" style="margin-top:10px">ย้อนกลับ</button>
      </form>`;
  }

  function bindCartEvents() {
    $$('[data-inc]').forEach(b => b.addEventListener('click', () =>
      setQty(+b.dataset.inc, cart[+b.dataset.inc].qty + 1)));
    $$('[data-dec]').forEach(b => b.addEventListener('click', () =>
      setQty(+b.dataset.dec, cart[+b.dataset.dec].qty - 1)));
    $$('[data-del]').forEach(b => b.addEventListener('click', () => removeAt(+b.dataset.del)));
    $$('[data-close]').forEach(b => b.addEventListener('click', closeCart));

    const apply = $('#applyCoupon');
    if (apply) {
      const input = $('#couponInput');
      const tryCode = () => {
        const found = findCoupon(input.value);
        if (found) {
          coupon = found; couponMsg = ''; saveCoupon();
          toast(`ใช้โค้ด ${found.code} แล้ว · ${found.note}`);
        } else {
          couponMsg = input.value.trim() ? 'ไม่พบโค้ดนี้ ลองตรวจตัวสะกดอีกครั้ง' : 'กรุณากรอกโค้ดส่วนลด';
        }
        renderCart();
      };
      apply.addEventListener('click', tryCode);
      input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); tryCode(); } });
    }

    const drop = $('#dropCoupon');
    if (drop) drop.addEventListener('click', () => {
      coupon = null; couponMsg = ''; saveCoupon(); renderCart();
    });

    const go = $('#toCheckout');
    if (go) go.addEventListener('click', () => { checkoutOpen = true; renderCart(); $('#f-name').focus(); });

    const back = $('#backToCart');
    if (back) back.addEventListener('click', () => { checkoutOpen = false; renderCart(); });

    const form = $('#orderForm');
    if (form) form.addEventListener('submit', submitOrder);
  }

  /* ---------------- ยืนยันคำสั่งซื้อ ---------------- */

  function validate(form) {
    const rules = {
      name: v => v.trim().length >= 2,
      tel:  v => /^[0-9]{9,10}$/.test(v.replace(/[^0-9]/g, '')),
      addr: v => v.trim().length >= 10,
      zip:  v => /^[0-9]{5}$/.test(v.trim())
    };
    let firstBad = null;
    Object.keys(rules).forEach(key => {
      const input = form.elements[key];
      const ok = rules[key](input.value);
      input.closest('.field').classList.toggle('invalid', !ok);
      if (!ok && !firstBad) firstBad = input;
    });
    if (firstBad) firstBad.focus();
    return !firstBad;
  }

  function orderNumber() {
    const d = new Date();
    const p = n => String(n).padStart(2, '0');
    const rand = String(Math.floor(Math.random() * 900) + 100);
    return `NF-${String(d.getFullYear()).slice(2)}${p(d.getMonth() + 1)}${p(d.getDate())}-${rand}`;
  }

  function orderText(no, data) {
    const lines = cart.map(it => {
      const p = byId(it.id);
      return `  • ${p.name} (${p.nameTh}) · ไซซ์ ${it.size} × ${it.qty} = ${baht(p.price * it.qty)}`;
    });
    const sub = subtotal(), ship = shipping(), off = discount();
    return [
      `คำสั่งซื้อ ${SHOP.name}`,
      `เลขที่ ${no}`,
      `วันที่ ${new Date().toLocaleString('th-TH')}`,
      '',
      'รายการสินค้า',
      ...lines,
      '',
      `ยอดสินค้า   ${baht(sub)}`,
      off ? `ส่วนลด     −${baht(off)} (โค้ด ${coupon.code})` : '',
      `ค่าจัดส่ง    ${ship === 0 ? 'ฟรี' : baht(ship)}`,
      `รวมทั้งสิ้น  ${baht(sub - off + ship)}`,
      '',
      'ผู้รับ',
      `  ชื่อ    ${data.name}`,
      `  โทร    ${data.tel}`,
      `  ที่อยู่  ${data.addr.replace(/\s*\n\s*/g, ' ')} ${data.zip}`,
      `  ชำระ   ${data.pay}`,
      data.note.trim() ? `  หมายเหตุ ${data.note.trim()}` : ''
    ].filter(Boolean).join('\n');
  }

  function submitOrder(e) {
    e.preventDefault();
    const form = e.target;
    if (!validate(form)) return;

    const data = {
      name: form.elements.name.value.trim(),
      tel:  form.elements.tel.value.trim(),
      addr: form.elements.addr.value.trim(),
      zip:  form.elements.zip.value.trim(),
      pay:  form.elements.pay.value,
      note: form.elements.note.value
    };
    const no = orderNumber();
    const text = orderText(no, data);

    $('#cartBody').innerHTML = `
      <div class="done">
        <div class="tick">✓</div>
        <h3>บันทึกคำสั่งซื้อแล้ว</h3>
        <p class="small">เลขที่ ${esc(no)} — คัดลอกข้อความด้านล่างส่งทางไลน์
          <b>${esc(SHOP.contact.line)}</b> เพื่อรับเลขบัญชีและยืนยันสต็อก</p>
      </div>
      <textarea class="summary-box" id="summaryBox" readonly rows="14">${esc(text)}</textarea>`;

    $('#cartFoot').innerHTML = `
      <button class="btn btn-solid btn-block" id="copyBtn">คัดลอกรายการสั่งซื้อ</button>
      <a class="btn btn-line btn-block" style="margin-top:10px"
         href="https://line.me/R/ti/p/~${encodeURIComponent(SHOP.contact.line)}"
         target="_blank" rel="noopener">เปิดไลน์ ${esc(SHOP.contact.line)}</a>
      <button class="btn btn-line btn-block" id="newOrder" style="margin-top:10px">สั่งซื้อรอบใหม่</button>`;

    $('#copyBtn').addEventListener('click', async () => {
      const box = $('#summaryBox');
      try {
        await navigator.clipboard.writeText(text);
        toast('คัดลอกแล้ว · วางในแชตไลน์ได้เลย');
      } catch (err) {
        box.focus(); box.select();
        toast('กด Ctrl/Cmd + C เพื่อคัดลอกข้อความที่เลือกไว้');
      }
    });

    $('#newOrder').addEventListener('click', () => {
      cart = []; checkoutOpen = false; save(); syncCart(); closeCart();
    });

    // เคลียร์ตะกร้าหลังสรุปออเดอร์แล้ว แต่คงข้อความสรุปไว้บนหน้าจอ
    cart = []; checkoutOpen = false; draft = {};
    coupon = null; couponMsg = ''; saveCoupon(); save();
    $('#cartCount').textContent = '0';
  }

  /* ---------------- แจ้งเตือน ---------------- */

  let toastTimer;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.hidden = true; }, 2600);
  }

  /* ---------------- เริ่มทำงาน ---------------- */

  renderChrome();
  renderGrid();
  renderSizeTables();
  syncCart();
  route();

  window.addEventListener('hashchange', route);
  $('#cartBtn').addEventListener('click', openCart);
  $('#cartClose').addEventListener('click', closeCart);
  $('#scrim').addEventListener('click', closeCart);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !$('#cart').hidden) closeCart();
  });
  $('#menuBtn').addEventListener('click', () => {
    const nav = $('#mainnav');
    const open = nav.classList.toggle('open');
    $('#menuBtn').setAttribute('aria-expanded', String(open));
  });
  $$('#mainnav a').forEach(a => a.addEventListener('click', () => {
    $('#mainnav').classList.remove('open');
    $('#menuBtn').setAttribute('aria-expanded', 'false');
  }));
})();

/* ------------------------------------------------------------------
   neafy shop — ข้อมูลสินค้า
   แก้ไขไฟล์นี้ไฟล์เดียวเมื่อจะเปลี่ยนชื่อเสื้อ ราคา รูป หรือไซซ์
   รูปสินค้า: วางไฟล์ไว้ใน neafy-shop/images/ แล้วใส่ชื่อไฟล์ใน images: []
   ------------------------------------------------------------------ */
const PRODUCTS = [
  {
    id: 'neafy-01',
    name: 'Oxford Classic Shirt',
    nameTh: 'เชิ้ตอ๊อกซ์ฟอร์ด คลาสสิก',
    price: 890,
    compareAt: 1090,          // ราคาก่อนลด — ใส่ null ถ้าไม่มี
    badge: 'ขายดี',           // ป้ายมุมรูป — ใส่ null ถ้าไม่ต้องการ
    color: 'Off White',
    fabric: 'ผ้าอ๊อกซ์ฟอร์ดคอตตอน 100% 140 แกรม',
    images: ['images/shirt-01.svg'],
    tagline: 'ทรงตรงคลาสสิก ใส่ได้ทั้งในออฟฟิศและวันสบาย ๆ',
    description:
      'เชิ้ตแขนยาวทรงคลาสสิก ตัดจากผ้าอ๊อกซ์ฟอร์ดคอตตอนแท้ เนื้อแน่นแต่ระบายอากาศดี ' +
      'คอปกตั้งทรงสวยไม่ต้องรีดบ่อย กระดุมหอยแท้ทุกเม็ด เย็บตะเข็บคู่ทั้งตัวเพื่อความทนทาน ' +
      'ซักแล้วยิ่งนุ่มขึ้นตามการใช้งาน',
    details: [
      'คอปก button-down คงรูป',
      'กระดุมหอยแท้ เย็บมือทุกเม็ด',
      'ตะเข็บคู่ (double-stitched) ทั้งตัว',
      'กระเป๋าอกซ้ายทรงเหลี่ยมมุมตัด',
      'ซักเครื่องได้ น้ำเย็น ไม่ต้องอบ'
    ],
    sizes: [
      { code: 'S',  chest: 38, length: 68, shoulder: 42, stock: 6 },
      { code: 'M',  chest: 40, length: 70, shoulder: 44, stock: 8 },
      { code: 'L',  chest: 42, length: 72, shoulder: 46, stock: 5 },
      { code: 'XL', chest: 44, length: 74, shoulder: 48, stock: 0 }
    ]
  },
  {
    id: 'neafy-02',
    name: 'Heritage Heavy Tee',
    nameTh: 'เสื้อยืดคอกลม เฮฟวี่คอตตอน',
    price: 590,
    compareAt: null,
    badge: 'มาใหม่',
    color: 'Ecru',
    fabric: 'คอตตอน 100% 240 แกรม',
    images: ['images/shirt-02.svg'],
    tagline: 'ผ้าหนา ทรงอยู่ตัว ใส่ได้ทุกวันไม่ย้วย',
    description:
      'เสื้อยืดคอกลมผ้าหนา 240 แกรม ทรงกล่องกำลังดี ไม่หลวมจนเสียทรงและไม่รัดจนอึดอัด ' +
      'คอริบถักแน่นสองชั้นจึงไม่ยืดย้วยแม้ใส่ประจำ พิมพ์โลโก้ neafy ที่อกด้วยหมึกน้ำ ' +
      'สัมผัสเรียบไปกับเนื้อผ้า',
    details: [
      'ผ้าคอตตอน 100% 240 แกรม',
      'คอริบสองชั้น ไม่ย้วย',
      'ตะเข็บข้างไม่มีรอยต่อไหล่',
      'พิมพ์หมึกน้ำ ไม่ลอกไม่แตก',
      'หดตัวน้อยกว่า 3% หลังซักครั้งแรก'
    ],
    sizes: [
      { code: 'S',  chest: 36, length: 66, shoulder: 41, stock: 10 },
      { code: 'M',  chest: 38, length: 68, shoulder: 43, stock: 12 },
      { code: 'L',  chest: 40, length: 70, shoulder: 45, stock: 7 },
      { code: 'XL', chest: 42, length: 72, shoulder: 47, stock: 3 }
    ]
  }
];

/* ตั้งค่าร้าน — แก้ช่องทางติดต่อและค่าส่งได้ที่นี่ */
const SHOP = {
  name: 'neafy shop',
  tagline: 'Classic shirts, honestly made.',
  since: 2024,
  shippingFee: 50,          // ค่าส่งต่อออเดอร์ (บาท)
  freeShippingFrom: 1000,   // ยอดที่ส่งฟรี (บาท) — ใส่ null ถ้าไม่มีโปร
  contact: {
    line: '@neafyshop',
    phone: '08X-XXX-XXXX',
    email: 'hello@neafyshop.com',
    instagram: 'neafy.shop'
  }
};

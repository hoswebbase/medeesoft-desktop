# Medeesoft Desktop (Windows .exe) — วิธี Build

โปรเจกต์นี้เป็นแอป Desktop (Electron) ที่เปิด URL `http://192.168.214.4` อัตโนมัติเมื่อเปิดโปรแกรม
ชื่อโปรแกรม: **Medeesoft**, ไอคอนใช้โลโก้เดียวกับที่ใช้ในแอป Android

## วิธี Build ผ่าน GitHub Actions (ไม่ต้องติดตั้งอะไรในเครื่อง — แนะนำ)

ทำเหมือนขั้นตอนที่ใช้กับแอป Android เป๊ะๆ เลยครับ:

1. สร้าง repository ใหม่บน GitHub เช่น `medeesoft-desktop`
2. Push โค้ดทั้งหมดในโฟลเดอร์นี้ (รวมโฟลเดอร์ `.github` ด้วย) ขึ้น repo:
   ```bash
   cd Medeesoft-Desktop
   git init
   git add .
   git commit -m "Medeesoft desktop app"
   git branch -M main
   git remote add origin https://github.com/<username>/medeesoft-desktop.git
   git push -u origin main
   ```
3. ไปที่แท็บ **Actions** → จะเห็น workflow "Build EXE" รันอัตโนมัติ (ใช้เวลาประมาณ 3-5 นาที เพราะรันบนเครื่อง Windows)
4. เมื่อรันเสร็จ (เครื่องหมายถูกสีเขียว) เลื่อนลงไปด้านล่างสุดของหน้าจนเจอส่วน **Artifacts**
5. ดาวน์โหลดไฟล์ **`Medeesoft-windows-exe`** (จะได้ไฟล์ .zip) แตกออกมาจะมี 2 ไฟล์:
   - `Medeesoft Setup 1.0.0.exe` → ตัวติดตั้ง (แนะนำสำหรับผู้ใช้ทั่วไป มีไอคอนขึ้น Desktop/Start Menu ให้)
   - `Medeesoft 1.0.0.exe` (portable) → เปิดใช้ได้เลยไม่ต้องติดตั้ง เหมาะเสียบ USB พกไปเครื่องอื่น

## หมายเหตุ

- ถ้าต้องการเปลี่ยน IP ปลายทาง แก้ที่ไฟล์ `main.js` บรรทัด `TARGET_URL`
- เครื่องที่รันโปรแกรมนี้ต้องอยู่ในวง LAN/Wi-Fi เดียวกับเซิร์ฟเวอร์ 192.168.214.4 ถึงจะใช้งานได้
- ตอนเปิดโปรแกรมครั้งแรกใน Windows อาจเจอ **"Windows protected your PC"** (SmartScreen) เพราะไฟล์ไม่ได้เซ็นรับรอง (code signing certificate มีค่าใช้จ่าย)
  วิธีเปิดใช้งาน: กด **"More info"** แล้วกด **"Run anyway"**
- ถ้าต้องการ build เวอร์ชัน 32-bit ด้วย แก้ `arch` ใน `package.json` ส่วน `win.target` เพิ่ม `"ia32"`

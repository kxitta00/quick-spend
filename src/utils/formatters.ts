

//แปลงตัวเลขดิบเป็นข้อความเงิน 18260 to ฿18,260.00  
export function formatCurrency(amount: number): string {
  return (new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 2 })).format(amount);
}

//แปลงตัวเลขดิบเป็นข้อความเงิน 18260 to ฿18,260 
export function formatCurrencyZeroDecimals(amount: number): string {
  return (new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 })).format(amount);
}

//แปลงวันที่แบบไทย
export function formatThaiDate(): string {
  return new Intl.DateTimeFormat('th-TH', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date());
}

//แปลงวันที่แบบไทยเอา 2 ตำแหน่ง
export function formatThaiDateTwoPosition(date: Date): string {
  return new Intl.DateTimeFormat('th-TH', {
    day: 'numeric',
    month: 'short',
  }).format(date);
}

//แปลงเวลาแบบไทย
export function formatThaiTime(): string {
  return new Intl.DateTimeFormat('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());
}

//แปลงเวลาแบบไทยโดยรับพารามีเตอร์
export function formatThaiTimeWithDate(date: Date): string {
  return new Intl.DateTimeFormat('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

//แปลงชื่อเดือน
export function formatThaiMonthYear(date: Date): string {
  return new Intl.DateTimeFormat('th-TH', { month: 'long', year: 'numeric' }).format(date)
}
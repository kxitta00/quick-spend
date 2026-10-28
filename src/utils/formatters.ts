

//แปลงตัวเลขดิบเป็นข้อความเงิน 18260 to ฿18,260.00  
export function formatCurrency(amount: number): string {
  const hasDecimals = Number(amount.toFixed(2)) % 1 !== 0;
  return (new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: hasDecimals ? 2 : 0, maximumFractionDigits: 2 })).format(amount);
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

// ฟังก์ชันแปลงข้อความยกระดับความปลอดภัย
export function escapeHtml(text: string): string {
  if (!text) {
    return "";
  }
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML
}
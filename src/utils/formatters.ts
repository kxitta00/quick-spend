

//แปลงตัวเลขดิบเป็นข้อความเงิน 18260 to ฿18,260.00  
export function formatCurrency(amount: number): string {
  return (new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 2 })).format(amount);
}

//แปลงตัวเลขดิบเป็นข้อความเงิน 18260 to ฿18,260 
export function formatCurrencyZeroDecimals(amount: number): string {
  return (new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 })).format(amount);
}




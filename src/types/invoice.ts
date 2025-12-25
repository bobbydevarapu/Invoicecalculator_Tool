export interface InvoiceInput {
  itemName: string;
  quantity: number;
  price: number;
  gstPercent: number;
  discountPercent?: number;
}

export interface InvoiceResult {
  baseAmount: number;
  discountAmount: number;
  taxableAmount: number;
  gstAmount: number;
  finalAmount: number;
}

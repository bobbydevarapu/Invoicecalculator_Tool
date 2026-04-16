export interface InvoiceItem {
  id: string;
  itemName: string;
  quantity: number;
  price: number;
}

export interface InvoiceInput {
  items: InvoiceItem[];
  gstPercent: number;
  discountPercent?: number;
}

export interface InvoiceResult {
  subtotal: number;
  discountAmount: number;
  taxableAmount: number;
  gstAmount: number;
  finalAmount: number;
  itemTotals: number[];
}

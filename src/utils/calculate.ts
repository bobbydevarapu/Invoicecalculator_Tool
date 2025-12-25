import type { InvoiceInput, InvoiceResult } from "../types/invoice";

// Currency-safe rounding helper
const round = (value: number): number => {
  return Number(value.toFixed(2));
};

export function calculateInvoice(data: InvoiceInput): InvoiceResult {
  const baseAmount = data.quantity * data.price;

  const discountAmount =
    data.discountPercent && data.discountPercent > 0
      ? (baseAmount * data.discountPercent) / 100
      : 0;

  const taxableAmount = baseAmount - discountAmount;
  const gstAmount = (taxableAmount * data.gstPercent) / 100;
  const finalAmount = taxableAmount + gstAmount;

  return {
    baseAmount: round(baseAmount),
    discountAmount: round(discountAmount),
    taxableAmount: round(taxableAmount),
    gstAmount: round(gstAmount),
    finalAmount: round(finalAmount),
  };
}

import type { InvoiceInput, InvoiceResult } from "../types/invoice";

// Currency-safe rounding helper
const round = (value: number): number => {
  return Number(value.toFixed(2));
};

export function calculateInvoice(data: InvoiceInput): InvoiceResult {
  const itemTotals = data.items.map((item) => round(item.quantity * item.price));
  const subtotal = round(itemTotals.reduce((sum, itemTotal) => sum + itemTotal, 0));

  const discountAmount =
    data.discountPercent && data.discountPercent > 0
      ? (subtotal * data.discountPercent) / 100
      : 0;

  const taxableAmount = subtotal - discountAmount;
  const gstAmount = (taxableAmount * data.gstPercent) / 100;
  const finalAmount = taxableAmount + gstAmount;

  return {
    subtotal,
    discountAmount: round(discountAmount),
    taxableAmount: round(taxableAmount),
    gstAmount: round(gstAmount),
    finalAmount: round(finalAmount),
    itemTotals,
  };
}

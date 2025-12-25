import type { InvoiceInput } from "../types/invoice";

export function validateInvoice(data: InvoiceInput) {
  const errors: Record<string, string> = {};

  if (!data.itemName.trim()) {
    errors.itemName = "Item name is required";
  }

  if (data.quantity <= 0) {
    errors.quantity = "Quantity must be greater than 0";
  }

  if (data.price < 0) {
    errors.price = "Price cannot be negative";
  }

  if (data.gstPercent < 0 || data.gstPercent > 28) {
    errors.gstPercent = "GST must be between 0 and 28";
  }

  if (
    data.discountPercent !== undefined &&
    (data.discountPercent < 0 || data.discountPercent > 100)
  ) {
    errors.discountPercent = "Discount must be between 0 and 100";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

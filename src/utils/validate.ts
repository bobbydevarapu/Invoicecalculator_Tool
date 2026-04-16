import type { InvoiceInput } from "../types/invoice";

export function validateInvoice(data: InvoiceInput) {
  const errors: Record<string, string> = {};

  if (data.items.length === 0) {
    errors.items = "At least one item is required";
  }

  data.items.forEach((item, index) => {
    if (!item.itemName.trim()) {
      errors[`items.${index}.itemName`] = "Item name is required";
    }

    if (item.quantity <= 0) {
      errors[`items.${index}.quantity`] = "Quantity must be greater than 0";
    }

    if (item.price < 0) {
      errors[`items.${index}.price`] = "Price cannot be negative";
    }
  });

  const hasPositiveLine = data.items.some((item) => item.quantity * item.price > 0);
  if (!hasPositiveLine) {
    errors.items = "Add at least one item with an amount greater than 0";
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

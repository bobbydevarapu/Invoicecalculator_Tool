import { useState } from "react";
import type { InvoiceInput } from "../types/invoice";
import { calculateInvoice } from "../utils/calculate";
import { validateInvoice } from "../utils/validate";
import InvoicePreview from "./InvoicePreview";

const initialData: InvoiceInput = {
  itemName: "",
  quantity: 1,
  price: 0,
  gstPercent: 18,
  discountPercent: 0,
};

export default function InvoiceForm() {
  const [data, setData] = useState<InvoiceInput>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type } = e.target;

    const updatedData: InvoiceInput = {
      ...data,
      [name]: type === "number" ? Number(value) : value,
    };

    setData(updatedData);

    const validationResult = validateInvoice(updatedData);
    setErrors(validationResult.errors);
  }

  const validation = validateInvoice(data);
  const result = validation.isValid ? calculateInvoice(data) : null;

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <h2>Invoice Details</h2>

      {/* Item Name */}
      <div style={{ marginBottom: 10 }}>
        <label>
          Item Name
          <input
            name="itemName"
            value={data.itemName}
            onChange={handleChange}
          />
        </label>
        {errors.itemName && <p>{errors.itemName}</p>}
      </div>

      {/* Quantity */}
      <div style={{ marginBottom: 10 }}>
        <label>
          Quantity
          <input
            type="number"
            name="quantity"
            value={data.quantity}
            onChange={handleChange}
          />
        </label>
        {errors.quantity && <p>{errors.quantity}</p>}
      </div>

      {/* Price */}
      <div style={{ marginBottom: 10 }}>
        <label>
          Price (per item)
          <input
            type="number"
            name="price"
            value={data.price}
            onChange={handleChange}
          />
        </label>
        {errors.price && <p>{errors.price}</p>}
      </div>

      {/* GST */}
      <div style={{ marginBottom: 10 }}>
        <label>
          GST %
          <input
            type="number"
            name="gstPercent"
            value={data.gstPercent}
            onChange={handleChange}
          />
        </label>
        {errors.gstPercent && <p>{errors.gstPercent}</p>}
      </div>

      {/* Discount */}
      <div style={{ marginBottom: 10 }}>
        <label>
          Discount %
          <input
            type="number"
            name="discountPercent"
            value={data.discountPercent}
            onChange={handleChange}
          />
        </label>
        {errors.discountPercent && <p>{errors.discountPercent}</p>}
      </div>

      {result && <InvoicePreview result={result} data={data}/>}
    </div>
  );
}

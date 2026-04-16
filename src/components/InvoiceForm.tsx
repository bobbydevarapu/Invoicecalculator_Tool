import { useState } from "react";
import type { InvoiceInput, InvoiceItem } from "../types/invoice";
import { calculateInvoice } from "../utils/calculate";
import { validateInvoice } from "../utils/validate";
import InvoicePreview from "./InvoicePreview";

const createItem = (): InvoiceItem => ({
  id: typeof crypto !== "undefined" ? crypto.randomUUID() : Math.random().toString(36).slice(2),
  itemName: "",
  quantity: 1,
  price: 0,
});

const initialData: InvoiceInput = {
  items: [createItem()],
  gstPercent: 18,
  discountPercent: 0,
};

export default function InvoiceForm() {
  const [data, setData] = useState<InvoiceInput>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function updateAndValidate(updatedData: InvoiceInput): InvoiceInput {
    const sanitizedData: InvoiceInput = {
      ...updatedData,
      items: updatedData.items.length > 0 ? updatedData.items : [createItem()],
    };

    setData(sanitizedData);
    const validationResult = validateInvoice(sanitizedData);
    setErrors(validationResult.errors);
    return sanitizedData;
  }

  function handleItemChange(
    index: number,
    field: keyof Pick<InvoiceItem, "itemName" | "quantity" | "price">,
    value: string
  ) {
    setData((prevData) => {
      const updatedItems = prevData.items.map((item, itemIndex) => {
        if (itemIndex !== index) {
          return item;
        }

        if (field === "itemName") {
          return { ...item, itemName: value };
        }

        return { ...item, [field]: Number(value) };
      });

      const updatedData = {
        ...prevData,
        items: updatedItems,
      };
      const validationResult = validateInvoice(updatedData);
      setErrors(validationResult.errors);
      return updatedData;
    });
  }

  function handleInvoiceFieldChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type } = e.target;

    const updatedData: InvoiceInput = {
      ...data,
      [name]: type === "number" ? Number(value) : value,
    };

    updateAndValidate(updatedData);
  }

  function addItem() {
    setData((prevData) => {
      const updatedData = {
        ...prevData,
        items: [...prevData.items, createItem()],
      };
      const validationResult = validateInvoice(updatedData);
      setErrors(validationResult.errors);
      return updatedData;
    });
  }

  function removeItem(index: number) {
    setData((prevData) => {
      if (prevData.items.length === 1) {
        return prevData;
      }

      const updatedItems = prevData.items.filter((_, itemIndex) => itemIndex !== index);
      const safeItems = updatedItems.length > 0 ? updatedItems : [createItem()];
      const updatedData = {
        ...prevData,
        items: safeItems,
      };

      const validationResult = validateInvoice(updatedData);
      setErrors(validationResult.errors);
      return updatedData;
    });
  }

  const validation = validateInvoice(data);
  const result = validation.isValid ? calculateInvoice(data) : null;

  return (
    <div className="invoice-grid">
      <section className="panel panel-form">
        <div className="panel-header">
          <h2>Invoice Builder</h2>
          <p>Add line items, apply tax and discount, then export as PDF.</p>
        </div>

        {data.items.map((item, index) => (
          <article key={item.id} className="item-card">
            <div className="item-card-header">
              <h3>Item {index + 1}</h3>
              <button
                type="button"
                className="btn ghost"
                onClick={() => removeItem(index)}
                disabled={data.items.length === 1}
              >
                Remove
              </button>
            </div>

            <div className="field-row full">
              <label className="field">
                Item Name
                <input
                  name={`itemName-${index}`}
                  value={item.itemName}
                  onChange={(e) => handleItemChange(index, "itemName", e.target.value)}
                  placeholder="e.g. Website Design"
                  inputMode="text"
                  enterKeyHint="next"
                  autoComplete="off"
                />
              </label>
              {errors[`items.${index}.itemName`] && (
                <p className="error-text">{errors[`items.${index}.itemName`]}</p>
              )}
            </div>

            <div className="field-row">
              <label className="field">
                Quantity
                <input
                  type="number"
                  min={1}
                  name={`quantity-${index}`}
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  enterKeyHint="next"
                />
              </label>
              <label className="field">
                Price (INR)
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  name={`price-${index}`}
                  value={item.price}
                  onChange={(e) => handleItemChange(index, "price", e.target.value)}
                  inputMode="decimal"
                  enterKeyHint="next"
                />
              </label>
            </div>

            {(errors[`items.${index}.quantity`] || errors[`items.${index}.price`]) && (
              <p className="error-text">
                {errors[`items.${index}.quantity`] || errors[`items.${index}.price`]}
              </p>
            )}
          </article>
        ))}

        {errors.items && <p className="error-text">{errors.items}</p>}

        <button type="button" className="btn" onClick={addItem}>
          + Add Another Item
        </button>

        <div className="field-row totals-config">
          <label className="field">
            GST %
            <input
              type="number"
              min={0}
              max={28}
              step="0.01"
              name="gstPercent"
              value={data.gstPercent}
              onChange={handleInvoiceFieldChange}
              inputMode="decimal"
              enterKeyHint="next"
            />
            {errors.gstPercent && <p className="error-text">{errors.gstPercent}</p>}
          </label>
          <label className="field">
            Discount %
            <input
              type="number"
              min={0}
              max={100}
              step="0.01"
              name="discountPercent"
              value={data.discountPercent}
              onChange={handleInvoiceFieldChange}
              inputMode="decimal"
              enterKeyHint="done"
            />
            {errors.discountPercent && <p className="error-text">{errors.discountPercent}</p>}
          </label>
        </div>
      </section>

      <section className="panel panel-preview">
        {result ? (
          <InvoicePreview result={result} data={data} />
        ) : (
          <div className="preview-placeholder">
            <h3>Preview unavailable</h3>
            <p>Resolve validation errors to see totals and download the invoice.</p>
          </div>
        )}
      </section>
    </div>
  );
}

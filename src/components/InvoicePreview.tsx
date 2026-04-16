import { BlobProvider } from "@react-pdf/renderer";
import type { InvoiceInput, InvoiceResult } from "../types/invoice";
import { formatINR } from "../utils/format";
import InvoicePDF from "./InvoicePDF";

interface Props {
  data: InvoiceInput;
  result: InvoiceResult;
}

export default function InvoicePreview({ data, result }: Props) {
  return (
    <div className="preview-content">
      <h3>Invoice Summary</h3>

      <table className="item-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => {
            const fallbackTotal = item.quantity * item.price;
            const itemTotal = Number.isFinite(result.itemTotals[index])
              ? result.itemTotals[index]
              : fallbackTotal;

            return (
              <tr key={item.id}>
                <td>{item.itemName || `Item ${index + 1}`}</td>
                <td>{item.quantity}</td>
                <td>{formatINR(item.price)}</td>
                <td>{formatINR(itemTotal)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <table className="summary-table">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>{formatINR(result.subtotal)}</td>
          </tr>
          <tr>
            <td>Discount</td>
            <td>- {formatINR(result.discountAmount)}</td>
          </tr>
          <tr>
            <td>Taxable Amount</td>
            <td>{formatINR(result.taxableAmount)}</td>
          </tr>
          <tr>
            <td>GST ({data.gstPercent}%)</td>
            <td>{formatINR(result.gstAmount)}</td>
          </tr>
          <tr className="total-row">
            <td>Total</td>
            <td>{formatINR(result.finalAmount)}</td>
          </tr>
        </tbody>
      </table>

      <div className="pdf-download">
        <BlobProvider
          document={<InvoicePDF data={data} result={result} />}
        >
          {({ url, loading }) =>
            loading ? (
              <p>Preparing PDF...</p>
            ) : (
              <a
                href={url!}
                download="invoice.pdf"
                className="btn"
              >
                Download Invoice PDF
              </a>
            )
          }
        </BlobProvider>
      </div>
    </div>
  );
}

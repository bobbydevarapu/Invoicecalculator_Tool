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
    <div style={{ marginTop: 30 }}>
      <h3>Summary</h3>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td>Base Amount</td>
            <td style={{ textAlign: "right" }}>
              {formatINR(result.baseAmount)}
            </td>
          </tr>
          <tr>
            <td>Discount</td>
            <td style={{ textAlign: "right" }}>
              {formatINR(result.discountAmount)}
            </td>
          </tr>
          <tr>
            <td>Taxable Amount</td>
            <td style={{ textAlign: "right" }}>
              {formatINR(result.taxableAmount)}
            </td>
          </tr>
          <tr>
            <td>GST</td>
            <td style={{ textAlign: "right" }}>
              {formatINR(result.gstAmount)}
            </td>
          </tr>
          <tr>
            <td><strong>Total</strong></td>
            <td style={{ textAlign: "right" }}>
              <strong>{formatINR(result.finalAmount)}</strong>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Guaranteed PDF Download */}
      <div style={{ marginTop: 20 }}>
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
                style={{ fontWeight: "bold" }}
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

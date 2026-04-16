import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { InvoiceInput, InvoiceResult } from "../types/invoice";

interface Props {
  data: InvoiceInput;
  result: InvoiceResult;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#102a43",
  },

  header: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 13,
    marginBottom: 8,
    fontWeight: "bold",
  },

  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#d9e2ec",
    marginBottom: 15,
    borderRadius: 4,
  },

  tableRow: {
    flexDirection: "row",
  },

  tableHeader: {
    backgroundColor: "#f0f4f8",
    fontWeight: "bold",
  },

  cell: {
    padding: 6,
    borderRightWidth: 1,
    borderColor: "#d9e2ec",
  },

  lastCell: {
    padding: 6,
  },

  w35: { width: "35%" },
  w15: { width: "15%" },
  w25: { width: "25%" },
  w50: { width: "50%" },

  right: {
    textAlign: "right",
  },

  totalRow: {
    backgroundColor: "#e6fffa",
    fontWeight: "bold",
  },

  totalAmount: {
    color: "#0b7285",
  },

  footer: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#555",
  },
});

export default function InvoicePDF({ data, result }: Props) {
  const invoiceNumber = `INV-${Date.now()}`;
  const invoiceDate = new Date().toLocaleDateString();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>INVOICE</Text>

        <View style={styles.metaRow}>
          <Text>Invoice No: {invoiceNumber}</Text>
          <Text>Date: {invoiceDate}</Text>
        </View>

        <Text style={styles.sectionTitle}>Item Details</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.cell, styles.w35]}>Item</Text>
            <Text style={[styles.cell, styles.w15, styles.right]}>Qty</Text>
            <Text style={[styles.cell, styles.w25, styles.right]}>Price</Text>
            <Text style={[styles.lastCell, styles.w25, styles.right]}>
              Amount
            </Text>
          </View>

          {data.items.map((item, index) => {
            const fallbackTotal = item.quantity * item.price;
            const itemTotal = Number.isFinite(result.itemTotals[index])
              ? result.itemTotals[index]
              : fallbackTotal;

            return (
              <View key={item.id} style={styles.tableRow}>
                <Text style={[styles.cell, styles.w35]}>{item.itemName || `Item ${index + 1}`}</Text>
                <Text style={[styles.cell, styles.w15, styles.right]}>
                  {item.quantity}
                </Text>
                <Text style={[styles.cell, styles.w25, styles.right]}>
                  INR {item.price.toFixed(2)}
                </Text>
                <Text style={[styles.lastCell, styles.w25, styles.right]}>
                  INR {itemTotal.toFixed(2)}
                </Text>
              </View>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Summary</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.cell, styles.w50]}>Subtotal</Text>
            <Text style={[styles.lastCell, styles.w50, styles.right]}>
              INR {result.subtotal.toFixed(2)}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.cell, styles.w50]}>Discount</Text>
            <Text style={[styles.lastCell, styles.w50, styles.right]}>
              INR {result.discountAmount.toFixed(2)}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.cell, styles.w50]}>Taxable Amount</Text>
            <Text style={[styles.lastCell, styles.w50, styles.right]}>
              INR {result.taxableAmount.toFixed(2)}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.cell, styles.w50]}>GST ({data.gstPercent}%)</Text>
            <Text style={[styles.lastCell, styles.w50, styles.right]}>
              INR {result.gstAmount.toFixed(2)}
            </Text>
          </View>

          <View style={[styles.tableRow, styles.totalRow]}>
            <Text style={[styles.cell, styles.w50]}>TOTAL</Text>
            <Text
              style={[
                styles.lastCell,
                styles.w50,
                styles.right,
                styles.totalAmount,
              ]}
            >
              INR {result.finalAmount.toFixed(2)}
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Thank you for your business!
        </Text>
      </Page>
    </Document>
  );
}

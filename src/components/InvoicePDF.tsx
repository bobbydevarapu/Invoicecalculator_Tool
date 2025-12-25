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
    borderColor: "#000",
    marginBottom: 15,
  },

  tableRow: {
    flexDirection: "row",
  },

  tableHeader: {
    backgroundColor: "#eee",
    fontWeight: "bold",
  },

  cell: {
    padding: 6,
    borderRightWidth: 1,
    borderColor: "#000",
  },

  lastCell: {
    padding: 6,
  },

  w40: { width: "40%" },
  w20: { width: "20%" },
  w50: { width: "50%" },

  right: {
    textAlign: "right",
  },

  /* ✅ FINAL TOTAL ROW STYLE */
  totalRow: {
    backgroundColor: "#e6f4ea", // light professional green
    fontWeight: "bold",
  },

  totalAmount: {
    color: "#1b5e20", // dark green for emphasis
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

        {/* ITEM TABLE */}
        <Text style={styles.sectionTitle}>Item Details</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.cell, styles.w40]}>Item</Text>
            <Text style={[styles.cell, styles.w20, styles.right]}>Qty</Text>
            <Text style={[styles.cell, styles.w20, styles.right]}>Price</Text>
            <Text style={[styles.lastCell, styles.w20, styles.right]}>
              Amount
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.cell, styles.w40]}>{data.itemName}</Text>
            <Text style={[styles.cell, styles.w20, styles.right]}>
              {data.quantity}
            </Text>
            <Text style={[styles.cell, styles.w20, styles.right]}>
              INR {data.price}
            </Text>
            <Text style={[styles.lastCell, styles.w20, styles.right]}>
              INR {result.baseAmount}
            </Text>
          </View>
        </View>

        {/* SUMMARY TABLE */}
        <Text style={styles.sectionTitle}>Summary</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.cell, styles.w50]}>Base Amount</Text>
            <Text style={[styles.lastCell, styles.w50, styles.right]}>
              INR {result.baseAmount}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.cell, styles.w50]}>Discount</Text>
            <Text style={[styles.lastCell, styles.w50, styles.right]}>
              INR {result.discountAmount}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.cell, styles.w50]}>Taxable Amount</Text>
            <Text style={[styles.lastCell, styles.w50, styles.right]}>
              INR {result.taxableAmount}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.cell, styles.w50]}>GST</Text>
            <Text style={[styles.lastCell, styles.w50, styles.right]}>
              INR {result.gstAmount}
            </Text>
          </View>

          {/* ✅ GREEN TOTAL ROW */}
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
              INR {result.finalAmount}
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

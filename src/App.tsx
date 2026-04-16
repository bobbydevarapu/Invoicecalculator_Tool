import InvoiceForm from "./components/InvoiceForm";

function App() {
  return (
    <div className="app-shell">
      <header className="hero">
        <p className="hero-kicker">Invoicecalculator Tool</p>
        <h1>Tax and Invoice Calculator</h1>
        <p>
          Build invoices with multiple items, apply GST and discounts, preview the total,
          and export a polished PDF in one flow.
        </p>
      </header>
      <InvoiceForm />
    </div>
  );
}

export default App;

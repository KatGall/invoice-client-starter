import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import PersonIndex from "./persons/PersonIndex";
import PersonDetail from "./persons/PersonDetail";
import PersonForm from "./persons/PersonForm";
import InvoiceIndex from "./invoices/InvoiceIndex";
import InvoiceForm from "./invoices/InvoiceForm";
import InvoiceDetail from "./invoices/InvoiceDetail";
import StatisticsIndex from "./statistics/StatisticsIndex";

export function App() {
  const navbarStyle = {
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    padding: "10px",
    marginBottom: "20px",
  };

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg" style={navbarStyle}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to={"/persons"}>Osoby</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/invoices"}>Faktury</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/statistics"}>Statistiky</Link>
            </li>
          </ul>
        </nav>

        <div style={{ padding: "20px" }}>
          <Routes>
            <Route index element={<Navigate to={"/persons"} />} />
            <Route path="/persons">
              <Route index element={<PersonIndex />} />
              <Route path="show/:id" element={<PersonDetail />} />
              <Route path="create" element={<PersonForm />} />
              <Route path="edit/:id" element={<PersonForm />} />
            </Route>

            <Route index element={<Navigate to={"/invoices"} />} />
            <Route path="/invoices">
              <Route index element={<InvoiceIndex />} />
              <Route path="show/:id" element={<InvoiceDetail />} />
              <Route path="create" element={<InvoiceForm />} />
              <Route path="edit/:id" element={<InvoiceForm />} />
            </Route>

            <Route index element={<Navigate to={"/statistics"} />} />
            <Route path="/statistics">
              <Route index element={<StatisticsIndex />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

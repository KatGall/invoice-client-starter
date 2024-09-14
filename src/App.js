
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
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to={"/persons"} >Osoby</Link>
            </li>
            <li>
              <Link className="nav-link" to={"/invoices"} >Faktury</Link>
            </li>
            <li>
              <Link className="nav-link" to={"/statistics"} >Statistiky</Link>
            </li>
          </ul>
        </nav>

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
    </Router>
  );
}

export default App;

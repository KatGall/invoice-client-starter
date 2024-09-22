import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../utils/api";
import InputField from "../components/InputField";
import InputSelect from "../components/InputSelect";
import FlashMessage from "../components/FlashMessage";

const InvoiceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [invoice, setInvoice] = useState({
    invoiceNumber: "",
    seller: "", 
    buyer: "", 
    issued: "",
    dueDate: "",
    product: "",
    price: 0,
    vat: 0,
    note: ""
  });

  const [persons, setPersons] = useState([]);
  const [sentState, setSent] = useState(false);
  const [successState, setSuccess] = useState(false);
  const [errorState, setError] = useState(null);

  useEffect(() => {
    if (id) {
      apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
    }
    apiGet("/api/persons").then((data) => {
      setPersons(data);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice({
      ...invoice,
      [name]: value
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setInvoice({
      ...invoice,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Najdi vybrané osoby podle ID
    const selectedSeller = persons.find(person => person._id === parseInt(invoice.seller, 10));
    const selectedBuyer = persons.find(person => person._id === parseInt(invoice.buyer, 10));
  
    // Vytvoř tělo požadavku s aktuálními hodnotami
    const body = {
      invoiceNumber: parseInt(invoice.invoiceNumber, 10), // Převod na celé číslo
      seller: selectedSeller || {}, // Nebo nastav prázdné objekty, pokud nejsou vybráni
      buyer: selectedBuyer || {},
      issued: invoice.issued,
      dueDate: invoice.dueDate,
      product: invoice.product,
      price: parseInt(invoice.price, 10), // Převod na celé číslo
      vat: parseInt(invoice.vat, 10),     // Převod na celé číslo
      note: invoice.note
    };
  
    // Odeslání dat na server
    (id ? apiPut("/api/invoices/" + id, body) : apiPost("/api/invoices", body))
      .then(() => {
        setSent(true);
        setSuccess(true);
        navigate("/invoices");
      })
      .catch((error) => {
        setError(`Chyba: ${error.message}`);
        setSent(true);
        setSuccess(false);
      });
  };
  return (
    <div>
      <h1>{id ? "Upravit" : "Vytvořit"} faktura</h1>
      <hr />
      {errorState && <div className="alert alert-danger">{errorState}</div>}
      {sentState && (
        <FlashMessage
          theme={successState ? "success" : "error"}
          text={successState ? "Uložení faktury proběhlo úspěšně." : "Chyba při ukládání faktury."}
        />
      )}
      <form onSubmit={handleSubmit}>
        <InputField
          required={true}
          type="text"
          name="invoiceNumber"
          label="FA číslo"
          value={invoice.invoiceNumber}
          handleChange={handleChange}
        />

        <h3>Prodejce</h3>
        <InputSelect
          label="Vyberte prodejce"
          name="seller"
          value={invoice.seller}
          items={persons} // Seznam osob
          prompt="Zvolte prodejce"
          handleChange={handleSelectChange}
        />

        <h3>Kupující</h3>
        <InputSelect
          label="Vyberte kupujícího"
          name="buyer"
          value={invoice.buyer}
          items={persons} // Seznam osob
          prompt="Zvolte kupujícího"
          handleChange={handleSelectChange}
        />

        <InputField
          required={true}
          type="date"
          name="issued"
          label="Datum vystavení"
          value={invoice.issued}
          handleChange={handleChange}
        />
        <InputField
          required={true}
          type="date"
          name="dueDate"
          label="Datum splatnosti"
          value={invoice.dueDate}
          handleChange={handleChange}
        />
        <InputField
          required={true}
          type="text"
          name="product"
          label="Produkt"
          value={invoice.product}
          handleChange={handleChange}
        />
        <InputField
          required={true}
          type="number"
          name="price"
          label="Cena"
          value={invoice.price}
          handleChange={handleChange}
        />
        <InputField
          required={true}
          type="number"
          name="vat"
          label="DPH"
          value={invoice.vat}
          handleChange={handleChange}
        />
        <InputField
          type="text"
          name="note"
          label="Poznámka"
          value={invoice.note}
          handleChange={handleChange}
        />

        <input type="submit" className="btn btn-primary" value="Uložit" />
      </form>
    </div>
  );
};

export default InvoiceForm;

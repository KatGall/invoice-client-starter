import React, { useState, useEffect } from "react";
import { apiGet, apiDelete } from "../utils/api";
import InvoiceTable from "./InvoiceTable"; 
import InvoiceFilter from "./InvoiceFilter";

const InvoiceIndex = () => {
    const [personsList, setPersonsList] = useState([]);
    const [invoicesState, setInvoices] = useState([]);
    const [filterState, setFilter] = useState({
        buyerID: undefined,
        sellerID: undefined,
        product: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        limit: 10, 
    });

    const deleteInvoice = async (id) => {
        try {
            await apiDelete(`/api/invoices/${id}`);
            setInvoices(invoicesState.filter((invoice) => invoice.id !== id));
        } catch (error) {
            console.error("Chyba při mazání faktury:", error);
            alert("Chyba při mazání faktury: " + error.message);
        }
    };

    useEffect(() => {
        apiGet('/api/persons').then((data) => setPersonsList(data));
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        try {
            const data = await apiGet('/api/invoices', filterState);
            setInvoices(data);
        } catch (error) {
            console.error("Chyba při získávání faktur:", error);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value === "" ? undefined : e.target.value;
        setFilter(prevState => ({
            ...prevState,
            [e.target.name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchInvoices();
    };

    const containerStyle = {
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        padding: "10px",
        justifyContent: "space-between"
    };

    const sectionStyle = {
        flex: 1,
        padding: "20px",
        margin: "10px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    };

    return (
        <div style={containerStyle}>
            <div style={sectionStyle}>
                <h1>Seznam faktur</h1>
                <InvoiceFilter
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    persons={personsList}
                    filter={filterState}
                    confirm="Filtrovat faktury"
                />
                <InvoiceTable deleteInvoice={deleteInvoice} items={invoicesState} label="Počet faktur:" />
            </div>
        </div>
    );
};

export default InvoiceIndex;

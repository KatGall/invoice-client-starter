import React, { useState, useEffect } from "react";
import { apiGet, apiDelete } from "../utils/api";
import InvoiceTable from "./InvoiceTable"; 
import InvoiceFilter from "./InvoiceFilter";

const InvoiceIndex = () => {
    const [personsList,setPersonsList] = useState([])
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

    return (
        <div>
            <h1>Seznam faktur</h1>
            <hr />
            <InvoiceFilter
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                persons={personsList}
                filter={filterState}
                confirm="Filtrovat faktury"
            />
            <hr />
            <InvoiceTable deleteInvoice={deleteInvoice} items={invoicesState} label="Počet faktur:" />
        </div>
    );
};

export default InvoiceIndex;

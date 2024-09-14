import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { apiGet } from "../utils/api";

const InvoiceDetail = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState({});

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const data = await apiGet(`/api/invoices/${id}`);
                setInvoice(data);
            } catch (error) {
                console.error("Error fetching invoice:", error);
            }
        };

        if (id) {
            fetchInvoice();
        }
    }, [id]);

    return (
        <div>
            <h1>Detail faktury</h1>
            <hr />
            <h3>{invoice._id} ({invoice.invoiceNumber})</h3>
            <p>
                <strong>Datum vydání:</strong>
                <br />
                {invoice.issued}
            </p>
            <p>
                <strong>Datum splatnosti:</strong>
                <br />
                {invoice.dueDate}
            </p>
            <p>
                <strong>Název:</strong>
                <br />
                {invoice.note}
            </p>
            <p>
                <strong>Produkt:</strong>
                <br />
                {invoice.product}
            </p>
            <p>
                <strong>Prodávající:</strong>
                <br />
                {invoice.seller?.name} ({invoice.seller?.identificationNumber})
            </p>
            <p>
                <strong>Kupující:</strong>
                <br />
                {invoice.buyer?.name} ({invoice.buyer?.identificationNumber})
            </p>
            <p>
                <strong>Částka:</strong>
                <br />
                {invoice.price} Kč
            </p>
        </div>
    );
};

export default InvoiceDetail;

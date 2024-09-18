import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiGet } from "../utils/api";
import Country from "./Country";


const PersonDetail = () => {
    const { id } = useParams();
    const [person, setPerson] = useState({});
    const [salesInvoices, setSalesInvoices] = useState([]);
    const [purchasesInvoices, setPurchasesInvoices] = useState([]);

    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const data = await apiGet(`/api/persons/${id}`);
                setPerson(data);
            } catch (error) {
                console.error("Chyba při načítání detailu osoby:", error);
            }
        };
        if (id) {
            fetchPerson();
        }
    }, [id]);

    useEffect(() => {
        if (person.identificationNumber) {
            apiGet(`/api/identification/${person.identificationNumber}/sales`)
                .then((data) => setSalesInvoices(data))
                .catch((error) => console.error("Failed to fetch sales invoices:", error));
        }
    }, [person]);

    useEffect(() => {
        if (person.identificationNumber) {
            apiGet(`/api/identification/${person.identificationNumber}/purchases`)
                .then((data) => setPurchasesInvoices(data))
                .catch((error) => console.error("Failed to fetch purchased invoices:", error));
        }
    }, [person]);

    // Přiřazení názvu státu na základě hodnoty country
    const country = person.country === Country.CZECHIA ? "Česká republika" : "Slovensko";

    return (
        <div>
            <div>
                <h1>Detail osoby</h1>
                <hr />
                <h3>{person.name} ({person.identificationNumber})</h3>
                <p>
                    <strong>DIČ:</strong>
                    <br />
                    {person.taxNumber}
                </p>
                <p>
                    <strong>Bankovní účet:</strong>
                    <br />
                    {person.accountNumber}/{person.bankCode} ({person.iban})
                </p>
                <p>
                    <strong>Tel.:</strong>
                    <br />
                    {person.telephone}
                </p>
                <p>
                    <strong>Mail:</strong>
                    <br />
                    {person.mail}
                </p>
                <p>
                    <strong>Sídlo:</strong>
                    <br />
                    {person.street}, {person.city}, {person.zip}, {country}
                </p>
                <p>
                    <strong>Poznámka:</strong>
                    <br />
                    {person.note}
                </p>

                <h2>Vydané faktury</h2>
                <table className="table table-dashed">
                    <thead>
                        <tr>
                            <th>Číslo faktury</th>
                            <th>Odběratel</th>
                            <th>Cena</th>
                            <th>Produkt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesInvoices.length > 0 ? (
                            salesInvoices.map((invoice, index) => (
                                <tr key={invoice.id || index}>
                                    <td>{invoice.invoiceNumber}</td>
                                    <td><Link to={`/persons/show/${invoice.buyer._id}`} >
                                        {invoice.buyer.name}
                                    </Link></td>
                                    <td>{invoice.price} Kč</td>
                                    <td>{invoice.product}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">Žádné faktury k zobrazení</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <h2>Přijaté faktury</h2>
                <table className="table table-dashed">
                    <thead>
                        <tr>
                            <th>Číslo faktury</th>
                            <th>Dodavatel</th>
                            <th>Cena</th>
                            <th>Produkt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchasesInvoices.length > 0 ? (
                            purchasesInvoices.map((invoice, index) => (
                                <tr key={invoice.id || index}>
                                    <td>{invoice.invoiceNumber}</td>
                                    <td><Link to={`/persons/show/${invoice.seller._id}`} >
                                        {invoice.seller.name}
                                    </Link></td>
                                    <td>{invoice.price} Kč</td>
                                    <td>{invoice.product}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">Žádné faktury k zobrazení</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PersonDetail;

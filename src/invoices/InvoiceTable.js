import React from "react";
import { Link } from "react-router-dom";
import dateStringFormatter from "../utils/dateStringFormatter";

const InvoiceTable = ({ label, items, deleteInvoice }) => {
    return (
        <div>
            <p>
                {label} {items.length}
            </p>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Číslo faktury</th>
                        <th>IČO dodavatele</th>
                        <th>IČO  odběratele</th>
                        <th>Cena</th>
                        <th>Produkt/Služba</th>
                        <th>Datum vydání</th>
                        <th>Datum splatnosti</th>
                        <th colSpan={3}>Akce</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td>{item.invoiceNumber}</td>
                            <td>{item.seller.identificationNumber}</td>
                            <td>{item.buyer.identificationNumber}</td>
                            <td>{item.price}Kč</td>
                            <td>{item.product}</td>
                            <td>{dateStringFormatter(item.issued, true)}</td>
                            <td>{dateStringFormatter(item.dueDate, true)}</td>
                            <td>
                                <div className="btn-group">
                                    <Link
                                        to={"/invoices/show/" + item._id}
                                        className="btn btn-sm btn-info"
                                    >
                                        Zobrazit
                                    </Link>
                                    <Link
                                        to={"/invoices/edit/" + item._id}
                                        className="btn btn-sm btn-warning"
                                    >
                                        Upravit
                                    </Link>
                                    <button
                                        onClick={() => deleteInvoice(item._id)}
                                        className="btn btn-sm btn-danger"
                                    >
                                        Odstranit
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={"/invoices/create"} className="btn btn-success">
                Nová faktura
            </Link>
        </div>
    );
};

export default InvoiceTable;

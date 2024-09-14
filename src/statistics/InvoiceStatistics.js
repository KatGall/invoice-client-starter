import React, { useState, useEffect } from "react";
import { apiGet } from "../utils/api";

const InvoiceStatistics = () => {
    const [invoiceStatistics, setInvoiceStatistics] = useState({
        currentYearSum: 0,
        allTimeSum: 0,
        invoicesCount: 0,
    });

    useEffect(() => {
        apiGet('/api/invoices/statistics')
            .then((data) => setInvoiceStatistics(data))
            .catch(error => console.error("Error:", error));
    }, []);

    const tableStyle = {
        width: "100%",
        borderCollapse: "collapse",
        margin: "20px 0",
    };

    const thTdStyle = {
        padding: "10px",
        textAlign: "left",
        borderBottom: "1px solid #ddd",
    };

    const thStyle = {
        backgroundColor: "#f0f0f0",
    };

    return (
        <div>
            <h3>Statistiky faktur</h3>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={{ ...thTdStyle, ...thStyle }}>Statistika</th>
                        <th style={{ ...thTdStyle, ...thStyle }}>Hodnota</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={thTdStyle}>Celková fakturace za aktuální rok</td>
                        <td style={thTdStyle}>{invoiceStatistics.currentYearSum} Kč</td>
                    </tr>
                    <tr>
                        <td style={thTdStyle}>Fakturace celkem</td>
                        <td style={thTdStyle}>{invoiceStatistics.allTimeSum} Kč</td>
                    </tr>
                    <tr>
                        <td style={thTdStyle}>Počet faktur</td>
                        <td style={thTdStyle}>{invoiceStatistics.invoicesCount}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceStatistics;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../utils/api";

const PersonStatistics = () => {
    const [personStatistics, setPersonStatistics] = useState([]);

    useEffect(() => {
        apiGet('/api/persons/statistics')
            .then((data) => setPersonStatistics(data))
            .catch((error) => console.error("Error:", error));
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
            <h3>Statistiky osob</h3>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={{ ...thTdStyle, ...thStyle }}>#</th>
                        <th style={{ ...thTdStyle, ...thStyle }}>Jméno</th>
                        <th style={{ ...thTdStyle, ...thStyle }}>Fakturované příjmy</th>
                    </tr>
                </thead>
                <tbody>
                    {personStatistics.length > 0 ? (
                        personStatistics.map((person, index) => (
                            <tr key={person.id || index}>
                                <td style={thTdStyle}>{index + 1}</td>
                                <td style={thTdStyle}>
                                    <Link to={`/persons/show/${person.personId}`}>
                                        {person.personName}
                                    </Link>
                                </td>
                                <td style={thTdStyle}>
                                    {person.revenue ? `${person.revenue} Kč` : "0 Kč"}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td style={thTdStyle} colSpan="3">Žádné statistiky k zobrazení</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PersonStatistics;

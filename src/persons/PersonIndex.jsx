import React, { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../utils/api";
import PersonTable from "./PersonTable";

const PersonIndex = () => {
    const [persons, setPersons] = useState([]);

    const deletePerson = async (id) => {
        try {
            await apiDelete("/api/persons/" + id);
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
        setPersons(persons.filter((item) => item._id !== id));
    };

    useEffect(() => {
        apiGet("/api/persons").then((data) => setPersons(data));
    }, []);

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
                <h1>Seznam osob</h1>
                <PersonTable deletePerson={deletePerson} items={persons} label="Počet osob:" />
            </div>
        </div>
    );
};

export default PersonIndex;

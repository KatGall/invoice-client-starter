import PersonStatistics from "./PersonStatistics";
import InvoiceStatistics from "./InvoiceStatistics";

const StatisticsIndex = () => {
    const containerStyle = {
        display: "flex",
        flexDirection: "row", // Zarovná statistiky vedle sebe
        gap: "20px", // Mezera mezi komponentami
        padding: "10px",
        justifyContent: "space-between" // Rozprostře je rovnoměrně po stránce
    };

    const sectionStyle = {
        flex: 1, // Obě komponenty dostanou stejný prostor
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
                <PersonStatistics />
            </div>
            <div style={sectionStyle}>
                <InvoiceStatistics />
            </div>
        </div>
    );
};

export default StatisticsIndex;

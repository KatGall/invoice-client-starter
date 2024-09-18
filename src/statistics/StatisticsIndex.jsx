import PersonStatistics from "./PersonStatistics";
import InvoiceStatistics from "./InvoiceStatistics";

const StatisticsIndex = () => {
    const containerStyle = {
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        padding: "10px",
        justifyContent: "space-between"
    };

    const sectionStyle = {
        flex: 1, // 
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

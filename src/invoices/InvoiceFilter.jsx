import React from "react";
import InputSelect from "../components/InputSelect";
import InputField from "../components/InputField";

const InvoiceFilter = ({ handleChange, handleSubmit, persons, filter, confirm }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
                    <InputSelect 
                        name="sellerID" 
                        handleChange={handleChange} 
                        label="Dodavatel" 
                        prompt="Vyber dodavatele" 
                        value={filter.sellerID ? filter.sellerID : ""} 
                        items={persons} 
                    />
                </div>
                <div className="col">
                    <InputSelect 
                        name="buyerID" 
                        handleChange={handleChange} 
                        label="Odběratel" 
                        prompt="Vyber odběratele" 
                        value={filter.buyerID ? filter.buyerID : ""} 
                        items={persons} 
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <InputField 
                        name="minPrice" 
                        type="number" 
                        handleChange={handleChange} 
                        label="Minimální cena" 
                        prompt="Zadej minimální cenu" 
                        value={filter.minPrice ? filter.minPrice : ""} 
                    />
                </div>
                <div className="col">
                    <InputField 
                        name="maxPrice" 
                        type="number" 
                        handleChange={handleChange} 
                        label="Maximální cena" 
                        prompt="Zadej maximální cenu" 
                        value={filter.maxPrice ? filter.maxPrice : ""} 
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <InputField 
                        name="product" 
                        type="text" 
                        handleChange={handleChange} 
                        label="Product/Služba" 
                        prompt="Vyber product/službu" 
                        value={filter.product ? filter.product : ""} 
                    />
                </div>
                <div className="col">
                    <InputField 
                        name="year" 
                        type="number" 
                        handleChange={handleChange} 
                        label="Rok" 
                        prompt="Zadej rok" 
                        value={filter.year ? filter.year : ""} 
                    />
                </div>
            </div>
            <button type="submit" className="btn btn-secondary float-right mt-2">
                {confirm}
            </button>
        </form>
    );
};

export default InvoiceFilter;

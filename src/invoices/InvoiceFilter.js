import React from "react";
import InputSelect from "../components/InputSelect";
import InputField from "../components/InputField";
const InvoiceFilter = ({ handleChange, handleSubmit, persons, filter, confirm }) => {
    return (
        <form onSubmit={handleSubmit}>
          <div className ="row">
            <div className="col">
                <InputSelect name="sellerId" handleChange={handleChange} label="Dodavatel" prompt="Vyber dodavatele" value={filter.sellerId ? filter.sellerId : ""} items={persons} />
            </div>
            <div className="col">
                <InputSelect name="buyerId" handleChange={handleChange} label="Odběratel" prompt="Vyber odběratele" value={filter.buyerId ? filter.buyerId :""} items={persons} />
            </div>
            </div>
            <div className ="row">
            <div className="col">
                <InputField name="minPrice" type="number" handleChange={handleChange} label="minimální cena" prompt="zadej minimální cenu" value={filter.minPrice ? filter.minPrice : ""} />
            </div>
           
            <div className="col">
             <InputField  name="maxPrice" type="number" handleChange={handleChange} label="minimalní cena" prompt="zadej maximální cenu" value={filter.maxPrice ? filter.maxPrice : ""}/>
            </div>
            </div>
            <div className="col">
                <InputField name="product" type="text" handleChange={handleChange} label="Product/Služba" prompt="Vyber product/službu" value={filter.product ? filter.product : ""} />
            </div>
        
            <button type="submit"
                    className="btn btn-secondary float-right mt-2">
                    {confirm} </button>
            
        </form>
    );
};

export default InvoiceFilter;

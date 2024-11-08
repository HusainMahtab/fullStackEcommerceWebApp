import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VerticalCart from './VerticalCart';
function SearchProductMobile() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearchProduct = async () => {
        if (!inputValue) return;
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/products/search-products?q=${inputValue}`);
            setData(response.data.data.product);
            console.log("mobile search response", response);
        } catch (error) {
            console.error("Error while searching products", error);
        } finally {
            setLoading(false);
        }
    };

    // Trigger search whenever inputValue changes
    useEffect(() => {
        handleSearchProduct();
    }, [inputValue]);

    return (
        <div>
            <div className='w-full flex justify-center items-center p-4'>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter name,category,brand"
                    className='p-2 font-bold text-lg outline-none border-b-2 border-b-gray-600'
                    autoFocus
                />
            </div>
            {
             loading ? (
               <div className='w-full flex justify-center items-center'>
                  <p className='p-2 bg-gray-600 text-white font-semibold text-lg'>loading,wait...</p>
               </div>
            ) : (
              <div>
                 <VerticalCart loading={loading} data={data} />
              </div>
            )}
        </div>
    );
}

export default SearchProductMobile;

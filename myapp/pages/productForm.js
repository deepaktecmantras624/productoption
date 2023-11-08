import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LOCALSTORAGE_NAME, LOCALSTORAGE_NAME_PRODUCT } from "@/common/constant";


const Productform = ({ product }) => {
  const [optionType, setOptionType] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [productOptions, setProductOptions] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [optionid,setOptionId]=useState('')
  const [optionValues ,setOptionValues] = useState([]);
  // console.log("🚀 ~ file: productForm.js:13 ~ Productform ~ optionid:", optionid)
  console.log("🚀 ~ file: productForm.js:10 ~ Productform ~ selectedOptions:", selectedOptions)
  
  useEffect(()=>{
    const optionValueList =  localStorage.getItem(LOCALSTORAGE_NAME);
    //console.log('zzzzz',JSON.parse(optionValueList));
    console.log('xxxx',JSON.parse(optionValueList).filter((option)=> option.id == optionid));
  },[optionid]);

  useEffect(() => {
    const savedOptions = localStorage.getItem(LOCALSTORAGE_NAME);
    if (savedOptions) {
      setOptions(JSON.parse(savedOptions));
    }
  }, []);

  useEffect(() => {
    const productKey = `productOptions_${product.id}`;
    const savedProductOptions = localStorage.getItem(productKey);
    if (savedProductOptions) {
      setProductOptions(JSON.parse(savedProductOptions));
    } else {
      // If no saved options found, initialize with an empty array
      setProductOptions([]);
    }
  }, [product.id]);

  // Adding the option in the productOption
  const handleAddButtonClick = () => {
    if (selectedOptions.optionId && selectedOptions.optionValueId && quantity > 0) {
      const newOption = {
        optionId: selectedOptions.optionId,
        optionValueId: selectedOptions.optionValueId,
        optionName: selectedOptions.name,
        quantity: quantity,
        type: optionType,
      };
      // Generate a unique key for the product (you can use the product ID)
      const productKey = `productOptions_${product.id}`;

      // Retrieve existing productOptions from localStorage or create an empty array
      const existingProductOptions =
        JSON.parse(localStorage.getItem(productKey)) || [];

      // Update the productOptions for the specific product
      const updatedProductOptions = [...existingProductOptions, newOption];
      localStorage.setItem(productKey, JSON.stringify(updatedProductOptions));

      setProductOptions(updatedProductOptions);
      // setSelectedOptions("");
      setSelectedOptions({})
      setQuantity(1);
    }
  };

  // Delete functionality
  const handleDelete = (index) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (shouldDelete) {
      const productKey = `productOptions_${product.id}`;
      const updatedData = [...productOptions];
      updatedData.splice(index, 1);
      setProductOptions(updatedData);

      // Update the data in localStorage for the specific product
      localStorage.setItem(productKey, JSON.stringify(updatedData));
    }
  };

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_NAME_PRODUCT, JSON.stringify(productOptions));
  }, [productOptions]);

  // Display the selected option in a table
  // const generateTableRows = () => {
  //   return (
      
  //     productOptions?.map((item, index) => (
  //       <tr key={index}>
  //         <td>{item.type}</td>
  //         <td>
  //           {Array.isArray(item.optionName)
  //             ? item.optionName.map((nameObj) => nameObj.name).join(", ")
  //             : item.optionName}
  //         </td>
  //         <td>{item.quantity}</td>
  //         <td>
  //           <button
  //             className="btn bg-red-600 hover:bg-red-700 text-white"
  //             onClick={() => handleDelete(index)}
  //           >
  //             Delete
  //           </button>
  //         </td>
  //       </tr>
  //     ))
  //   );
  // };

  const generateTableRows = () => {
    return (
      productOptions?.map((item, index) => {
        const selectedOption = options.find(option => option.id === item.optionId);
        const optionType = selectedOption ? selectedOption.type : '';
        return (
          <tr key={index}>
            <td>{optionType}</td>
            <td>
              {Array.isArray(item.optionName)
                ? item.optionName.map(nameObj => nameObj.name).join(", ")
                : item.optionName}
            </td>
            <td>{item.quantity}</td>
            <td>
              <button
                className="btn bg-red-600 hover:bg-red-700 text-white"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })
    );
  };
  
  const handleSelectChange = (e) => {
    const [optionValueId, name, optionId] = e.target.value.split(",");
    setSelectedOptions({  
      optionValueId: optionValueId,
      name: name,
      optionId: optionId,
    });

    const selectedOption=options.find((option)=>option.id === parseInt(optionId))
    if(selectedOption){
      setOptionType(selectedOption.type)
      setOptionValues(selectedOption.typeNames);
    }
    // setSelectedOptions({ optionValueId: '', name: '', optionId: '' })
    // console.log("🚀 ~ file: productForm.js:108 ~ handleSelectChange ~ setSelectedOptions:", selectedOptions)
  };
 
  const filteredOptions = options.filter(
    (option) => option.id === optionid
  );
    

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <Link
          className="text-blue-500 hover:underline block text-center mb-6"
          href="/product"
        >
          Product List
        </Link>
        <Link
          className="text-blue-500 hover:underline block text-center mb-6"
          href="/optionform"
        >
          Go to Option Form
        </Link>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover mb-6 rounded-lg"
        />
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          {product.title}
        </h2>
        <p className="text-gray-600 mb-2">
          <strong>Brand:</strong> {product.brand}
        </p>
        <p className="text-gray-700 font-semibold text-xl mb-4">
          ${product.price}
        </p>
        {/* Input field for selecting checkbox or radio */}

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            Select Option Type:
          </label>
          <select
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-600"
            value={optionType}
            // onChange={(e) => setOptionType(e.target.value)}
            onChange={(e) => [setOptionId(e.target.value), setOptionType(e.target.value)]}
          > 
            <option>--SELECT--</option>
            {options?.map((option, index) => (
              <option key={option.id} value={option.id}>
                {option.type}
              </option>
            ))}
          </select>
        </div>
        {filteredOptions.length > 0 && (
          <>
            <select
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
              value={`${selectedOptions.optionValueId},${selectedOptions.name},${selectedOptions.optionId}`}
              onChange={handleSelectChange}
            >
             <option>--SELECT--</option>
              {filteredOptions[0].typeNames &&
                filteredOptions[0].typeNames.map((option, index) => (
                  <option
                    key={index}
                    value={`${option.optionValueId},${option.name},${option.optionId}`}
                  >
                    {option.name}
                  </option>
                ))}
            </select>




            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>
          </>
        )}

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleAddButtonClick}
        >
          Add
        </button>
      </div>
      {/* table to show the choose the option */}
      <div className="mt-8 w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <h3 className="text-xl font-semibold mb-2 p-4 bg-gray-200">
          Selected Data:
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Option Type</th>
                <th className="border px-4 py-2">Option Name</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>{generateTableRows()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Productform;

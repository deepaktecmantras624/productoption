import React, { useEffect, useState } from "react";
import Link from "next/link";

const Productform = ({ product }) => {
  const [optionType, setOptionType] = useState("checkbox");
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [productOption, setProductOption] = useState([]);

  console.log("🚀 ~ file: productForm.js:7 ~ Productform ~ options:", options);
  useEffect(() => {
    const savedOptions = localStorage.getItem("options");
    if (savedOptions) {
      setOptions(JSON.parse(savedOptions));
      console.log(
        "🚀 ~ file: productForm.js:12 ~ useEffect ~ JSON.parse(savedOptions):",
        JSON.parse(savedOptions)
      );
    }
  }, []);
  console.log("🚀 ~ file: productForm.js:7 ~ Productform ~ options:", options);
  const handleAddButtonClick = () => {
    if (optionType && selectedOptions.length > 0) {
      const newOption = {
        type: optionType,
        names: selectedOptions,
      };
      console.log("🚀 ~ file: productForm.js:28 ~ handleAddButtonClick ~ newOption.selectedOptions:", newOption.selectedOptions)

      setProductOption((prevOptions) => [...prevOptions, newOption]);
      setSelectedOptions([]);

      console.log(
        "🚀 ~ file: productForm.js:39 ~ handleAddButtonClick ~ productOption:",
        productOption
      );
      localStorage.setItem("productOption", JSON.stringify(productOption));
    }
  };

  const generateTableRows = () => {
    console.log("productOption:", productOption);
    return (
      productOption &&
      productOption.map((item, index) => (
        <tr key={index}>
          <td>{item.type}</td>
          <td>
            {Array.isArray(item.names)
              ? item.names.map((nameObj) => nameObj.name).join(", ")
              : item.names}
          </td>
        </tr>
      ))
    );
  };

  console.log(
    "🚀 ~ file: productForm.js:43 ~ Productform ~ displayData:",
    productOption
  );

  const filteredOptions = options.filter(
    (option) => option.type === optionType
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <Link
          className="text-blue-500 hover:underline block text-center mb-6"
          href="/product"
        >
          Go to dashboard
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
            onChange={(e) => setOptionType(e.target.value)}
          >
            {options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.type}
              </option>
            ))}
          </select>
        </div>

        {filteredOptions.length > 0 && (
          <>
            {optionType === "date" ? (
              <input
                type="date"
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                value={selectedOptions}
                onChange={(e) => setSelectedOptions(e.target.value)}
              />
            ) : (
              <select
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                value={selectedOptions}
                onChange={(e) => setSelectedOptions(e.target.value)}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {filteredOptions[0].typeNames &&
                  filteredOptions[0].typeNames.map((option, index) => (
                    <option key={index} value={option.name}>
                      {option.name}
                    </option>
                  ))}
              </select>
            )}
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
      <div className="mt-4  bg-gray-100">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          Selected Data:
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Option Type</th>
                <th className="border px-4 py-2">Option Name</th>
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

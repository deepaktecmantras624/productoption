import Link from "next/link";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const OptionForm = () => {
  const [optionName, setOptionName] = useState("");
  const [optionType, setOptionType] = useState("");
  // const [optionId, setOptionId]=useState(0)
  const [typeNames, setTypeNames] = useState([]);
  const [newTypeName, setNewTypeName] = useState("");
  const [mainArray, setMainArray] = useState([]);

  const handleOptionTypeChange = (e) => {
    setOptionType(e.target.value);
    setTypeNames([]);
  };

  const generateTypeNameId = () => {
    return uuidv4();
  };

  const handleAddTypeName = () => {
    if (newTypeName) {
      const typeNameId = generateTypeNameId(); // Generate unique ID for typeName
      const newTypeNameObject = {
        id: typeNameId,
        name: newTypeName,
      };
      setTypeNames([...typeNames, newTypeNameObject]);
      setNewTypeName("");
    
    } 
  };

  const handleAddOption = () => {
    let newTypeNames = [];

    if ((optionType === "text" || optionType === "date") && optionName) {
      // For text and date options, typeNames remains an empty array
    } else if (
      optionType !== "text" &&
      optionType !== "date" &&
      optionName &&
      typeNames.length > 0
    ) {
      // For other option types, store typeNames as an array of objects
      newTypeNames = typeNames;
    }

    const newOption = {
      id: uuidv4(),
      name: optionName,
      type: optionType,
      typeNames: newTypeNames,
    };

    setMainArray([...mainArray, newOption]);
    setOptionName("");
    setOptionType("");
    setTypeNames([]);
    setNewTypeName("");
  };

  useEffect(() => {
    localStorage.setItem("options", JSON.stringify(mainArray));
  }, [mainArray]);

  return (
    <div className="container mx-auto my-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <Link
        className="text-blue-500 hover:underline block text-center mb-6"
        href="/product"
      >
        Go to dashboard
      </Link>
      <h1 className="text-3xl font-bold mb-6">Option Form</h1>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-600">
          Option Name
        </label>
        <input
          type="text"
          placeholder="Option Name"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          value={optionName}
          onChange={(e) => setOptionName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-600">
          Option Type
        </label>
        <select
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-600"
          value={optionType}
          onChange={handleOptionTypeChange}
        >
          <option value="">option</option>
          <option value="checkbox">Checkbox</option>
          <option value="radio">Radio</option>
          <option value="text">Text</option>
          <option value="date">Date</option>
        </select>
      </div>
      {(optionType === "checkbox" || optionType === "radio") && (
        <div>
          <h3 className="block text-sm font-semibold text-gray-600">
            {optionType === "checkbox" ? "Checkbox" : "Radio"} Type Names
          </h3>
          {typeNames.map((typeName, index) => (
            <div key={index}>
              <input
                type="text"
                className="w-full mr-2 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                value={typeName.name}
                onChange={(e) => {
                  const updatedNames = [...typeNames];
                  updatedNames[index] = e.target.value;
                  setTypeNames(updatedNames);
                }}
              />
            </div>
          ))}
          {optionType !== "text" && (
            <input
              type="text"
              className="w-full mr-2 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder={`${
                optionType === "checkbox" ? "Checkbox" : "Radio"
              } Type Name`}
              value={newTypeName}
              onChange={(e) => setNewTypeName(e.target.value)}
            />
          )}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={handleAddTypeName}
          >
            Add {optionType === "checkbox" ? "Checkbox" : "Radio"} Type Name
          </button>
        </div>
      )}
      <br />
      <button
        className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
        onClick={handleAddOption}
      >
        Add Option
      </button>

      {mainArray.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Options</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Type</th>
                <th className="py-2 px-4 border-b">Type Names</th>
              </tr>
            </thead>
            <tbody>
              {mainArray.map((option, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{option.id}</td>
                  <td className="py-2 px-4 border-b">{option.name}</td>
                  <td className="py-2 px-4 border-b">{option.type}</td>
                  <td className="py-2 px-4 border-b">
                    {option.typeNames &&
                      option.typeNames
                        .map((typeName) => typeName.name)
                        .join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OptionForm;

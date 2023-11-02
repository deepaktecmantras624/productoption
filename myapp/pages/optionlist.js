import Link from "next/link";
import React, { useEffect, useState } from "react";

const OptionList = () => {
  const [options, setOptions] = useState([]);
  const [editedOption, setEditedOption] = useState(null);
  const [optionName, setOptionName] = useState("");
  const [optionType, setOptionType] = useState("");
  const [inputValues, setInputValues] = useState([]);

  useEffect(() => {
    const optionData = JSON.parse(localStorage.getItem("options")) || [];
    setOptions(optionData);
  }, []);

  const handleEditClick = (option) => {
    setEditedOption(option);
    setOptionName(option.name);
    setOptionType(option.type);
    setInputValues(option.typeNames.map((typeName) => typeName.name));
  };

  const handleInputChange = (index, event) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);
  };

  const handleAddType = () => {
    setInputValues([...inputValues, ""]);
  };

  const handleRemoveType = (index) => {
    const newInputValues = [...inputValues];
    newInputValues.splice(index, 1);
    setInputValues(newInputValues);
  };

  const handleSaveEdit = () => {
    if (editedOption) {
      const updatedOptions = options.map((option) =>
        option.id === editedOption.id
          ? {
              ...option,
              name: optionName,
              type: optionType,
              typeNames: inputValues.map((value) => ({ name: value })),
            }
          : option
      );

      localStorage.setItem("options", JSON.stringify(updatedOptions));

      setOptions(updatedOptions);
      setEditedOption(null);
      setOptionName("");
      setOptionType("");
      setInputValues([]);
    }
  };

  const handleDelete = (id) => {
    const newUpdateOptionAfterDelete = options.filter((e) => e.id !== id);
    localStorage.setItem("options", JSON.stringify(newUpdateOptionAfterDelete));
    setOptions(newUpdateOptionAfterDelete);
  };

  return (
    <div className="container mx-auto my-10 p-6 bg-gray-100 rounded-lg shadow-lg">
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
      <h2 className="text-2xl font-semibold mb-4">Options Table</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Type Names</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {options.map((option, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{option.id}</td>
              <td className="py-2 px-4 border-b">{option.name}</td>
              <td className="py-2 px-4 border-b">{option.type}</td>
              <td className="py-2 px-4 border-b">
                {option.typeNames &&
                  option.typeNames.map((typeName) => typeName.name).join(", ")}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className="btn bg-orange-400 mr-5"
                  onClick={() => handleEditClick(option)}
                  disabled={!!editedOption}
                >
                  Edit
                </button>
                <button
                  className="btn bg-red-700"
                  onClick={() => handleDelete(option.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit part started after clicking the edit button  ------------------------------------------------------------- */}
      {editedOption && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Edit Option</h3>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-600">
              Name
            </label>
            <input
              type="text"
              value={optionName}
              onChange={(e) => setOptionName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-600">
              Type
            </label>
            <input
              type="text"
              value={optionType}
              onChange={(e) => setOptionType(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-600">
              Type Names
            </label>
            {inputValues.map((value, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 mr-2"
                />
                <button
                  className="btn bg-red-500 text-white"
                  onClick={() => handleRemoveType(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className="btn bg-blue-500 text-white"
              onClick={handleAddType}
            >
              Add Type Name
            </button>
          </div>
          {/* --------------------------------------------------------------------------------------------------------------------------------- */}
          <button
            className="btn bg-green-500 text-white"
            onClick={handleSaveEdit}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default OptionList;

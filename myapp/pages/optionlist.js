import { LOCALSTORAGE_NAME } from "@/common/constant";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const OptionList = () => {
  const [options, setOptions] = useState([]);
  const [editedOption, setEditedOption] = useState(null);
  const [optionDatas, setOptionDatas] = useState({
    name: "",
    type: "",
    inputValues: [],
  });

  useEffect(() => {
    const optionData = JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME)) || [];
    setOptions(optionData);
  }, []);

  const handleEditClick = (option) => {
    setEditedOption(option);
    setOptionDatas({
      name: option.name,
      type: option.type,
      inputValues: option.typeNames.map((typeName) => typeName.name),
    });
  };

  const handleInputChange = (index, event) => {
    const newInputValues = [...optionDatas.inputValues];
    newInputValues[index] = event.target.value;
    setOptionDatas({ ...optionDatas, inputValues: newInputValues });
  };

  const addInputField = () => {
    setOptionDatas({
      ...optionDatas,
      inputValues: [...optionDatas.inputValues, ""],
    }); // Add an empty input field
  };
  const generateUniqueId = () => {
    // Generate a unique ID (you can use any suitable method for this)
    return uuidv4();
  };

  const handleRemoveType = (index) => {
    const newInputValues = [...optionDatas.inputValues];
    newInputValues.splice(index, 1);
    setOptionDatas({ ...optionDatas, inputValues: newInputValues });
  };

  const handleSaveEdit = () => {
    if (editedOption) {
      const updatedOptions = options.map((option) => {
        return option.id === editedOption.id
          ? {
              ...option,
              name: optionDatas.name,
              type: optionDatas.type,
              typeNames: optionDatas.inputValues.map((value) => ({
                optionId: option.id,
                optionValueId: value.id || generateUniqueId(),
                name: value,
              })),
            }
          : option;
      });

      localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(updatedOptions)); 
      // localStorage.setItem("typeNames",JSON.stringify(updatedOptions.flatMap((option) => option.typeNames)));

     

      setOptions(updatedOptions);
      setEditedOption(null);
      setOptionDatas({ name: "", type: "", inputValues: [] });
    }
  };

  const handleDelete = (id) => {
    const newUpdateOptionAfterDelete = options.filter((e) => e.id !== id);

    localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(newUpdateOptionAfterDelete));
    // localStorage.setItem("typeNames", JSON.stringify(newUpdateOptionAfterDelete.flatMap((option)=>option.typeNames)));


    setOptions(newUpdateOptionAfterDelete);
  };

  return (
    <div className="container mx-auto my-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <Link
        className="text-blue-500 hover:underline block text-center mb-6"
        href="/product"
      >
        Go to Product List
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
            <tr key={option.id}>
              <td className="py-2 px-4 border-b">{option.id}</td>
              <td className="py-2 px-4 border-b">{option.name}</td>
              <td className="py-2 px-4 border-b">{option.type}</td>
              <td className="py-2 px-4 border-b">
                { option.typeNames?.map((typeName) => typeName.name).join(", ")}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className="btn bg-orange-500 hover:bg-orange-600 text-white mr-2 rounded-md p-1"
                  onClick={() => handleEditClick(option)}
                  disabled={!!editedOption}
                >
                  Edit
                </button>
                <button
                  className="btn bg-red-600 hover:bg-red-700 text-white rounded-md p-1"
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
              value={optionDatas.name}
              onChange={(e) =>
                setOptionDatas({ ...optionDatas, name: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-600">
              Type
            </label>
            <select
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-600"
              value={optionDatas.type}
              onChange={(e) =>
                setOptionDatas({ ...optionDatas, type: e.target.value })
              }
            >
              <option value="checkbox">Checkbox</option>
              <option value="radio">Radio</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-600">
              Type Names
            </label>
            {optionDatas.inputValues.map((value, index) => (
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
              onClick={addInputField}
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

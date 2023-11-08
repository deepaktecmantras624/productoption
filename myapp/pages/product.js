import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const product = ({ repo }) => {
  const router = useRouter();

  return (
    <div className="container mx-auto py-10">

      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">Product Table</h1>

      <Link
        className="block text-center text-indigo-500 hover:underline mb-4"
        href="/optionform"
      >
        Go to Option Form
      </Link>
      <Link
        className="block text-center text-indigo-500 hover:underline mb-4"
        href="/optionlist"
      >
        Go to Option Table
      </Link>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border py-2 px-4">Image</th>
            <th className="border py-2 px-4">Title</th>
            <th className="border py-2 px-4">Brand</th>
            <th className="border py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            repo?.map((product) => (
              <tr key={product.id}>
                <td className="border py-2 px-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="border py-2 px-4">{product.title}</td>
                <td className="border py-2 px-4">{product.brand}</td>
                <td className="border py-2 px-4">
                  <button
                    onClick={() => router.push(`/products/${product.id}`)}
                    className="py-1 px-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring focus:border-red-800"
                  >
                    Option
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default product;

export const getServerSideProps = async () => {
  const response = await axios.get("http://localhost:8080/products");
  const repo = response.data;
  return {
    props: {
      repo,
    },
  };
};

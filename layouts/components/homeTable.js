"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function HomeTable({ about }) {
  const [data, setData] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const [editId, setEditId] = useState(null);
  const [editedNilai, setEditedNilai] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // Fetch data from the API
    fetch("http://127.0.0.1:8000/api/nilai")
      .then((response) => response.json())
      .then((data) => setData(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleDelete = (nim, kode_mk) => {
    fetch(`http://127.0.0.1:8000/api/nilai/${nim}/${kode_mk}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          fetchData();
          alert("Item deleted successfully.");
        } else {
          alert("Error deleting item.");
        }
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        alert("Error deleting item.");
      });
    setDeleteId(null); // Close the delete confirmation dialog
  };

  const handleEdit = () => {
    // Call API to update nilai
    fetch(`http://127.0.0.1:8000/api/nilai/${editId.nim}/${editId.kode_mk}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nilai: editedNilai }),
    })
      .then((response) => {
        if (response.ok) {
          fetchData();
          alert("Nilai updated successfully.");
        } else {
          alert("Error updating nilai.");
        }
      })
      .catch((error) => {
        console.error("Error updating nilai:", error);
        alert("Error updating nilai.");
      });
    setEditId(null); // Close the edit dialog
  };

  return (
    <section className="container mt-10">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                NIM
              </th>
              <th scope="col" class="px-6 py-3">
                Nama
              </th>
              <th scope="col" class="px-6 py-3">
                Alamat
              </th>
              <th scope="col" class="px-6 py-3">
                Tanggal Lahir
              </th>
              <th scope="col" class="px-6 py-3">
                Kode MK
              </th>
              <th scope="col" class="px-6 py-3">
                Nama MK
              </th>
              <th scope="col" class="px-6 py-3">
                SKS
              </th>
              <th scope="col" class="px-6 py-3">
                Nilai
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.attributes.nim}
                </th>
                <td class="px-6 py-4">{item.attributes.nama}</td>
                <td class="px-6 py-4">{item.attributes.alamat}</td>
                <td class="px-6 py-4">{item.attributes.tanggal_lahir}</td>
                <td class="px-6 py-4">{item.attributes.kode_mk}</td>
                <td class="px-6 py-4">{item.attributes.nama_mk}</td>
                <td class="px-6 py-4">{item.attributes.sks}</td>
                <td class="px-6 py-4">{item.attributes.nilai}</td>
                <td class="px-6 py-4">
                  <a
                    onClick={() =>
                      setEditId({
                        nim: item.attributes.nim,
                        kode_mk: item.attributes.kode_mk,
                      })
                    }
                  >
                    <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Edit
                    </a>
                  </a>
                  <span class="mx-2">|</span>
                  <a
                    href="#"
                    class="font-medium text-red-600 dark:text-red-500 hover:underline"
                    onClick={() =>
                      setDeleteId({
                        nim: item.attributes.nim,
                        kode_mk: item.attributes.kode_mk,
                      })
                    }
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {deleteId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <p className="text-black">
                Are you sure you want to delete this item?
              </p>
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 mr-2 bg-red-500 text-black rounded-md"
                  onClick={() => handleDelete(deleteId.nim, deleteId.kode_mk)}
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                  onClick={() => setDeleteId(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit dialog */}
        {editId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <p className="text-black">Update Nilai:</p>
              <input
                type="text"
                value={editedNilai}
                onChange={(e) => setEditedNilai(e.target.value)}
                className="border border-gray-300 p-1 rounded-md mt-2 text-black"
              />
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md"
                  onClick={handleEdit}
                >
                  Update
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                  onClick={() => setEditId(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

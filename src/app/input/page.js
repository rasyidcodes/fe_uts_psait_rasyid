"use client";
import { data } from "autoprefixer";
import React, { useState } from "react";

export default function Input() {
  const [nim, setNim] = useState("");
  const [kodeMk, setKodeMk] = useState("");
  const [nilai, setNilai] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const inputData = {
      nim: nim,
      kode_mk: kodeMk,
      nilai: parseInt(nilai),
    };

    fetch("http://127.0.0.1:8000/api/nilai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        alert(data.meta.message);
        // Clear input fields after successful submission
        setNim("");
        setKodeMk("");
        setNilai("");
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        alert(data.meta);
      });
  };

  return (
    <section className="bg-gray-600">
      <div className="flex flex-col h-screen bg-gray-600 container mx-auto items-center justify-center">
        <div className="bg-gray-900 px-8 py-6 rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="nim" className="block text-white">
                NIM
              </label>
              <input
                type="text"
                id="nim"
                className="form-input mt-1 block w-full text-black"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="kodeMk" className="block text-white">
                Kode MK
              </label>
              <input
                type="text"
                id="kodeMk"
                className="form-input mt-1 block w-full text-black"
                value={kodeMk}
                onChange={(e) => setKodeMk(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="nilai" className="block text-white">
                Nilai
              </label>
              <input
                type="number"
                id="nilai"
                className="form-input mt-1 block w-full text-black"
                value={nilai}
                onChange={(e) => setNilai(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <a href="/" className=" text-white font-bold">
                Cancel
              </a>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded    justify-end"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

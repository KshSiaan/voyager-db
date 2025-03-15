import React from "react";
import * as XLSX from "xlsx";

function AttractionDetails({ form, setForm }) {
  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the uploaded file
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Assuming data is in the first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert sheet data to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log("Excel JSON Data:", jsonData);
      };
      reader.readAsArrayBuffer(file); // Read the file as ArrayBuffer
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`border border-gray90 rounded-2xl p-4`}>
      <h1 className={`text-black text-[20px] font-work font-semibold`}>
        Fill in the Attraction Information
      </h1>
      <form action="" className={`mt-4`}>
        <div className={`mb-3`}>
          <input
            type="text"
            placeholder="Enter Attraction Name"
            className={`border border-90 focus:outline-none px-4 py-2 rounded-xl w-full`}
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className={`mb-3`}>
          <input
            type="text"
            placeholder="Enter Location"
            className={`border border-90 focus:outline-none px-4 py-2 rounded-xl w-full`}
            name="location"
            value={form.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <textarea
            id=""
            placeholder="Write a description..."
            rows={8}
            className={`border border-90 focus:outline-none px-4 py-2 rounded-xl w-full`}
            name="description"
            value={form.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex flex-row items-center gap-3">
          <div className="border border-gray90 rounded-2xl px-4 py-2 flex flex-row items-center gap-2 mt-4 cursor-pointer">
            <input
              type="file"
              accept=".xlsx, .xls"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            <div
              onClick={() => document.getElementById("fileInput").click()}
              className="flex flex-row items-center gap-2"
            >
              <svg
                width="13"
                height="14"
                viewBox="0 0 13 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 1L9.75 4M6.5 1L3.5 4M6.5 1V10.5M12.5 6.5V13H0.5V6.5"
                  stroke="#8C78EA"
                />
              </svg>
              <h3>Import from Excel</h3>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AttractionDetails;

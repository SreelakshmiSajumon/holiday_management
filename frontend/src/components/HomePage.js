import React, { useState } from "react";

const HomePage = ({ onSearch }) => {
  const [country, setCountry] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  // Validate the year input
  const validateYear = (year) => {
    const currentYear = new Date().getFullYear();
    return year >= 1900 && year <= currentYear + 1; // Allow up to next year
  };

  const handleSearch = () => {
    if (!country || !year) {
      setError("Please select a country and enter a year.");
      return;
    }

    if (!validateYear(year)) {
      setError("Please enter a valid year.");
      return;
    }

    setError(""); // Reset any previous error
    onSearch(country, year);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Holiday Management</h1>
      <div className="mb-4">
        <label htmlFor="country" className="block text-lg font-medium mb-2">
          Select Country
        </label>
        <select
          id="country"
          onChange={(e) => setCountry(e.target.value)}
          value={country}
          aria-label="Select Country"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Country</option>
          <option value="US">United States</option>
          <option value="IN">India</option>
          {/* Add more countries dynamically or statically here */}
        </select>
      </div>
      
      <div className="mb-6">
        <label htmlFor="year" className="block text-lg font-medium mb-2">
          Enter Year
        </label>
        <input
          id="year"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Enter Year"
          min="1900"
          max={new Date().getFullYear() + 1} // Allow current year and next year
          aria-label="Enter Year"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && <div className="text-red-600 text-center mb-4">{error}</div>}

      <div className="text-center">
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default HomePage;

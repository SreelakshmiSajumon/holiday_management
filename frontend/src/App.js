import React, { useState } from "react";
import HomePage from "./components/HomePage";
import HolidayList from "./components/HolidayList";

const App = () => {
  const [country, setCountry] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle search form submission
  const handleSearch = (country, year) => {
    setCountry(country);
    setYear(year);
    fetchHolidays(country, year);
  };

  // Fetch holidays from the backend API
  const fetchHolidays = async (country, year) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/holidays?country=${country}&year=${year}`);
      const data = await response.json();
      if (response.ok) {
        // Handle the success and display the holidays
        setLoading(false);
      } else {
        throw new Error(data.message || "Failed to fetch holidays.");
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <HomePage onSearch={handleSearch} />
      
      {loading && <div className="text-center mt-4">Loading holidays...</div>}

      {error && <div className="text-center text-red-500 mt-4">{error}</div>}

      {country && year && !loading && !error && <HolidayList country={country} year={year} />}
    </div>
  );
};

export default App;

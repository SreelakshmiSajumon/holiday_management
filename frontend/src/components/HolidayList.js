import React, { useEffect, useState } from "react";
import axios from "axios";

const HolidayList = ({ country, year }) => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHolidays = async () => {
      setLoading(true);
      setError(null); // Reset error state on new request
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/holidays/${country}/${year}/`);
        if (response.data && response.data.holidays) {
          setHolidays(response.data.holidays); // Assuming holidays are in "holidays" field
        } else {
          setHolidays([]); // If no holidays, set an empty array
        }
      } catch (error) {
        console.error("Error fetching holidays", error);
        setError("Failed to fetch holidays. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (country && year) {
      fetchHolidays();
    }
  }, [country, year]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {loading ? (
        <p className="text-center text-xl font-semibold text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-xl font-semibold text-red-600">{error}</p>
      ) : (
        <div>
          {holidays.length > 0 ? (
            <ul className="space-y-4">
              {holidays.map((holiday) => (
                <li
                  key={holiday.date.iso}
                  className="p-4 bg-white shadow-lg rounded-lg flex justify-between items-center"
                >
                  <span className="text-lg font-medium">{holiday.name}</span>
                  <span className="text-sm text-gray-500">{holiday.date.iso}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-lg text-gray-600">No holidays found for this country and year.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HolidayList;

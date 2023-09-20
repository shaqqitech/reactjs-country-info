import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CountryInfo() {
  const [countryData, setCountryData] = useState({});
  const [countryCode, setCountryCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${countryCode}`
        );
        const data = response.data[0];
        setCountryData(data);
      } catch (error) {
        console.log(error.message);
        setError("Error in fetching country info");
      } finally {
        setLoading(false);
      }
    };

    if (countryCode) {
      fetchCountryInfo();
    } else {
      // Reset country data when the input is empty
      setCountryData({});
    }
  }, [countryCode]);

  const currenciesObject = countryData.currencies;

  const handleChange = (e) => {
    setCountryCode(e.target.value);
  };

  const formatArrayToString = (array) => {
    if (Array.isArray(array)) {
      return array.join(",");
    }
    return "";
  };

  return (
    <>
      <main className="w-full min-h-screen p-8 bg-gray-900 flex justify-start items-center flex-col space-y-8">
        <h1 className="font-bold text-3xl lg:text-4xl text-slate-100">
          Country Information
        </h1>
        <div className=" bg-slate-700 p-6 rounded-lg shadow-xl">
          <div className="flex justify-center items-center flex-col text-center space-y-5">
            <div className=" space-y-4">
              <div>
                <h3 className="font-semibold text-2xl text-white">
                  Enter Country Code:
                </h3>
                <span className="text-sm text-gray-300">
                  (E.g. Pakistan: pk")
                </span>
              </div>
              <input
                type="text"
                value={countryCode}
                onChange={handleChange}
                className="w-full border rounded-lg py-2 px-3 text-lg font-semibold mb-3 focus:outline-none focus:border-blue-500"
              />
              {loading && <p className="font-bold mb-1">Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
        </div>
        {countryCode && ( // Only render if countryCode is not empty
          <div>
            {countryData.name && (
              <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
                <div className="w-60 md:w-64 h-72 rounded-xl p-5 flex justify-center items-center flex-col space-y-3 bg-gray-800 border-2 shadow-2xl">
                  <h1 className="font-semibold text-xl text-slate-400">
                    Country Flag:
                  </h1>
                  <img
                    src={countryData.flags.png}
                    alt={`${countryData.name} flag pic`}
                    className="w-24"
                  />
                </div>
                <div className="w-60 md:w-64 h-72 rounded-xl p-5 flex justify-center items-center flex-col space-y-3 text-center  bg-gray-800 border-2 shadow-2xl">
                  <h1 className="font-semibold text-xl  text-slate-400">
                    Country Name:
                  </h1>
                  <p className="font-bold text-2xl lg:text-2xl text-white">
                    {countryData.name.common}
                  </p>
                </div>
                <div className="w-60 md:w-64 h-72 rounded-xl p-5 flex justify-center items-center flex-col space-y-3 text-center  bg-gray-800 border-2 shadow-2xl">
                  <h1 className="font-semibold text-xl  text-slate-400">
                    Official Name:
                  </h1>
                  <p className="font-bold text-2xl lg:text-2xl text-white">
                    {countryData.name.official}
                  </p>
                </div>
                <div className="w-60 md:w-64 h-72 rounded-xl p-5 flex justify-center items-center flex-col space-y-3 text-center  bg-gray-800 border-2 shadow-2xl">
                  <h1 className="font-semibold text-xl  text-slate-400">
                    Capital Name:
                  </h1>
                  <p className="font-bold text-2xl lg:text-2xl text-white">
                    {countryData.capital}
                  </p>
                </div>
                <div className="w-60 md:w-64 h-72 rounded-xl p-5 flex justify-center items-center flex-col space-y-3 text-center  bg-gray-800 border-2 shadow-2xl">
                  <h1 className="font-semibold text-xl  text-slate-400">
                    Coat Of Arms:
                  </h1>
                  <img
                    src={countryData.coatOfArms.png}
                    alt={`${countryData.name} flag pic`}
                    className="w-24"
                  />
                </div>
                <div className="w-60 md:w-64 h-72 rounded-xl p-5 flex justify-center items-center flex-col space-y-3 text-center  bg-gray-800 border-2 shadow-2xl">
                  <h1 className="font-semibold text-xl  text-slate-400">
                    Language:
                  </h1>
                  <p className="font-bold text-2xl lg:text-2xl text-white">
                    {formatArrayToString(
                      Object.values(countryData.languages || {})
                    )}
                  </p>
                </div>
                <div className="w-60 md:w-64 h-72 rounded-xl p-5 flex justify-center items-center flex-col space-y-3 text-center  bg-gray-800 border-2 shadow-2xl">
                  <h1 className="font-semibold text-xl  text-slate-400">
                    Currency:
                  </h1>
                  <p className="font-bold text-2xl lg:text-2xl text-white">
                    {formatArrayToString(Object.keys(currenciesObject))}
                  </p>
                </div>
                <div className="w-60 md:w-64 h-72 rounded-xl p-5 flex justify-center items-center flex-col space-y-3 text-center  bg-gray-800 border-2 shadow-2xl">
                  <h1 className="font-semibold text-xl  text-slate-400">
                    Continent:
                  </h1>
                  <p className="font-bold text-2xl lg:text-2xl text-white">
                    {countryData.continents}
                  </p>
                </div>
                <div className="w-60 md:w-64 h-72 rounded-xl p-5 flex justify-center items-center flex-col space-y-3 text-center  bg-gray-800 border-2 shadow-2xl">
                  <h1 className="font-semibold text-xl  text-slate-400">
                    Sub Origin:
                  </h1>
                  <p className="font-bold text-2xl lg:text-2xl text-white">
                    {countryData.subregion}
                  </p>
                </div>
                <div className="w-60 md:w-64 h-72 rounded-xl p-5 flex justify-center items-center flex-col space-y-3 text-center  bg-gray-800 border-2 shadow-2xl">
                  <h1 className="font-semibold text-xl  text-slate-400">
                    Start of Week:
                  </h1>
                  <p className="font-bold text-2xl lg:text-2xl text-white">
                    {countryData.startOfWeek.toUpperCase()}
                  </p>
                </div>
                <div className="w-60 md:w-64 h-72 rounded-xl p-5 flex justify-center items-center flex-col space-y-3 text-center  bg-gray-800 border-2 shadow-2xl">
                  <h1 className="font-semibold text-xl  text-slate-400">
                    Status:
                  </h1>
                  <p className="font-bold text-2xl lg:text-2xl text-white">
                    {countryData.status.toUpperCase()}
                  </p>
                </div>
                <div className="w-60 md:w-64 h-72 rounded-xl p-5 flex justify-center items-center flex-col space-y-3 text-center  bg-gray-800 border-2 shadow-2xl">
                  <h1 className="font-semibold text-xl  text-slate-400">
                    Map View:
                  </h1>
                  <a
                    href={countryData.maps.googleMaps}
                    target="_blank"
                    className="text-2xl font-bold text-white"
                  >
                    Click to check Map View
                  </a>
                </div>
                <div className="w-60 md:w-64 h-72 rounded-xl p-5 flex justify-center items-center flex-col space-y-3 text-center  bg-gray-800 border-2 shadow-2xl">
                  <h1 className="font-semibold text-xl  text-slate-400">
                    Population:
                  </h1>
                  <p className="font-bold text-2xl lg:text-2xl text-white">
                    {countryData.population?.toLocaleString()}
                  </p>
                </div>
                <div className="w-60 md:w-64 h-72 rounded-xl p-5 flex justify-center items-center flex-col space-y-3 text-center  bg-gray-800 border-2 shadow-2xl">
                  <h1 className="font-semibold text-xl  text-slate-400">
                    Border Share:
                  </h1>
                  <p
                    className="font-bold text-2xl lg:text-2xl text-white"
                    style={{
                      width: "100%", // Set a fixed width for the container
                      wordBreak: "break-word", // Break long words and wrap them
                    }}
                  >
                    {formatArrayToString(
                      Object.values(countryData.borders || {})
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
}

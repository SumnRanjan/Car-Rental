import { useState } from "react";
import { assets, cityList } from "../assets/assets";

export const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-14 bg-light text-center">
      <h1 className="text-4xl md:text-5xl font-semibold">
        Luxury cars on Rent
      </h1>

      <form
        className="flex flex-col md:flex-row items-start md:items-center 
        justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200
        bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:ml-8">
          <div className="flex flex-col items-start gap-2">
            <select
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            >
              <option value="">Pickup Location</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <p className="px-1 text-sm text-gray-500">
              {pickupLocation || "Please select location"}
            </p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <label htmlFor="pickup-date">Pick-up Date</label>
            <input
              type="date"
              id="pickup-date"
              value={pickupDate}
              onChange={(e) => {
                setPickupDate(e.target.value);
                if (returnDate && e.target.value > returnDate) {
                  setReturnDate("");
                }
              }}
              min={today}
              className="text-sm text-gray-500"
            />
          </div>

          <div className="flex flex-col items-start gap-2">
            <label htmlFor="return-date">Return Date</label>
            <input
              type="date"
              id="return-date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              min={pickupDate || today}
              className="text-sm text-gray-500"
            />
          </div>
        </div>
        <button
          className="flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary 
            hover:bg-primary-dull text-white rounded-full cursor-pointer"
          disabled={!pickupLocation || !pickupDate || !returnDate}
        >
          <img
            src={assets.search_icon}
            alt="search"
            className="brightness-300"
          />
          Search
        </button>
      </form>

      <img src={assets.main_car} alt="" className="max-h-74" />
    </div>
  );
};

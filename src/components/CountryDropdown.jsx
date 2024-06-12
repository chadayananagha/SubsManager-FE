import { useRef, useState, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { useClickAway } from "react-use";

const CountryDropdown = ({ userData, handleEditChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    name: userData.country,
    code: userData.countryCode,
  });
  const countries = [
    { name: "Argentina", code: "AR" },
    { name: "Australia", code: "AU" },
    { name: "Austria", code: "AT" },
    { name: "Belgium", code: "BE" },
    { name: "Brazil", code: "BR" },
    { name: "Bulgaria", code: "BG" },
    { name: "Canada", code: "CA" },
    { name: "Chile", code: "CL" },
    { name: "Colombia", code: "CO" },
    { name: "Croatia", code: "HR" },
    { name: "Cyprus", code: "CY" },
    { name: "Czech Republic", code: "CZ" },
    { name: "Denmark", code: "DK" },
    { name: "Estonia", code: "EE" },
    { name: "Finland", code: "FI" },
    { name: "France", code: "FR" },
    { name: "Germany", code: "DE" },
    { name: "Greece", code: "GR" },
    { name: "Hong Kong", code: "HK" },
    { name: "Hungary", code: "HU" },
    { name: "Iceland", code: "IS" },
    { name: "India", code: "IN" },
    { name: "Ireland", code: "IE" },
    { name: "Israel", code: "IL" },
    { name: "Italy", code: "IT" },
    { name: "Japan", code: "JP" },
    { name: "Kuwait", code: "KW" },
    { name: "Latvia", code: "LV" },
    { name: "Lebanon", code: "LB" },
    { name: "Lithuania", code: "LT" },
    { name: "Luxembourg", code: "LU" },
    { name: "Malaysia", code: "MY" },
    { name: "Mexico", code: "MX" },
    { name: "Netherlands", code: "NL" },
    { name: "New Zealand", code: "NZ" },
    { name: "Norway", code: "NO" },
    { name: "Philippines", code: "PH" },
    { name: "Poland", code: "PL" },
    { name: "Portugal", code: "PT" },
    { name: "Romania", code: "RO" },
    { name: "Russia", code: "RU" },
    { name: "Saudi Arabia", code: "SA" },
    { name: "Singapore", code: "SG" },
    { name: "Slovakia", code: "SK" },
    { name: "Slovenia", code: "SI" },
    { name: "South Africa", code: "ZA" },
    { name: "South Korea", code: "KR" },
    { name: "Spain", code: "ES" },
    { name: "Sweden", code: "SE" },
    { name: "Switzerland", code: "CH" },
    { name: "Taiwan", code: "TW" },
    { name: "Thailand", code: "TH" },
    { name: "Turkey", code: "TR" },
    { name: "United Kingdom", code: "GB" },
    { name: "United States of America", code: "US" },
    { name: "Uruguay", code: "UY" },
    { name: "Vietnam", code: "VN" },
  ];

  useEffect(() => {
    setSelectedCountry({
      name: userData.country,
      code: userData.countryCode,
    });
  }, [userData.country, userData.countryCode]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelection = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    handleEditChange({
      target: { name: "country", value: country.name, code: country.code },
    });
  };

  const ref = useRef(null);
  useClickAway(ref, () => {
    setIsOpen(false);
  });

  return (
    <div className="relative inline-block w-full " ref={ref}>
      <button
        type="button"
        className="text-left mt-1 block w-full  bg-white border-gray-300 rounded p-2 focus:border-primary focus:ring-primary transition input-color"
        onClick={toggleDropdown}
      >
        {selectedCountry.code && (
          <ReactCountryFlag
            style={{
              width: "1.5em",
              height: "1.5em",
              marginRight: "0.5em",
            }}
            countryCode={selectedCountry.code}
            svg
            title={selectedCountry.code}
          />
        )}
        {selectedCountry.name || "Select a country"}
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-base-100   rounded shadow-lg">
          {countries.map((country) => (
            <li
              key={country.code}
              className="flex items-center p-2 hover:bg-base-300 cursor-pointer"
              onClick={() => handleSelection(country)}
            >
              <ReactCountryFlag
                style={{
                  width: "1.5em",
                  height: "1.5em",
                  marginRight: "0.5em",
                }}
                countryCode={country.code}
                svg
                title={country.code}
              />
              {country.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountryDropdown;

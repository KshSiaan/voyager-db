import React, { useEffect, useState } from "react";
import countryData from "../utils/location.json";
import { useCookies } from "react-cookie";
import { getCategories } from "../api/categories";

const bestTimeToVisitOptions = [
  { label: "Summer" },
  { label: "Rainy" },
  { label: "Winter" },
  { label: "Autumn" },
  { label: "Late-autumn" },
  { label: "Spring" },
];

const activityLevelOptions = [
  { label: "Relaxation" },
  { label: "Moderate" },
  { label: "Active" },
];

function InfoAndPricing({ form, setForm }) {
  const [attractions, setAttractions] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [visitingHours, setVisitingHours] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [inputValue, setInputValue] = useState("");
  const [inputPricing, setInputPricing] = useState("");
  const [inputCategory, setInputCategory] = useState("");
  const [inputSubCategory, setInputSubCategory] = useState("");
  const [inputVisitingHours, setInputVisitingHours] = useState("");

  const [inputUniqueFeatures, setInputUniqueFeatures] = useState("");
  const [uniqueFeatures, setUniqueFeatures] = useState([]);

  const [inputBestTimeToVisit, setInputBestTimeToVisit] = useState("");
  const [bestTimeToVisit, setBestTimeToVisit] = useState([]);

  const [inputKeywords, setInputKeywords] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [funFact, setFunFact] = useState("");
  const [secretTips, setSecretTips] = useState("");

  const [inputTopActivities, setInputTopActivities] = useState("");
  const [topActivities, setTopActivities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategories, setSelectedCategories] = useState("");
  const [selectedActivityLevel, setSelectedActivityLevel] = useState("");
  const [selectedVisitedTimeToVisited, setSelectedVisitedTimeToVisited] =
    useState([]);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [cookies] = useCookies(["token"]);
  useEffect(() => {
    async function categorySetter() {
      try {
        const call = await getCategories(cookies.token);
        setCategoriesOptions(call.data.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    categorySetter();
  }, []);
  const topic = localStorage.getItem("topic");
  // Handle input change for all
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle input change for spots
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle input change for pricing
  const handleInputPricingChange = (e) => {
    setInputPricing(e.target.value);
  };

  // Handle input change for visiting hours
  const handleInputVisitingHoursChange = (e) => {
    setInputVisitingHours(e.target.value);
  };

  // Handle input change for category
  const handleInputCategoryChange = (e) => {
    setInputCategory(e.target.value);
  };

  // Handle input change for sub-category
  const handleInputSubCategoryChange = (e) => {
    setInputSubCategory(e.target.value);
  };

  // Handle adding new attraction
  const handleAddAttraction = () => {
    if (inputValue.trim() !== "") {
      setForm((prev) => ({ ...prev, must_visit_spots: attractions }));
      // console.log(form);
      setAttractions([...attractions, inputValue]);
      setInputValue("");
    }
  };

  // Handle adding new pricing
  const handleAddPricing = () => {
    if (inputPricing.trim() !== "") {
      setPricing([...pricing, inputPricing]);
      setInputPricing("");
      setForm((prev) => ({ ...prev, prices: pricing }));
    }
  };

  // Handle adding new visiting hours
  const handleAddVisitingHours = () => {
    if (inputVisitingHours.trim() !== "") {
      setVisitingHours([...visitingHours, inputVisitingHours]);
      setForm((prev) => ({ ...prev, visit_hours: visitingHours }));
      setInputVisitingHours("");
    }
  };

  // Handle adding new category
  const handleAddCategory = () => {
    if (inputCategory.trim() !== "") {
      setCategories([...categories, inputCategory]);
      setInputCategory("");
    }
  };

  // Handle adding new sub-category
  const handleAddSubCategory = () => {
    if (inputSubCategory.trim() !== "") {
      setSubCategories([...subCategories, inputSubCategory]);
      setInputSubCategory("");
    }
  };

  // Handle removing items
  const handleRemoveAttraction = (index) => {
    setAttractions(attractions.filter((_, i) => i !== index));
  };

  const handleRemovePricing = (index) => {
    setPricing(pricing.filter((_, i) => i !== index));
  };

  const handleRemoveVisitingHours = (index) => {
    setVisitingHours(visitingHours.filter((_, i) => i !== index));
  };

  const handleRemoveCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleRemoveSubCategory = (index) => {
    setSubCategories(subCategories.filter((_, i) => i !== index));
  };

  // Handlers for Unique Features
  const handleInputUniqueFeaturesChange = (e) =>
    setInputUniqueFeatures(e.target.value);
  const handleAddUniqueFeatures = () => {
    if (inputUniqueFeatures.trim() !== "") {
      setUniqueFeatures([...uniqueFeatures, inputUniqueFeatures]);
      setForm((prev) => ({ ...prev, unique_features: uniqueFeatures }));
      setInputUniqueFeatures(""); // Clear input
    }
  };
  const handleRemoveUniqueFeatures = (index) => {
    setUniqueFeatures(uniqueFeatures.filter((_, i) => i !== index));
  };

  // Handlers for Best Time to Visit
  const handleInputBestTimeToVisitChange = (e) =>
    setInputBestTimeToVisit(e.target.value);

  const handleAddBestTimeToVisit = () => {
    if (inputBestTimeToVisit.trim() !== "") {
      setBestTimeToVisit([...bestTimeToVisit, inputBestTimeToVisit]);

      setInputBestTimeToVisit(""); // Clear input
    }
  };
  const handleRemoveBestTimeToVisit = (index) => {
    setBestTimeToVisit(bestTimeToVisit.filter((_, i) => i !== index));
  };

  // Handlers for Keywords
  const handleInputKeywordsChange = (e) => {
    setInputKeywords(e.target.value);
  };
  const handleAddKeywords = () => {
    if (inputKeywords.trim() !== "") {
      setKeywords([...keywords, inputKeywords]);
      setForm((prev) => ({ ...prev, keywords: keywords }));
      setInputKeywords(""); // Clear input
    }
  };
  const handleRemoveKeywords = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleInputTopActivitiesChange = (e) => {
    setInputTopActivities(e.target.value);
  };

  const handleAddTopActivities = () => {
    if (inputTopActivities) {
      setTopActivities([...topActivities, inputTopActivities]);
      setForm((prev) => ({ ...prev, top_activities: visitingHours }));
      setInputTopActivities("");
    }
  };

  const handleRemoveTopActivities = (index) => {
    const updatedActivities = topActivities.filter((_, i) => i !== index);
    setTopActivities(updatedActivities);
  };

  // location selector function
  const handleCountryChange = (e) => {
    setForm((prev) => ({ ...prev, country: e.target.value }));
    const country = countryData.countries.find(
      (c) => c.code === e.target.value
    );
    setSelectedCountry(country ? country.code : "");
    setCities(country ? country.cities : []);
    setSelectedCity("");
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setForm((prev) => ({ ...prev, city: e.target.value }));
  };

  return (
    <div className={`border border-gray90 rounded-2xl p-4`}>
      <h1 className={`text-black text-[20px] font-work font-semibold`}>
        Enter Must-Visit Spots, Pricing, and Visiting Hours
      </h1>

      <div
        className={`mb-3 gap-2 border border-gray-90 p-4 rounded-xl flex-row flex items-center`}
      >
        <input
          type="text"
          placeholder={`${topic} ID`}
          className={`w-full focus:outline-none`}
          name="attraction_id"
          // value={form.attraction_id}
          // onChange={handleChange}
        />
      </div>

      {/* Must Visit Spots Section */}
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div
          className={`mb-3 gap-2 border border-gray-90 px-4 py-2 rounded-xl flex-row flex items-center`}
        >
          <input
            type="text"
            placeholder="Must Visit Spots"
            className={`w-full focus:outline-none`}
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="rounded-xl px-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary border border-primary"
            onClick={handleAddAttraction}
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {attractions.map((attraction, index) => (
            <div
              key={index}
              className="mb-3 flex items-center bg-secondary rounded-xl px-4 py-2"
            >
              <span className="text-primary font-semibold">{attraction}</span>
              <button
                className="ml-2 bg-primary text-white w-4 h-4 rounded-full font-bold text-[8px]"
                onClick={() => handleRemoveAttraction(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </form>

      {/* Categories */}
      <div className={`mb-3 flex flex-col items-end`}>
        <select
          onChange={(e) => {
            const selectedCategory = parseInt(e.target.value);
            console.log("Selected Category:", selectedCategory);

            const selectedItem = categoriesOptions.find(
              (item) => item.id === selectedCategory
            );

            setSelectedCategories(selectedCategory);
            setForm((prev) => ({
              ...prev,
              category_id: selectedCategory,
              subcategories: selectedItem
                ? selectedItem.sub_categories.map((sub) => sub.name)
                : [],
            }));
          }}
          className="custom-select text-subtitle border border-90 focus:outline-none !pl-4 py-2 rounded-2xl w-full"
        >
          <option value="">Choose Category</option>
          {categoriesOptions.map((item, index) => (
            <option value={item.id} key={index}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* address */}
      <div
        className={`mb-3 gap-2 border border-gray-90 p-4 rounded-xl flex-row flex items-center`}
      >
        <input
          type="text"
          placeholder="Address"
          className={`w-full focus:outline-none`}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, address: e.target.value }))
          }
        />
      </div>

      {/* country */}
      {/* Country Selector */}
      <select
        className={`mb-3 custom-select text-subtitle border border-90 focus:outline-none !p-4 !rounded-2xl w-full`}
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        <option value="">Country</option>
        {countryData.countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>

      {/* City Selector */}
      <select
        className={`mb-3 custom-select text-subtitle border border-90 focus:outline-none !p-4 !rounded-2xl w-full`}
        value={selectedCity} // Control the selected city here
        onChange={handleCityChange}
        disabled={!selectedCountry} // Disable if no country is selected
      >
        <option value="">City</option>
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => setForm((prev) => ({ ...prev, age: e.target.value }))}
        className={`custom-select text-subtitle border border-90 focus:outline-none !p-4 !rounded-2xl w-full`}
      >
        <option value="0" className="">
          Age
        </option>
        <option value="8-12" className="">
          8-12
        </option>
        <option value="13-18" className="">
          13-18
        </option>
      </select>
      {/* Pricing Section */}
      <form action="" className={`mt-4`} onSubmit={(e) => e.preventDefault()}>
        <div
          className={`mb-3 gap-2 border border-gray-90 px-4 py-2 rounded-xl flex-row flex items-center`}
        >
          <span>€</span>
          <input
            type="text"
            placeholder="Pricing"
            className={`w-full focus:outline-none`}
            value={inputPricing}
            onChange={handleInputPricingChange}
          />
          <button
            type="button"
            className="rounded-xl px-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary border border-primary"
            onClick={handleAddPricing}
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {pricing.map((price, index) => (
            <div
              key={index}
              className="mb-3 flex items-center bg-secondary rounded-xl px-4 py-2"
            >
              <span className="text-primary font-semibold">{price}</span>
              <button
                className="ml-2 bg-primary text-white w-4 h-4 rounded-full font-bold text-[8px]"
                onClick={() => handleRemovePricing(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </form>

      {/* Visiting Hours Section */}
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <div
          className={`mb-3 gap-2 border border-gray-90 px-4 py-2 rounded-xl flex-row flex items-center`}
        >
          <input
            type="text"
            placeholder="Visiting Hours"
            className={`w-full focus:outline-none`}
            value={inputVisitingHours}
            onChange={handleInputVisitingHoursChange}
          />
          <button
            type="button"
            className="rounded-xl px-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary border border-primary"
            onClick={handleAddVisitingHours}
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {visitingHours.map((hour, index) => (
            <div
              key={index}
              className="mb-3 flex items-center bg-secondary rounded-xl px-4 py-2"
            >
              <span className="text-primary font-semibold">{hour}</span>
              <button
                className="ml-2 bg-primary text-white w-4 h-4 rounded-full font-bold text-[8px]"
                onClick={() => handleRemoveVisitingHours(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </form>

      {/* Top Activities Section */}
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3 gap-2 border border-gray-90 px-4 py-2 rounded-xl flex-row flex items-center">
          <input
            type="text"
            placeholder="Top Activities"
            className="w-full focus:outline-none"
            value={inputTopActivities}
            onChange={handleInputTopActivitiesChange}
          />
          <button
            type="button"
            className="rounded-xl px-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary border border-primary"
            onClick={handleAddTopActivities}
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {topActivities.map((activity, index) => (
            <div
              key={index}
              className="mb-3 flex items-center bg-secondary rounded-xl px-4 py-2"
            >
              <span className="text-primary font-semibold">{activity}</span>
              <button
                className="ml-2 bg-primary text-white w-4 h-4 rounded-full font-bold text-[8px]"
                onClick={() => handleRemoveTopActivities(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </form>

      <textarea
        rows="5"
        value={funFact}
        onChange={(e) => {
          setFunFact(e.target.value);
          setForm((prev) => ({
            ...prev,
            short_description_about_fun_fact: e.target.value,
          }));
        }}
        placeholder="Write a short description about fun fact..."
        className="focus:outline-none p-4 w-full border border-90 mb-3 rounded-2xl"
      ></textarea>

      <textarea
        rows="5"
        value={secretTips}
        onChange={(e) => {
          setSecretTips(e.target.value);
          setForm((prev) => ({
            ...prev,
            short_description_about_secret_tips: e.target.value,
          }));
        }}
        placeholder="Write a short description about secret tips..."
        className="focus:outline-none p-4 w-full border border-90 mb-3 rounded-2xl"
      ></textarea>

      {/* Unique Features Section */}
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div
          className={`mb-3 gap-2 border border-gray-90 px-4 py-2 rounded-xl flex-row flex items-center`}
        >
          <input
            type="text"
            placeholder="Unique Features"
            className={`w-full focus:outline-none`}
            value={inputUniqueFeatures}
            onChange={handleInputUniqueFeaturesChange}
          />
          <button
            type="button"
            className="rounded-xl px-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary border border-primary"
            onClick={handleAddUniqueFeatures}
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {uniqueFeatures.map((feature, index) => (
            <div
              key={index}
              className="mb-3 flex items-center bg-secondary rounded-xl px-4 py-2"
            >
              <span className="text-primary font-semibold">{feature}</span>
              <button
                className="ml-2 bg-primary text-white w-4 h-4 rounded-full font-bold text-[8px]"
                onClick={() => handleRemoveUniqueFeatures(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </form>

      <div className={`mb-3 flex flex-col items-end`}>
        <select
          onChange={(e) => {
            setSelectedVisitedTimeToVisited(e.target.value);
            setForm((prev) => ({
              ...prev,
              best_visit_times: [e.target.value],
            }));
          }}
          className={`custom-select text-subtitle border border-90 focus:outline-none !pl-4 py-2 rounded-2xl w-full`}
        >
          <option value="" className="">
            Choose Best time to visit
          </option>
          {bestTimeToVisitOptions.map((item, index) => (
            <option value={item?.label} className="" key={index}>
              {item?.label}
            </option>
          ))}
        </select>
      </div>

      <div className={`mb-3 flex flex-col items-end`}>
        <select
          onChange={(e) => {
            setSelectedActivityLevel(e.target.value);
            setForm((prev) => ({
              ...prev,
              activity_levels: [e.target.value],
            }));
          }}
          className={`custom-select text-subtitle border border-90 focus:outline-none !pl-4 py-2 rounded-2xl w-full`}
        >
          <option value="" className="">
            Choose Activity Level
          </option>
          {activityLevelOptions.map((item, index) => (
            <option value={item?.label} className="" key={index}>
              {item?.label}
            </option>
          ))}
        </select>
      </div>

      {/* Keywords Section */}
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <div
          className={`mb-3 gap-2 border border-gray-90 px-4 py-2 rounded-xl flex-row flex items-center`}
        >
          <input
            type="text"
            placeholder="Keywords"
            className={`w-full focus:outline-none`}
            value={inputKeywords}
            onChange={handleInputKeywordsChange}
          />
          <button
            type="button"
            className="rounded-xl px-4 py-2 cursor-pointer font-semibold font-work text-white bg-primary border border-primary"
            onClick={handleAddKeywords}
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <div
              key={index}
              className="mb-3 flex items-center bg-secondary rounded-xl px-4 py-2"
            >
              <span className="text-primary font-semibold">{keyword}</span>
              <button
                className="ml-2 bg-primary text-white w-4 h-4 rounded-full font-bold text-[8px]"
                onClick={() => handleRemoveKeywords(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default InfoAndPricing;

import { useState, useEffect } from "react";
// import Navigation from "./Navigation/Nav";
import Products from "../../Products/Products";
import products from "../../db/data";
//import Recommended from "../../Recommended/Recommended";
import Sidebar from "../../Sidebar/Sidebar";
import Card from "../../components/Card";
import "./Listing.css";

function Listing() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ----------- Input Filter ----------- 
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [listingData, setListingData] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = products.filter(
    (product) => product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // ----------- Radio Filtering ----------- 
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // ------------ Button Filtering ----------- 
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  // ------------ Filter Data ----------- 
  function filteredData(products, selectedCategory, query) {
    let filteredProducts = products;

    // Apply Input filter (search query)
    if (query) {
      filteredProducts = filteredItems;
    }

    // Apply Category filter
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        ({ type, name }) => type === selectedCategory || name === selectedCategory
      );
    }

    return filteredProducts; // Return filtered data only, without mapping to Card
  }

  // This will store the filtered products list
  const filteredProducts = filteredData(listingData, selectedCategory, query);

  // Map the filtered products to Cards
  const result = filteredProducts.map(
    ({ img, name, star, reviews, prevPrice, newPrice }) => (
      <Card
        key={Math.random()} // It's better to use a unique ID, but we'll leave Math.random() here for simplicity
        img={img}
        name={name}
        star={star}
        reviews={reviews}
        prevPrice={prevPrice}
        newPrice={newPrice}
      />
    )
  );

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/lab/get`);
        const data = await res.json();
        // console.log("data - ", data);
        setListingData(data);
      } catch {
        setListingData([]);
      }
      setLoading(false);
    };

    fetchListings();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '0 0 250px' }}>
        <Sidebar handleChange={handleChange} />
      </div>
      <div style={{ flex: '1' }}>
        <Products result={result} />
      </div>
    </div>
  );
}

export default Listing;

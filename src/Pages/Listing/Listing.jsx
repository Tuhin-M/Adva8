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

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    }

    // Applying selected filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ type, name }) => type === selected || name === selected
      );
    }

    console.log("filterred product - ", filteredProducts);
    return filteredProducts.map(
      ({ img, name, star, reviews, prevPrice, newPrice }) => (
        <Card
          key={Math.random()}
          img={img}
          name={name}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
        />
      )
    );
  }

  const result = filteredData(listingData, selectedCategory, query);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/api/listing/get`);
        const data = await res.json();
        console.log("data - ", data);
        setListingData(data);
      } catch {
        setListingData([]);
      }
      setLoading(false);
    };

    fetchListings();
  }, []);
  return (
    <>
      <Sidebar handleChange={handleChange} />
      {/* <Navigation query={query} handleInputChange={handleInputChange} /> */}
      {/* <Recommended handleClick={handleClick} /> */}
      <Products result={result} />
    </>
  );
}

export default Listing;

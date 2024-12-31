import { useState, useEffect } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import Card from "../../components/Card";
import "./Listing.css";
import { Col, Row } from "antd";

function Listing() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [listingData, setListingData] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  function filteredData(products, selectedCategory, query) {
    let filteredProducts = products;

    // Apply Input filter (search query)
    if (query) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply Category filter
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        ({ type }) => type === selectedCategory
      );
    }

    // Remove duplicates based on `name`
    const seen = new Set();
    filteredProducts = filteredProducts.filter(({ name }) => {
      if (seen.has(name)) {
        return false;
      }
      seen.add(name);
      return true;
    });

    return filteredProducts;
  }

  const filteredProducts = filteredData(listingData, selectedCategory, query);

  const result = filteredProducts.map(
    ({ id, img, name, star, reviews, prevPrice, newPrice }) => (
      <Row key={id || name} xs={24} sm={12} md={8} lg={6} xl={4}>
        <Card
          img={img}
          name={name}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
        />
      </Row>
    )
  );

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/lab/get`);
        const data = await res.json();
        setListingData(data);
      } catch {
        setListingData([]);
      }
      setLoading(false);
    };

    fetchListings();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "0 0 250px" }}>
        <Sidebar handleChange={handleChange} />
      </div>
      <div style={{ flex: "1", marginTop: "10vh" }}>
        <Row gutter={[16, 16]}>{result}</Row>{" "}
        {/* Apply spacing between cards */}
      </div>
    </div>
  );
}

export default Listing;

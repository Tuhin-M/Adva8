import { useState, useEffect } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import Card from "../../components/Card";
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

    if (query) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        ({ type }) => type === selectedCategory
      );
    }

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
      <Row 
        key={id || name} 
        xs={24} 
        sm={12} 
        md={8} 
        lg={6} 
        xl={4}
        style={{
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)'
          }
        }}
      >
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
    <div style={{ 
      display: "flex",
      padding: 0,
      margin: 0,
      boxSizing: "border-box",
      fontFamily: "sans-serif"
    }}>
      <div style={{ 
        flex: "0 0 250px",
        "& a": {
          textDecoration: "none",
          color: "rgb(97, 97, 97)"
        },
        "& li": {
          listStyle: "none"
        },
        "& .btns": {
          padding: "10px 20px",
          marginRight: "6px",
          background: "transparent",
          border: "0.6px solid #ccc",
          borderRadius: "5px",
          color: "#323232",
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            background: "#f0f0f0",
            transform: "scale(1.05)"
          }
        }
      }}>
        <Sidebar handleChange={handleChange} />
      </div>
      <div style={{ 
        flex: "1", 
        marginTop: "10vh",
        "& .horizontal-grid": {
          display: "flex",
          gap: "16px",
          overflowX: "auto",
          padding: "8px",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            height: "8px"
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            borderRadius: "4px"
          }
        }
      }}>
        <Row 
          gutter={[16, 16]}
          style={{
            opacity: loading ? 0.5 : 1,
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          {result}
        </Row>
      </div>
    </div>
  );
}

export default Listing;
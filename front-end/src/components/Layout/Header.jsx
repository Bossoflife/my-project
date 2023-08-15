import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import images from "../../assets/images.jpg";
import { productData } from "../../static/data";
const Header = () => {
  const [searchTerm, setSearchTerm] = useState();
  const [searchData, setSearchData] = useState(null);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredData =
      productData &&
      productData.filter((product) => {
        return product.name.toLowerCase().includes(term.toLowerCase());
      });
    setSearchData(filteredData);
  };
  return (
    <div className={styles.section}>
      <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
        <div>
          <Link to="/" style={{ fontSize: "20px" }}>
            <img src={images} alt="logo" className="w-16 h-16" />
          </Link>
        </div>
        {/* { serach box } */}
        <div className="w-[50px] relative">
          <input
            type="text"
            placeholder="Search Product..."
            value={searchData}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;

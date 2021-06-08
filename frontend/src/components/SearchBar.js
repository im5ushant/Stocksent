import React, {useState, useEffect } from "react";

import { TextField, Button } from "@material-ui/core";
import { Search } from "@material-ui/icons";

import "./SearchBar.css";

const SearchBar = (props) => {

  const [stock, setStock] = useState("");

  const onClickHandler = () => {
    props.onClick(stock)
  }

  console.log(stock);

  return (
    <>
      <div className="search-bar__container">
        <Search style={{ marginTop: "20px" }} />
        <TextField
          style={{ width: "85%", margin: "32px 16px" }}
          id="search"
          label="Search Company"
          onChange={e=>setStock(e.target.value)}
        />
        <Button
          style={{ height: "40px", marginTop: "10px" }}
          variant="contained"
          color="primary"
          onClick={onClickHandler}
        >
          Search
        </Button>
      </div>
    </>
  );
};

export default SearchBar;

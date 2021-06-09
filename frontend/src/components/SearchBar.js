import React, {useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import Autocomplete from '@material-ui/lab/Autocomplete';

import {stock_symbols} from '../util/stock_symbols';
import {stock_names} from '../util/stock_names';

import "./SearchBar.css";

const SearchBar = (props) => {

  const [stock, setStock] = useState("");

  const onClickHandler = () => {
    props.onClick(stock)
  }

  console.log(stock)

  return (
    <>
      <div className="search-bar__container">
        <Search style={{ marginTop: "20px", color: "white" }} />
        <Autocomplete
        id="free-solo-demo"
        freeSolo
        style={{ width: "85%", margin: "32px 16px" }}
        options={stock_symbols.map((option) => option.sym)}
        renderInput={(params) => (
          <TextField {...params} label="Enter Conpany Symbol" margin="normal" variant="standard" />
        )}
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

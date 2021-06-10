import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { Search, Translate } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

import { stock_names } from "../util/stock_names";

import "./SearchBar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& label": {
      color: "#363c4e",

      "&.MuiInputLabel-outlined": {
        transform: "translate(14px, 13px) scale(1)",

        "&.MuiInputLabel-shrink": {
          transform: "translate(14px, -6px) scale(0.75)",
        },
      },
    },
  },
  inputRoot: {
    color: "#b2b5be",
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"]': {
      // Default left padding is 6px
      boxSizing: "border-box",
      height: "40px",
      padding: "4px !important",

      "& input": {
        height: "32px",
        padding: "0 9.5px !important",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#363c4e",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#363c4e",
    },
  },
  groupLabel: {
    "& .MuiAutocomplete-groupLabel": {
      color: "363c4e",
    },
  },
}));

const SearchBar = (props) => {
  const classes = useStyles();
  const [stock, setStock] = useState(null);

  const onClickHandler = () => {
    props.onClick(stock)
    // console.log(stock);
  };

  const stockChangeHandler = (event) => {
    if (event.target.innerText === null) {
      setStock(null);
    } else {
      setStock(event.target.innerText);
    }
    // console.log(event.target.innerText);
  };

  return (
    <>
      <div className="search-bar__container">
        <Search style={{ marginTop: "13px", color: "#b2b5be" }} />
        <Autocomplete
          id="stock"
          classes={classes}
          freeSolo
          style={{ width: "85%", margin: "32px 16px" }}
          onChange={stockChangeHandler}
          options={stock_names.map((option) => option.SYM + " : " + option.COM)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Enter Company Name"
              margin="normal"
              variant="outlined"
            />
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

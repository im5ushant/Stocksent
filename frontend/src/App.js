import React, { Component, useState, useEffect } from "react";
import "./App.css";
import TradingView from './components/TradingView';
import Chart from "./components/Chart2";
import axios from 'axios';
import Footer from "./components/Footer";
import Header from "./components/Header";
import PreviewSection from "./components/PreviewSection";
import SearchBar from "./components/SearchBar";

const App = (props) => {

  const [companyName, setCompanyName] = useState("");
  const [companySym, setCompanySym] = useState("SENSEX");

  const [sentimentData, setSentimentData] = useState([40,40,20]);

  const [resLoaded, setResLoaded] = useState(false);
  const [tweets, setTweets] = useState("");
  const [news, setNews] = useState("");

  const getSentimentHandler = (stock) => {
    let seperatedStock = stock.split(" : ");
    setCompanySym(seperatedStock[0]);
    setCompanyName(seperatedStock[1]);
    setResLoaded(false);
    axios
      .post("http://127.0.0.1:5000/analyse", {
        stock: seperatedStock[0],
      })
      .then(function (response) {
        resultHandler(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.post("http://127.0.0.1:5000/get-tweets", {
      stock: seperatedStock[0]
    }).then(function (response) {
      setTweets(response);
    })
    .catch(function (err) {
      console.log(err);
    })

    axios.post("http://127.0.0.1:5000/get-news", {
      stock: seperatedStock[0]
    }).then(function (response) {
      setNews(response);
    })
    .catch(function (err) {
      console.log(err);
    })
  };

  const resultHandler = (response) => {
    const res = response.data;
    const temp = { ...sentimentData };
    temp[0] = res.positive;
    temp[1] = res.negative;
    temp[2] = res.neutral;
    setSentimentData(temp);
    setResLoaded(true);
  };


  return (
    <div className="App">
      <Header />
      <SearchBar onClick={getSentimentHandler} />
      <TradingView symbol={companySym} />
      <Chart sentiment={sentimentData} />
      <div className="preview-container">
        {tweets && <PreviewSection content={tweets} header="Recent Tweets" />}
        {news && <PreviewSection content={news} header="Recent News" />}
      </div>
      <Footer />
    </div>
  );
};

export default App;

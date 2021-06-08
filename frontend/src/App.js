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

  const [chartData, setChartData] = useState({
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [
      {
        label: "Sentiment",
        data: [50, 40, 10],
        backgroundColor: ["#60eca4", "#f64f7d", "#cccccc"],
      },
    ],
  });

  const [resLoaded, setResLoaded] = useState(false);


  const getSentimentHandler = (stock) => {
    setCompanyName(stock);
    setResLoaded(false);
    axios
      .post("http://127.0.0.1:5000/analyse", {
        stock: stock,
      })
      .then(function (response) {
        resultHandler(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const resultHandler = (response) => {
    const res = response.data;
    const temp = { ...chartData };
    temp.datasets[0].data[0] = res.positive;
    temp.datasets[0].data[1] = res.negative;
    temp.datasets[0].data[2] = res.neutral;
    setChartData(temp);
    setResLoaded(true);
  };


  return (
    <div className="App">
      <Header />
      <SearchBar onClick={getSentimentHandler} />
      <TradingView />
      <Chart />
      <div className="preview-container">
        <PreviewSection header="Recent News" />
        <PreviewSection header="Recent Tweets" />
      </div>
      <Footer />
    </div>
  );
};

export default App;

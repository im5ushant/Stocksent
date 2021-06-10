import React, { useEffect } from "react";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import "./TradingView.css";

const TradingView = (props) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    // document.getElementById(tradingViewChart).appendChild(script);
    script.onload = () => runScriptMethods();
  }, []);

  let res;
  const runScriptMethods = () => {
    res = new TradingView.widget({
      width: 980,
      height: 610,
      symbol: "NASDAQ:AAPL",
      interval: "D",
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      details: true,
      container_id: "tradingview_5997b",
    });
    console.log(res);
  };

  return (
    <div className="trading-view__main-container">
      <TradingViewWidget symbol={`BSE:${props.symbol}`} theme={Themes.DARK} autosize />
    </div>
  );
};

export default TradingView;

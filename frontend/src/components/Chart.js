import React, { Component } from "react";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';

import "./Chart.css";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData,
    };
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
    location: "City",
  };

  render() {
    return (
      <>
        <div className="chart-container">
          <div className="live-quote__container">
            <div className="live-quote__heading">
              <p>{this.props.company}</p>
              {/* <div className="live-quote">307.40 <ExpandLessRoundedIcon /></div> */}
            </div>
          </div>
          <div className="chart" style={{ width: "48%" }}>
            <Pie
              data={this.state.chartData}
              style={{ width: "100%" }}
              options={{
                maintainAspectRatio: false,
                title: {
                  display: this.props.displayTitle,
                  fontSize: 25,
                },
                legend: {
                  display: this.props.displayLegend,
                  position: this.props.legendPosition,
                },
              }}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Chart;

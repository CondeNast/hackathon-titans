import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import { BarChart } from "./components/Bar";
import "./App.css";
import experimentsData from "./components.json";

Chart.register(CategoryScale);

function App() {
  const [componentVariations, setComponentVariations] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [chartLabel, setChartLabel] = useState(null);
  const [componentName, setComponentName] = useState(null);

  const handleChange = (_, i) => {
    setTabIndex(i);
  };

  return (
    <>
      <h2 className="header">Analytics</h2>
      {/* <Tabs value={tabIndex} onChange={handleChange}>
        <Tab label="Experimental Hub" />
        <Tab label="Research Hub" />
      </Tabs> */}
      <div className="App">
        <div className="list-container">
          {experimentsData.components.map((component) => {
            return (
              <p
                className={`list-item ${
                  componentName === component.name ? "active" : ""
                }`}
                onClick={() => {
                  setComponentVariations(component.variations);
                  setChartData(null);
                  setComponentName(component.name);
                }}
              >
                {component.name}
              </p>
            );
          })}
        </div>

        <div className="main">
          <div className="options">
            {Object.keys(componentVariations).map((variationKey) => {
              return (
                <div
                  className="group"
                  onClick={() => {
                    const ch = componentVariations[variationKey].brands.map(
                      (brand) => {
                        return brand.engagement;
                      }
                    );
                    const chName = componentVariations[variationKey].brands.map(
                      (brand) => {
                        return brand.name;
                      }
                    );
                    const newChartData = {
                      labels: chName,
                      datasets: [
                        {
                          label: "Users Engagement",
                          data: ch,
                          backgroundColor: [
                            "rgba(75,192,192,1)",
                            "#50AF95",
                            "#f3ba2f",
                            "#2a71d0",
                          ],
                          borderColor: "black",
                          borderWidth: 2,
                        },
                      ],
                    };
                    setChartData(newChartData);
                    setChartLabel(variationKey);
                  }}
                >
                  <Card>
                    <CardContent>
                      <p
                        className={`clickable ${
                          variationKey === chartLabel ? "active" : ""
                        }`}
                      >
                        {variationKey}
                      </p>
                      <p>
                        Control: {componentVariations[variationKey].control}
                      </p>
                      {/* <p>
                  Brands:{" "}
                  {componentVariations[variationKey].brands.map((brand) => (
                    <span>{brand.name} </span>
                  ))}
                </p> */}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          {chartData && <BarChart chartData={chartData} label={chartLabel} />}
        </div>
      </div>
    </>
  );
}

export default App;

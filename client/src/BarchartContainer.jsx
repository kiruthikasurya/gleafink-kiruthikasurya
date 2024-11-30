import React, { useState, useEffect } from "react";
import BarChart from "./components/Chart/BarChart";

const BarchartContainer = () => {
  const [data, setData] = useState([]); // Initialize empty data

  useEffect(() => {
    // Simulate async data fetching
    const fetchData = () => {
      const sampleData = Array.from({ length: 200 }, (_, index) => ({
        value: Math.floor(Math.random() * 100),
        label: `Item ${index + 1}`,
      }));
      setData(sampleData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>D3.js Bar Chart</h1>
      <BarChart data={data} />
    </div>
  );
};

export default BarchartContainer;

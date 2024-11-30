import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as d3 from "d3";
import './BarChart.css';

const BarChart = ({ datasetUrl }) => {
  const svgRef = useRef();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    region: "",
  });

  // Fetch and parse the dataset
  useEffect(() => {
    d3.csv(datasetUrl).then((csvData) => {
      const formattedData = csvData.map((row) => ({
        name: row.Product,
        category: row.Category,
        region: row.Region,
        value: +row.Sales,
      }));
      setData(formattedData);
      console.log(formattedData);
    });
  }, [datasetUrl]);

  // Apply filters based on URL parameters
  useEffect(() => {
    if (!data || data.length === 0) return;

    const categoryFilter = searchParams.get("category") || "";
    const regionFilter = searchParams.get("region") || "";

    setFilters({ category: categoryFilter, region: regionFilter });

    const filtered = data.filter(
      (d) =>
        (categoryFilter === "" || d.category === categoryFilter) &&
        (regionFilter === "" || d.region === regionFilter)
    );

    setFilteredData(filtered);
  }, [data, searchParams]);

  // Render the bar chart
  useEffect(() => {
    if (!filteredData || filteredData.length === 0) return;

    const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(filteredData.map((d) => d.name))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(filteredData, (d) => d.value)])
      .nice()
      .range([height, 0]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg.append("g").call(d3.axisLeft(y));

    svg
      .selectAll(".bar")
      .data(filteredData)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.value))
      .attr("fill", "steelblue");
  }, [filteredData]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));

    const updatedParams = new URLSearchParams(filters);
    updatedParams.set(name, value);
    navigate(`?${updatedParams.toString()}`);
  };

  return (
    <div className="container">
      <h1 className="title"> Bar Chart Visualization</h1>
      <div className="filters">
        <h3>Filters</h3>
        <div className="filter-group">
          <label>Category:</label>
          <select
            name="category"
            onChange={handleFilterChange}
            value={filters.category}
          >
            <option value="">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Apparel">Apparel</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Region:</label>
          <select
            name="region"
            onChange={handleFilterChange}
            value={filters.region}
          >
            <option value="">All</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
          </select>
        </div>
      </div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BarChart;

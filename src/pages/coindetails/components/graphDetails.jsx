import React, { useState, useEffect } from "react";
import { Box, Text } from "../../../components/index";
import dayjs from "dayjs"; // Importing dayjs
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"; // Import Recharts components

const CustomTickYAxis = (props) => {
  const { x, y, payload } = props;

  return (
    <text
      x={x}
      y={y}
      dy={20}
      textAnchor="end"
      style={{
        fontSize: "clamp(10px, 1.5vw, 15px)", // Clamp font size
        fill: "#666",
      }}
    >
      ${parseFloat(payload.value).toFixed(3)}
    </text>
  );
};

const CustomTooltip = ({ payload, label, active }) => {
  if (active && payload && payload.length) {
    // Extracting the necessary data from the payload
    const { price, volume, timestamp } = payload[0].payload;

    // Format the timestamp to a human-readable date using dayjs
    const formattedDate = dayjs(timestamp).format("YYYY-MM-DD");

    return (
      <Box className=" p-3 rounded-lg custom-tooltip outline outline-2 outline-zinc-100 bg-zinc-500/55 shadow-glowLight dark:shadow-glowDark">
        <Text>
          Date: <span className="text-white">{formattedDate}</span>
        </Text>
        <Text>
          Price : <span className="text-green-400"> ${price.toFixed(2)}</span>
        </Text>
        <Text>
          Volume (24hr): <span className="text-white">{volume.toFixed(2)}</span>
        </Text>
      </Box>
    );
  }

  return null;
};

const GraphDetails = ({ array }) => {
  const [selectedRange, setSelectedRange] = useState(0); // Default to 90 days
  const [allTimeHigh, setAllTimeHigh] = useState(null);
  const [allTimeLow, setAllTimeLow] = useState(null);
  const [selectedRangeData, setSelectedRangeData] = useState([]);
  const [oldestDate, setOldestDate] = useState("");
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Error state

  // Effect to update data for the selected range
  useEffect(() => {
    if (!array || array.length === 0) {
      setError("No data available for the graph.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true); // Set loading to true when starting to process data

      // Calculate the number of items corresponding to the range
      const daysInRange = Math.min(selectedRange, 90);
      const rangeData = array.slice(-daysInRange); // Take most recent 'n' days

      setSelectedRangeData(rangeData);

      // Calculate all-time high and low within the selected range
      const prices = rangeData.map((item) => item.price);
      setAllTimeHigh(Math.max(...prices));
      setAllTimeLow(Math.min(...prices));

      // Set oldest date in the selected range
      const oldest = rangeData[rangeData.length - 1]?.timestamp || "";
      setOldestDate(oldest);
    } catch (e) {
      setError("Error processing the graph data.");
    } finally {
      setLoading(false); // Set loading to false after data processing
    }
  }, [selectedRange, array]);

  // Function to format the date using dayjs
  const formatDate = (dateString) => {
    return dayjs(dateString).format("D MMMM YYYY @ HH:mm:ss"); // Example: 12 June 2024 @ 13:00:00
  };

  // Prepare data for the AreaChart
  const chartData = selectedRangeData.map((item) => ({
    timestamp: dayjs(item.timestamp).format("D MMMM YYYY"), // Format the date for X axis
    price: item.price,
    volume: item.volume_24h,
  }));

  // Loading, Error, and Data Render Logic
  if (loading) {
    return (
      <Box className="gap-4 py-4">
        <Text>Loading graph data...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="bg-base-300 text-responsive-content p-4 my-6 rounded-xl text-info">
        <Text>{error}</Text>
      </Box>
    );
  }

  return (
    <Box horizontal className="text-responsive-content p-4">
      <Box className="gap-4 w-[50%]">
        {/* Input Range */}
        <Text className="text-info">Select Range [Max upto last 90 days]:</Text>
        <input
          type="range"
          min={1}
          max={90}
          value={selectedRange}
          className="range"
          onChange={(e) => setSelectedRange(Number(e.target.value))}
        />
        <Text className="text-info">
          Selected Range: Last {selectedRange} Days
        </Text>

        {/* Display Data for Selected Range */}
        {selectedRangeData.length > 0 && (
          <>
            <Text className="text-info">Price:</Text>
            <Text className="text-yellow-400">
              ${selectedRangeData[0]?.price.toFixed(6)}
            </Text>
            <Text className="text-info">Volume:</Text>
            <Text className="text-yellow-400">
              {selectedRangeData[0]?.volume_24h}
            </Text>
            <Text className="text-info">Selected Date:</Text>
            <Text className="text-yellow-400">
              {oldestDate && formatDate(oldestDate)}
            </Text>
            <Text className="text-info">Range All-Time High:</Text>
            <Text className="text-yellow-400">${allTimeHigh.toFixed(6)}</Text>
            <Text className="text-info">Range All-Time Low:</Text>
            <Text className="text-yellow-400">${allTimeLow.toFixed(6)}</Text>
          </>
        )}
      </Box>
      {/* Recharts AreaChart */}
      <Box className="w-[50%] h-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#525252" stopOpacity={2} />
                <stop offset="95%" stopColor="#525252" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis tick={null} />
            <YAxis tick={<CustomTickYAxis />} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#7C3AED" // Orange color for BTC
              strokeWidth={2}
              fill="url(#color)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default GraphDetails;

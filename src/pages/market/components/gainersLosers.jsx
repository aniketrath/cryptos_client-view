import React, { useState, useEffect } from "react";
import { fetchGainers, fetchLossers } from "../../APIs";
import { Box, Text } from "../../../components/index";
import { useNavigate } from "react-router-dom";

// Card Component
const Card = ({ name, symbol, change, id }) => {
  const formatName = (name) => {
    if (name.length > 5) {
      return name.slice(0, 5) + "...";
    }
    return name;
  };
  const priceColor = change > 0 ? "text-success" : "text-error";
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/details?id=${id}`);
  };
  return (
    <Box
      onClick={handleClick}
      horizontal
      className="bg-base-300 text-responsive-content p-4 rounded-xl justify-between hover:cursor-pointer"
    >
      <Text className="text-secondary w-[33%]">{formatName(name)}</Text>
      <Text className="text-info w-[33%]">{symbol}</Text>
      <Text className={`${priceColor}`}>
        {Math.abs(parseFloat(change).toFixed(3))}
      </Text>
    </Box>
  );
};

const GainersLosers = ({ type }) => {
  const [iterator, setIterator] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await Promise.allSettled([
          fetchGainers(),
          fetchLossers(),
        ]);

        // Extract results and ensure fallback to empty arrays
        const [gainers, lossers] = response.map((result) =>
          result.status === "fulfilled" ? result.value || [] : [],
        );

        // Set `iterator` based on `type`
        setIterator(type === "gainers" ? gainers : lossers);
      } catch (error) {
        console.error("Unexpected error during API calls:", error);
        setError(
          "An error occurred while fetching the data. Please try again later.",
        );
        setIterator([]); // Fallback to an empty array in case of an error
      } finally {
        setLoading(false); // Ensure loading is set to false after processing
      }
    };

    getStats();
  }, [type]); // Re-run when `type` changes

  // Handle loading state
  if (loading)
    return (
      <Box className="gap-4 py-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Box key={index} className="h-20 skeleton"></Box>
        ))}
      </Box>
    );

  // Handle error state
  if (error)
    return (
      <Box className="bg-red-300 text-responsive-content px-4 my-6 rounded-xl text-error">
        <Text className="py-4">{error}</Text>
      </Box>
    );

  // Handle empty data state
  if (!Array.isArray(iterator) || iterator.length === 0)
    return (
      <Box className="bg-base-300 text-responsive-content px-4 my-6 rounded-xl text-info">
        <Text className="py-4">
          Oops! Looks like there are none for the type {type}.
        </Text>
      </Box>
    );

  return (
    <Box className="gap-4 overflow-scroll scrollbar-hide">
      {iterator.map((item, index) => (
        <Card
          key={index}
          name={item.name}
          symbol={item.symbol}
          change={item.change_24hr}
          id={item.id}
        />
      ))}
    </Box>
  );
};

export default GainersLosers;

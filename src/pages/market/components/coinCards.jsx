import React, { useState, useEffect } from "react";
import { Box, Text, Image } from "../../../components/index";
import { fetchAllCoins } from "../../APIs";
import {
  SquareArrowOutUpRight,
  ChevronDownCircleIcon,
  ChevronUpCircleIcon,
} from "lucide-react";

// Card Component
const RenderCard = ({ name, logo, symbol, change, price , id}) => {
  const formatName = (name) => {
    if (name.length > 10) {
      return name.slice(0, 7) + "...";
    }
    return name;
  };

  const priceColor = change > 0 ? "text-success" : "text-error";

  return (
    <Box
      horizontal
      className="bg-base-300 p-4 gap-4 text-responsive-content justify-center rounded-xl 
    hover:outline hover:outline-2 hover:shadow-glowLight hover:dark:shadow-glowDark"
    >
      <Box horizontal className="w-[30%] text-yellow-300 gap-4">
        <Image className="h-9 rounded-full" src={logo} />
        <Text>: {formatName(name)}</Text>
      </Box>
      <Box className="w-[15%] text-accent">{symbol}</Box>
      <Box className="w-[20%]">$ {parseFloat(price).toFixed(2)}</Box>
      <Box horizontal className={`w-[15%] gap-4 ${priceColor}`}>
        {change >= 0 ? (
          <ChevronUpCircleIcon className="my-2" />
        ) : (
          <ChevronDownCircleIcon className="my-2" />
        )}
        {Math.abs(parseFloat(change).toFixed(2))}
      </Box>
      <a href={`/details?id=${id}`}>
        <SquareArrowOutUpRight />
      </a>
    </Box>
  );
};

// Main Component
const CoinCards = () => {
  const [coinData, setCoinData] = useState([]);
  const [sortBy, setSortBy] = useState("name"); // State to track sorting criteria

  // Fetch data on mount
  useEffect(() => {
    const getStats = async () => {
      const resp = await fetchAllCoins();
      setCoinData(resp);
    };
    getStats();
  }, []);

  // Sort logic based on selected criteria
  const sortedData = [...coinData].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name); // Sort alphabetically
    } else if (sortBy === "price") {
      return b.ticker_history[0].price - a.ticker_history[0].price; // Sort by price descending
    } else if (sortBy === "change") {
      return b.change_24hr - a.change_24hr; // Sort by 24hr change descending
    }
    return 0;
  });

  return (
    <Box className="p-4 overflow-scroll scrollbar-hide gap-4">
      {/* Sort By Dropdown */}
      <Box horizontal className="mb-4">
        <label htmlFor="sort" className="mr-2 text-md">
          Sort By:
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className=" px-2 outline outline-base-300 text-md"
        >
          <option value="name"></option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="change">24hr Change</option>
        </select>
      </Box>

      {/* Render Sorted List */}
      {sortedData.map((e) => (
        <RenderCard
          key={e._id}
          name={e.name}
          symbol={e.symbol}
          logo={e.logo}
          change={e.change_24hr}
          price={e.ticker_history[0].price}
          id={e.id}
        />
      ))}
    </Box>
  );
};

export default CoinCards;

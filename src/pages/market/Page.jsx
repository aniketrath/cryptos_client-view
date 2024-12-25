import React, { useState, useEffect } from "react";
import { Box, Text } from "../../components";
import { fetchSuggestions } from "../APIs";
import {
  SuggestionsComponent,
  CoinCards,
  GainersLosers,
} from "./components/index";

const ErrorReply = () => {
  return (
    <Box className="py-10 gap-4 px-4 text-error">
      <Text className="text-xl">We are unable to Fetch.</Text>
      <Text> Please try later .</Text>
    </Box>
  );
};

const Page = () => {
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Store error messages here

  useEffect(() => {
    const getStats = async () => {
      try {
        setLoading(true);
        const suggestions_data = await fetchSuggestions();
        setSuggestions(suggestions_data);
      } catch (e) {
        console.error("Error fetching suggestions:", e);
        // If it's an Axios error, we can check if it is a network error
        if (e.isAxiosError) {
          setError("Network error occurred. Please try again later.");
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } finally {
        //setLoading(false); // Stop loading once the request completes
      }
    };
    getStats();
  }, []);

  return (
    <Box horizontal className="gap-5 pt-4 h-[89vh] max-h-[89vh]">
      {/* Suggestions Section */}
      <Box className="min-w-fit shadow-glowLight dark:shadow-glowDark rounded-xl p-4 w-[20dvw]">
        <Text className="uppercase font-bold text-responsive text-center">
          Suggestions
        </Text>
        {loading ? (
          <Box className="gap-4 py-4">
            {Array.from({ length: 7 }).map((_, index) => (
              <Box key={index} className="h-20 skeleton"></Box>
            ))}
          </Box>
        ) : error ? (
          <Text>{error}</Text> // Display the error message
        ) : suggestions ? (
          <SuggestionsComponent data={suggestions} />
        ) : (
          <ErrorReply />
        )}
      </Box>

      {/* All Coins Section */}
      <Box className="min-w-fit shadow-glowLight dark:shadow-glowDark rounded-xl p-4 flex-grow gap-4">
        <Text className="uppercase font-bold text-responsive text-center">
          All Coins
        </Text>
        <CoinCards />
      </Box>

      {/* Gainers and Losers Section */}
      <Box className="gap-4">
        {/* Gainers Section */}
        <Box className="shadow-glowLight dark:shadow-glowDark rounded-xl p-4 w-[30dvw] h-[43vh]">
          <Text className="uppercase font-bold text-responsive text-center">
            Top Gainers
          </Text>
          <GainersLosers type="gainers" />
        </Box>

        {/* Losers Section */}
        <Box className="shadow-glowLight dark:shadow-glowDark rounded-xl p-4 w-[30dvw] h-[43vh]">
          <Text className="uppercase font-bold text-responsive text-center">
            Top Losers
          </Text>
          <GainersLosers type="loosers" />
        </Box>
      </Box>
    </Box>
  );
};

export default Page;

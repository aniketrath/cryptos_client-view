import React, { useEffect, useState } from "react";
import { Box, Text } from "../../components/index";
import {
  PriceStatistics,
  GraphStatistics,
  GlobalStatistics,
  SuggestionsComponent,
} from "./components/index";
import {
  fetchBTCDetails,
  fetchETHDetails,
  fetchGlobalDetails,
  fetchSuggestions,
} from "../APIs";

const ErrorReply = () => {
  return (
    <Box className="py-10 gap-4 px-4 text-error">
      <Text className="text-xl">We are unable to Fetch.</Text>
      <Text> Please try later .</Text>
    </Box>
  );
};

const RenderPage = () => {
  const [btcStat, setBTCStat] = useState(null);
  const [ethStat, setETHStat] = useState(null);
  const [globalStat, setGlobalStat] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        const suggestions_data = await fetchSuggestions();
        setSuggestions(suggestions_data);
      } catch (e) {
        console.error("Error fetching suggestions:", e.message);
        setSuggestions(null);
      }
    };

    const getCoinDetails = async () => {
      try {
        const results = await Promise.allSettled([
          fetchBTCDetails(),
          fetchETHDetails(),
          fetchGlobalDetails(),
        ]);

        // Map of state setters corresponding to the results
        const setters = [setBTCStat, setETHStat, setGlobalStat];
        results.forEach((result, index) => {
          if (result.status === "fulfilled") {
            setters[index](result.value); // Set data for successful results
          } else {
            console.error(
              `Error in ${["BTC", "ETH", "Global"][index]} API:`,
              result.reason,
            );
            setters[index](null); // Optionally set null for failed results
          }
        });
      } catch (e) {
        console.error("Unexpected error during API calls:", e);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getStats();
    getCoinDetails();
  }, []);

  if (error) return <Box>Error: {error}</Box>;

  return (
    <Box horizontal className="gap-5 pt-4 h-[89vh] max-h-[89vh]">
      <Box className="min-w-fit shadow-glowLight dark:shadow-glowDark rounded-xl p-4 w-[20dvw]">
        <Text className="uppercase font-bold text-responsive text-center">
          Suggestions
        </Text>
        {loading ? (
          <Box className="gap-4 py-4">
            {/* Skeleton for suggestions */}
            {Array.from({ length: 7 }).map((_, index) => (
              <Box key={index} className="h-20 skeleton"></Box>
            ))}
          </Box>
        ) : suggestions ? (
          <SuggestionsComponent data={suggestions} />
        ) : (
          <ErrorReply />
        )}
      </Box>
      <Box className="min-w-fit shadow-glowLight dark:shadow-glowDark rounded-xl p-4 flex-grow gap-4">
        <Text className="uppercase text-responsive text-center font-bold">
          BTC | ETH
        </Text>
        {loading ? (
          <Box className="gap-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <Box key={index} className="h-[36dvh] skeleton"></Box>
            ))}
          </Box>
        ) : btcStat && ethStat ? (
          <>
            <GraphStatistics
              data={[
                btcStat?.ticker_history || [],
                ethStat?.ticker_history || [],
              ]}
            />
            <PriceStatistics data={[btcStat, ethStat]} />
          </>
        ) : (
          <ErrorReply />
        )}
      </Box>
      <Box className="min-w-fit shadow-glowLight dark:shadow-glowDark rounded-xl p-4 w-[20dvw]">
        <Text className="uppercase text-responsive font-bold text-center">
          Market Today
        </Text>
        {loading ? (
          <Box className="gap-4 py-4">
            <Box className="h-[75dvh] skeleton"></Box>
          </Box>
        ) : globalStat ? (
          <GlobalStatistics data={globalStat} />
        ) : (
          <ErrorReply />
        )}
      </Box>
    </Box>
  );
};

export default RenderPage;

import React, { useEffect, useState } from 'react'
import { Box, Text } from '../../components/index'
import {
  PriceStatistics,
  GraphStatistics,
  GlobalStatistics,
  SuggestionsComponent
} from './components/index'
import {
  fetchBTCDetails,
  fetchETHDetails,
  fetchGlobalDetails,
  fetchSuggestions
} from './components/ApiCalls'

const RenderPage = () => {
  const [btcStat, setBTCStat] = useState();
  const [ethStat, setETHStat] = useState();
  const [globalStat, setGlobalStat] = useState();
  const [suggestions, setSuggestions] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      try {
        const suggestions_data = fetchSuggestions();
        setSuggestions(suggestions_data);
      } catch (e) {
        console.log(e)
      }
    }
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
            setters[index](result.value); // Set the data for successful results
          } else {
            console.error(`Error in ${["BTC", "ETH", "Global"][index]} API:`, result.reason);
            setters[index](null); // Optionally set null for failed results
          }
        });
        setLoading(false);
      } catch (error) {
        console.error("Unexpected error during API calls:", error);
      }
    };
    getStats();
    getCoinDetails();
    // Set an interval to fetch data every 10 seconds
    // const intervalId = setInterval(getCoinDetails, 10000); // 10000 ms = 10 seconds
    // return () => clearInterval(intervalId);
  }, []);

  if (loading) return <Box>Loading...</Box>;

  return (
    <Box horizontal className='gap-5 pt-4 h-[89vh] max-h-[89vh]'>
      <Box className='min-w-fit shadow-glowLight dark:shadow-glowDark rounded-xl p-4 w-[20dvw]'>
        <Text className=' uppercase font-bold text-responsive text-center'> Suggestions </Text>
        <SuggestionsComponent data={suggestions}/>
      </Box>
      <Box className='min-w-fit shadow-glowLight dark:shadow-glowDark rounded-xl p-4 flex-grow gap-4'>
        <Text className='uppercase text-responsive text-center font-bold'> btc | eth </Text>
        <GraphStatistics data={[btcStat.ticker_history, ethStat.ticker_history]} />
        <PriceStatistics data={[btcStat, ethStat]} />
      </Box>
      <Box className='min-w-fit shadow-glowLight dark:shadow-glowDark rounded-xl p-4 w-[20dvw]'>
        <Text className='uppercase text-responsive font-bold text-center'>Market Today</Text>
        <GlobalStatistics data={globalStat} />
      </Box>
    </Box>
  )
}

export default RenderPage
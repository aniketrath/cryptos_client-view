import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { Box, Text } from '../../components/index';
import { fetchStats } from '../APIs'
import { Details , GraphStats} from './components/index';

const Page = () => {
  const [searchParams] = useSearchParams();
  const [coinStats, setCoinStats] = useState(null); // Initialize to null
  const [error, setError] = useState(null);
  // Extract 'id' parameter from the URL
  const coin_id = searchParams.get('id');

  useEffect(() => {
    const fetchDetails = async (id) => {
      try {
        const resp = await fetchStats(id); // Add await to resolve the Promise
        setCoinStats(resp);
      } catch (e) {
        console.error('Error fetching coin stats:', e);
        setError('Failed to fetch coin stats.');
      }
    };
    if (coin_id) {
      fetchDetails(coin_id);
    }
  }, [coin_id]); // Add coin_id as a dependency

  if(coinStats != null && error == null) 
  return (
    <Box horizontal className='gap-5 pt-4 h-[89vh] max-h-[89vh]'>
      <Box className='min-w-fit shadow-glowLight dark:shadow-glowDark rounded-xl p-4 w-[20dvw] gap-4'>
        <Text className=' uppercase font-bold text-responsive text-center'> Details </Text>
        <Details 
        name={coinStats.name}
        symbol={coinStats.symbol}
        rank={coinStats.rank}
        logo={coinStats.logo}
        price={coinStats.ticker_history}
        change={coinStats.change_24hr}
        updatedAt={coinStats.updatedAt}/>
      </Box>
      <Box className='min-w-fit shadow-glowLight dark:shadow-glowDark rounded-xl p-4 flex-grow gap-4'>
        <Text className=' uppercase font-bold text-responsive text-center'> Price Statistics </Text>
        <GraphStats array={coinStats.ticker_history}/>
      </Box>
    </Box>
  );
}

export default Page
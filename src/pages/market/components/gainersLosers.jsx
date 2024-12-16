import React, { useState, useEffect } from 'react';
import { fetchGainers, fetchLossers } from './ApiCalls';
import { Box, Text } from '../../../components/index';

const Card = ({name ,symbol, change}) => {
  const formatName = (name) => {
    if (name.length > 5) {
        return name.slice(0, 5) + "...";
    }
    return name; // Return the original name if it's 13 characters or less
};
  return (
    <Box horizontal className="bg-base-300 text-responsive-content p-4 rounded-xl justify-between">
      <Text className='text-secondary w-[33%]'>{formatName(name)}</Text>
      <Text className='text-info w-[33%]'>{symbol}</Text>
      <Text className=''>{parseFloat(change).toFixed(3)}</Text>
    </Box>
  );
};

const GainersLosers = ({ type }) => {
  const [iterator, setIterator] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await Promise.allSettled([fetchGainers(), fetchLossers()]);

        // Extract results and ensure fallback to empty arrays
        const [gainers, lossers] = response.map((result) =>
          result.status === 'fulfilled' ? result.value || [] : []
        );

        // Set `iterator` based on `type`
        setIterator(type === 'gainers' ? gainers : lossers);
      } catch (error) {
        console.error('Unexpected error during API calls:', error);
        setIterator([]); // Fallback to an empty array in case of an error
      } finally {
        setLoading(false); // Ensure loading is set to false after processing
      }
    };

    getStats();
  }, [type]); // Re-run when `type` changes
  console.log(iterator);
  
  if (loading) return <Box>Loading...</Box>;

  if (!Array.isArray(iterator) || iterator.length === 0)
    return (
      <Box className="bg-base-300 text-responsive-content px-4 my-6 rounded-xl text-info">
        <Text className='py-4'>Oops! Looks like there are None for the type {type} </Text>
      </Box>
    );

  return (
    <Box className="gap-4 overflow-scroll scrollbar-hide">
      {iterator.map((item, index) => (
        <Card key={index}
        name={item.name}
        symbol={item.symbol}
        change={item.change_24hr} />
      ))}
    </Box>
  );
};

export default GainersLosers;

import React from 'react'
import { Box, Text, Image } from '../../../components/index'

const Details = ({ name,
  symbol,
  rank,
  logo,
  price,
  change,
  updatedAt }) => {

    const changeColor = change >= 0 ? 'text-success' : 'text-error'

    const FormatTimeStamp = (dateString) => {
      const date = new Date(dateString);
      // Extract day, month, and year
      const day = String(date.getUTCDate()).padStart(2, '0');
      const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
      const year = String(date.getUTCFullYear()).slice(2); // Last 2 digits of the year
      // Extract hours, minutes, and seconds
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      const seconds = String(date.getUTCSeconds()).padStart(2, '0');
      return `${day}-${month}-${year}:@:${hours}:${minutes}:${seconds}`;
    };

  return (
    <Box className='gap-2 text-responsive-content'>
      <Text className='text-info font-bold'>Name</Text>
      <Text className='font-semibold text-yellow-400'> {name}</Text>
      <Text className='text-info font-bold'>Symbol</Text>
      <Text className='font-semibold text-yellow-400'> {symbol}</Text>
      <Text className='text-info font-bold'>Rank</Text>
      <Text className='font-semibold text-yellow-400'> {rank}</Text>
      <Text className='text-info font-bold'>Logo</Text>
      <Image className='h-10 w-10 rounded-xl' src={logo} />
      <Text className='text-info font-bold'>Price</Text>
      <Text className='font-semibold text-success'>${parseFloat(price[0].price).toFixed(3)}</Text>
      <Text className='text-info font-bold'>Changes [24Hrs]</Text>
      <Text className={`font-semibold ${changeColor}`}> {Math.abs(parseFloat(change).toFixed(3))}</Text>
      <Text className='text-info font-bold'>Last Updated At</Text>
      <Text className='font-semibold text-yellow-400'> {FormatTimeStamp(updatedAt)}</Text>
    </Box>
  )
}

export default Details
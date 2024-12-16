import React, { useState, useEffect } from 'react'
import { Box, Text, Image } from '../../../components/index'
import { fetchAllCoins } from './ApiCalls'
import { SquareArrowOutUpRight, ChevronDownCircleIcon, ChevronUpCircleIcon, } from 'lucide-react';

const RenderCard = ({ name, logo, symbol, change, price }) => {

  const formatName = (name) => {
    if (name.length > 10) {
      return name.slice(0, 7) + "...";
    }
    return name; // Return the original name if it's 13 characters or less
  };

  const priceColor = change > 0 ? "text-success" : "text-error"

  return (
    <Box horizontal className='bg-base-300 p-4 gap-4  text-responsive-content justify-center rounded-xl 
    hover:outline hover:outline-2 hover:shadow-glowLight hover:dark:shadow-glowDark'>
      <Box horizontal className='w-[30%] text-yellow-300 gap-4'>
        <Image className='h-8 mix-blend-lighten ' src={logo} />
        <Text>{formatName(name)}</Text>
      </Box>
      <Box className='w-[15%] text-accent'>{symbol}</Box>
      <Box className='w-[20%]'>$ {parseFloat(price).toFixed(2)}</Box>
      <Box horizontal className={`w-[15%] gap-4 ${priceColor}`}>{
        change >= 0 ? <ChevronUpCircleIcon className='my-2' /> : <ChevronDownCircleIcon className='my-2' />
      }{
          Math.abs(parseFloat(change).toFixed(2))
        }</Box>
      <a href="http://"><SquareArrowOutUpRight /></a>
    </Box>
  )

}

const CoinCards = () => {
  const [coinData, setCoinData] = useState([]);
  useEffect(() => {
    const getStats = async () => {
      const resp = await fetchAllCoins();
      setCoinData(resp);
    }
    getStats();
  }, []);

  return (
    <Box className='p-4 overflow-scroll scrollbar-hide gap-4'>
      
      {
        coinData.map((e) => {
          return (
            <RenderCard
              key={e._id}
              name={e.name}
              symbol={e.symbol}
              logo={e.logo}
              change={e.change_24hr}
              price={e.ticker_history[0].price} />
          )
        })
      }

    </Box>

  )
}

export default CoinCards
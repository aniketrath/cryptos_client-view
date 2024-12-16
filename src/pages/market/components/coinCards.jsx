import React from 'react'
import { Box, Text } from '../../../components/index'
import { SquareArrowOutUpRight } from 'lucide-react';

const RenderCard = () => {
  const formatName = (name) => {
    if (name.length > 14) {
        return name.slice(0, 10) + "...";
    }
    return name; // Return the original name if it's 13 characters or less
};
  return (
    <Box horizontal className='bg-base-300 p-4 gap-4  text-responsive-content justify-center rounded-xl 
    hover:outline hover:outline-2 hover:shadow-glowLight hover:dark:shadow-glowDark'>
      <Text className='w-[15dvw] text-start'> {formatName("Heloooooooooooooooooooooooo")}</Text>
      <Text className='w-[7dvw] text-start text-accent'> HYMB </Text>
      <Text className='w-[6dvw] text-start text-yellow-400'> ${formatName("8.35")}</Text>
      <Text className='w-[6dvw] text-start text-yellow-400'> CH{formatName("8.35")}</Text>
      <SquareArrowOutUpRight className='h-10 -mt-1'/>
    </Box>
  )

}

const CoinCards = () => {
  return (
    <Box className='p-4 overflow-scroll scrollbar-hide '>
      <RenderCard />
    </Box>

  )
}

export default CoinCards
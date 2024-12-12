import React from 'react'
import { Box, Text, Image } from '../../../components'

const VALUES = ({ id, symbol, name, rank, logo, change_24hr }) => {
    const change_color = parseFloat(change_24hr) >= 0 ? "text-green-200" : "text-red-400";
    return (
        <Box className='text-responsive-content font-semibold gap-2 w-full'>
            <Box horizontal className=' justify-between items-center'>
                <Text className='text-accent font-extrabold'> ID</Text>
                <Text className=''> {id}</Text>
            </Box>
            <Box horizontal className=' justify-between items-center'>
                <Text className='text-accent font-extrabold'> Symbol</Text>
                <Box horizontal className='gap-6'>
                    <Text className=''> {symbol}</Text>
                    <Image className='w-6 h-6 mt-1' src={logo} />
                </Box>
            </Box>
            <Box horizontal className=' justify-between items-center'>
                <Text className='text-accent font-extrabold'> Name</Text>
                <Text className=''> {name}</Text>
            </Box>
            <Box horizontal className=' justify-between items-center'>
                <Text className='text-accent font-extrabold'> rank</Text>
                <Text className=''> {rank}</Text>
            </Box>
            <Box horizontal className=' justify-between items-center'>
                <Text className='text-accent font-extrabold'> Change %</Text>
                <Text className={`${change_color}`}> {parseFloat(change_24hr).toFixed(3)}</Text>
            </Box>
        </Box>
    )
}

const priceStats = ({ data }) => {
    return (
        <Box horizontal className=' justify-between  items-center p-3 gap-10'>
            {
                data.map((coin) => {
                    return (
                        <VALUES
                            key={coin._id}
                            id={coin.id}
                            symbol={coin.symbol}
                            name={coin.name}
                            rank={coin.rank}
                            logo={coin.logo}
                            change_24hr={coin.change_24hr} />
                    )
                })
            }
        </Box>
    );
}

export default priceStats
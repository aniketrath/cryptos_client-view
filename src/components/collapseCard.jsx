import React from 'react'
import { Box, Text, Image } from './index'
import { ArrowUpRight } from 'lucide-react';
import {
    AreaChart,
    Area,
    ResponsiveContainer,
} from "recharts";

const GraphComponent = ({ priceList }) => {

    const formattedPrice = priceList.slice(0, 30)

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={formattedPrice}>
                <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#525252" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#525252" stopOpacity={0.05} />
                    </linearGradient>
                </defs>
                <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#06b6d4"  // Orange color for BTC
                    strokeWidth={2}
                    fill="url(#color)"  // Orange color for BTC
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}

const CollapseCard = ({ name, logo, symbol, price }) => {
    const formatName = (name) => {
        if (name.length > 13) {
            return name.slice(0, 10) + "...";
        }
        return name; // Return the original name if it's 13 characters or less
    };
    return (
        <div className="collapse w-[18vw] min-h-fit 
        hover:outline hover:outline-2 hover:outline-accent">
            <input type="checkbox" className="peer" />
            <div className="collapse-title 
            bg-base-300
            transition-all duration-300">
                <Box horizontal className='justify-between'>
                    <Text>{formatName(name)}</Text>
                    <Text className='-mr-6 text-accent'>{symbol}</Text>
                </Box>
            </div>
            <div className="collapse-content 
            bg-base-300
            transition-all duration-300">
                <Box horizontal className='justify-between'>
                    <Text className='text-lg'>Price Open: {price[0].price.toFixed(2)} $</Text>
                    <Image className='w-10 h-10 z-20' src={logo} />
                </Box>
                <Box className='h-32 -z-10'>
                    <GraphComponent priceList={price} />
                </Box>
                <Box horizontal className='mt-2'>
                    <a className='text-accent text-[1.1rem] px-2 ' href="#">Details </a>
                    <ArrowUpRight className='-ml-1' size={"2.7vh"} color='#06b6d4' />
                </Box>

            </div>
        </div>
    )
}

export default CollapseCard
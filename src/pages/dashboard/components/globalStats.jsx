import React, { useState, useEffect } from 'react'
import { Box, Text } from '../../../components'

export const GlobalStats = ({ data }) => {

    const [globalData, SetGlobalData] = useState({

        BitcoinDominance: "",
        TotalCryptos: 0,
        MarketCapUSD: 0,
        MarketCapChange: 0,
        Market24HrAllTimeHigh: 0,
        VolumeAllTimeHigh: 0,
        Volume24Hr: 0,
        Volume24HrChange: 0,
    })
    useEffect(() => {
        const updateStats = async () => {
            SetGlobalData({
                BitcoinDominance: data.bitcoin_dominance_percentage,
                TotalCryptos: data.cryptocurrencies_number,
                MarketCapUSD: data.market_cap_usd,
                Market24HrAllTimeHigh: data.market_cap_ath_value,
                MarketCapChange: data.market_cap_change_24h,
                VolumeAllTimeHigh: data.volume_24h_ath_value,
                Volume24Hr: data.volume_24h_usd,
                Volume24HrChange: data.volume_24h_change_24h,
            });
        };
        updateStats();
    }, [data]);

    const market_change = globalData.MarketCapChange > 0 ? "text-green-400" : "text-red-400"
    const volume_change = globalData.Volume24HrChange > 0 ? "text-green-400" : "text-red-400"

    return (
        <Box className='py-4 gap-2'>
            <Text className='text-responsive-content text-accent font-extrabold'> Bitcoin Dominance :</Text>
            <Text className='text-responsive-content font-extrabold'> {globalData.BitcoinDominance} %</Text>

            <Text className='text-responsive-content text-accent font-extrabold'> GLobal Cryptos :</Text>
            <Text className='text-responsive-content font-extrabold'> {globalData.TotalCryptos} </Text>

            <Text className='text-responsive-content text-accent font-extrabold'> Market Cap [USD] :</Text>
            <Text className='text-responsive-content font-extrabold'> {globalData.MarketCapUSD} $ </Text>

            <Text className='text-responsive-content text-accent font-extrabold'> Market 24Hr ATH :</Text>
            <Text className='text-responsive-content font-extrabold'> {globalData.Market24HrAllTimeHigh} $ </Text>

            <Text className='text-responsive-content text-accent font-extrabold'> Market 24Hr Change :</Text>
            <Text className={`text-responsive-content font-extrabold ${market_change}`}> {globalData.MarketCapChange} % </Text>

            <Text className='text-responsive-content text-accent font-extrabold'> Volume [24Hr] :</Text>
            <Text className='text-responsive-content font-extrabold'> {globalData.Volume24Hr}  </Text>

            <Text className='text-responsive-content text-accent font-extrabold'> Volume 24Hr ATH :</Text>
            <Text className='text-responsive-content font-extrabold'> {globalData.VolumeAllTimeHigh}  </Text>

            <Text className='text-responsive-content text-accent font-extrabold'> Volume 24Hr Change :</Text>
            <Text className={`text-responsive-content font-extrabold ${volume_change}`}> {globalData.Volume24HrChange} % </Text>

        </Box>
    )
}

export default GlobalStats

import React, { useState, useEffect } from 'react'
import { Box, Text } from '../../components'
import { fetchSuggestions } from './components/ApiCalls'
import { SuggestionsComponent, CoinCards , GainersLosers } from './components/index'

const Page = () => {
    const [suggestions, setSuggestions] = useState();

    useEffect(() => {
        const getStats = async () => {
            try {
                const suggestions_data = fetchSuggestions();
                setSuggestions(suggestions_data);
            } catch (e) {
                console.log(e)
            }
        }
        getStats();
    }, []);
    return (
        <Box horizontal className='gap-5 pt-4 h-[89vh] max-h-[89vh]'>
            <Box className='min-w-fit shadow-glowLight dark:shadow-glowDark rounded-xl p-4 w-[20dvw]'>
                <Text className=' uppercase font-bold text-responsive text-center'> Suggestions </Text>
                <SuggestionsComponent data={suggestions} />
            </Box>
            <Box className='min-w-fit shadow-glowLight dark:shadow-glowDark rounded-xl p-4 flex-grow gap-4'>
            <Text className=' uppercase font-bold text-responsive text-center'> All Coins </Text>
            <CoinCards/>
            </Box>
            <Box className=' gap-4'>

                <Box className=' shadow-glowLight dark:shadow-glowDark rounded-xl p-4 w-[30dvw] h-[43vh]'>
                    <Text className=' uppercase font-bold text-responsive text-center'> Top Gainers </Text>
                    <GainersLosers type= "gainers"/>
                </Box>
                <Box className=' shadow-glowLight dark:shadow-glowDark rounded-xl p-4 w-[30dvw] h-[43vh]'>
                    <Text className=' uppercase font-bold text-responsive text-center'> Top loosers </Text>
                    <GainersLosers type= "loosers"/>
                </Box>

            </Box>
        </Box>
    )
}

export default Page
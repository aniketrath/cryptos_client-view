import React, { useState, useEffect } from 'react'
import { Box, CollapseableCard } from '../../../components/index'

const Suggestions = ({ data }) => {

    const [suggestionsData, setSuggestionsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // If `data` is a promise, wait for it to resolve
                const resolvedData = await data; // Await the Promise if data is a Promise
                setSuggestionsData(resolvedData); // Set the resolved data to state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [data]); // Only run when `data` changes

    if (suggestionsData)
        return (
            <Box className='text-responsive-content py-4 overflow-y-scroll gap-4 scrollbar-hide px-2'>
                {
                    suggestionsData.map((e) => {
                        return <CollapseableCard
                            key={e._id}
                            name={e.name}
                            logo={e.logo}
                            symbol={e.symbol}
                            price={e.ticker_history} />
                    })
                }
            </Box>
        )
}

export default Suggestions
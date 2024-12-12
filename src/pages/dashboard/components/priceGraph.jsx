import React from 'react'
import { Box, Text } from '../../../components'
import dayjs from 'dayjs';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ payload, label, active }) => {
  if (active && payload && payload.length) {
    // Extracting the necessary data from the payload
    const { btcPrice, ethPrice, btcVolume, ethVolume, timestamp } = payload[0].payload;

    // Format the timestamp to a human-readable date using dayjs
    const formattedDate = dayjs(timestamp).format('YYYY-MM-DD');

    return (
      <Box className=" p-3 rounded-lg custom-tooltip outline outline-2 outline-zinc-100 bg-zinc-500/55 shadow-glowLight dark:shadow-glowDark">
        <Text>Date: <span className='text-white'>{formattedDate}</span></Text>
        <Text>BTC Price : <span className='text-green-400'> ${btcPrice.toFixed(2)}</span></Text>
        <Text>BTC Volume (24hr): <span className='text-white'>{btcVolume.toFixed(2)}</span></Text>
        <Text>ETH Price : <span className='text-green-400'> ${ethPrice.toFixed(2)}</span> </Text>
        {ethVolume && <Text>ETH Volume (24hr): <span className='text-white'>{ethVolume.toFixed(2)}</span></Text>}
      </Box>
    );
  }

  return null;
};

const CustomTick = (props) => {
  const { x, y, payload } = props;

  return (
    <text
      x={x}
      y={y}
      dy={20}
      textAnchor="end"
      style={{
        fontSize: "clamp(20px, 1.5vw, 20px)", // Clamp font size
        fill: "#666",
      }}>
      ${payload.value/1000}k
    </text>
  );
};

const priceGraph = ({ data }) => {

  const formatChartData = (btcData, ethData) => {
    return btcData.map((btcPoint, index) => ({
      timestamp: btcPoint.timestamp, // Common x-axis (timestamp)
      btcPrice: btcPoint.price,     // BTC price
      ethPrice: ethData[index]?.price || null, // ETH price
      btcVolume: btcPoint.volume_24h,
      ethVolume: ethData[index]?.volume_24h || null, // ETH price
    }));
  };
  const formattedData = data ? formatChartData(data[0], data[1]) : [];

  return (
    <Box className='h-[50dvh] mr-10'>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formattedData}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#525252" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#525252" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <XAxis dataKey="timestamp" tickFormatter={(tick) => dayjs(tick).format('YY-MM-DD')} tick={{ fontSize: 10 }}/>
          <YAxis tick={<CustomTick />}/>
          <Tooltip content={<CustomTooltip />} />

          {/* BTC Area with linear fading opacity */}
          <Area
            type="monotone"
            dataKey="btcPrice"
            stroke="#FFA500"  // Orange color for BTC
            strokeWidth={2}
            fill="url(#color)"  // Orange color for BTC
          />

          {/* ETH Area with linear fading opacity */}
          <Area
            type="monotone"
            dataKey="ethPrice"
            stroke="#808080"  // Gray color for ETH
            strokeWidth={2}
            fill="url(#color)"  // Gray color for ETH
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default priceGraph
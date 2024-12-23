const baseURL = process.env.REACT_APP_API_URL; // Get base URL from environment variable

// Function to fetch suggestions
export const fetchSuggestions = async () => {
  try {
    const response = await fetch(`${baseURL}/app/suggestions`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json(); // Parse the response as JSON
    return data;
  } catch (error) {
    console.error("[API ERROR]", error.message || error);
    throw error;
  }
};

// Function to fetch gainers
export const fetchGainers = async () => {
  try {
    const response = await fetch(`${baseURL}/app/gainers`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json(); // Parse the response as JSON
    return data;
  } catch (error) {
    console.error("[API ERROR]", error.message || error);
    throw error;
  }
};

// Function to fetch losers
export const fetchLossers = async () => {
  try {
    const response = await fetch(`${baseURL}/app/losers`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json(); // Parse the response as JSON
    return data;
  } catch (error) {
    console.error("[API ERROR]", error.message || error);
    throw error;
  }
};

// Function to fetch all coins
export const fetchAllCoins = async () => {
  try {
    const response = await fetch(`${baseURL}/app/get/coin?id=all`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json(); // Parse the response as JSON
    return data;
  } catch (error) {
    console.error("[API ERROR]", error.message || error);
    throw error;
  }
};

// Function to fetch BTC details
export const fetchBTCDetails = async () => {
  try {
    const response = await fetch(`${baseURL}/app/get/coin?id=btc-bitcoin`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json(); // Parse the response as JSON
    return data;
  } catch (error) {
    console.error("[API ERROR]", error.message || error);
    throw error;
  }
};

// Function to fetch ETH details
export const fetchETHDetails = async () => {
  try {
    const response = await fetch(`${baseURL}/app/get/coin?id=eth-ethereum`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json(); // Parse the response as JSON
    return data;
  } catch (error) {
    console.error("[API ERROR]", error.message || error);
    throw error;
  }
};

// Function to fetch global details
export const fetchGlobalDetails = async () => {
  try {
    const response = await fetch(`${baseURL}/app/global/status`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json(); // Parse the response as JSON
    return data;
  } catch (error) {
    console.error("[API ERROR]", error.message || error);
    throw error;
  }
};

// Function to fetch stats
export const fetchStats = async (id) => {
  try {
    const response = await fetch(`${baseURL}/app/get/coin?id=${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json(); // Parse the response as JSON
    return data;
  } catch (error) {
    console.error("[API ERROR]", error.message || error);
    throw error;
  }
};

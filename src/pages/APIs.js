import axios from "axios";

export const fetchSuggestions = async () => {
  try {
    const response = await axios.get("/app/suggestions");
    return response.data;
  } catch (error) {
    console.error("[API ERROR]", error.message || error);
    throw error;
  }
};

export const fetchGainers = async () => {
  try {
    const response = await axios.get("/app/gainers");
    return response.data;
  } catch (error) {
    console.error("[API ERROR]", error.message || error);
    throw error;
  }
};

export const fetchLossers = async () => {
  try {
    const response = await axios.get("/app/losers");
    return response.data;
  } catch (error) {
    console.error("[API ERROR]", error.message || error);
    throw error;
  }
};

export const fetchAllCoins = async () => {
  try {
    const response = await axios.get("/app/get/coin?id=all");
    return response.data;
  } catch (error) {
    console.error("[API ERROR]", error.message || error);
    throw error;
  }
};

export const fetchBTCDetails = async () => {
  try {
    const response = await axios.get("/app/get/coin", {
      params: { id: "btc-bitcoin" },
    });
    return response.data;
  } catch (error) {
    console.error("[API ERROR]", error.message || error);
    throw error;
  }
};
export const fetchETHDetails = async () => {
  try {
    const response = await axios.get("/app/get/coin", {
      params: { id: "eth-ethereum" },
    });
    return response.data;
  } catch (error) {
    console.error("[API ERROR]", error.message || error);
    throw error; // Re-throw error for handling in the component
  }
};
export const fetchGlobalDetails = async () => {
  try {
    const response = await axios.get(`/app/global/status`);
    return response.data;
  } catch (error) {
    console.error("[API ERROR]", error.message || error);
    throw error;
  }
};

export const fetchStats = async (id) => {
  try {
    const response = await axios.get(`/app/get/coin?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("[API ERROR]", error.message || error);
    throw error;
  }
};

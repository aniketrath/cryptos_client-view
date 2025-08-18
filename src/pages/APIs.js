import axios from "axios";

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Get base URL from environment variable
});

// Add a response interceptor for centralized error handling
axiosInstance.interceptors.response.use(
  (response) => response, // Pass successful responses through
  (error) => {
    if (error.response) {
      const { status, statusText } = error.response;
      if (status >= 300 && status < 400) {
        console.warn(`[REDIRECTION ERROR] ${status}: ${statusText}`);
      } else if (status >= 400 && status < 500) {
        console.error(`[CLIENT ERROR] ${status}: ${statusText}`);
      } else if (status >= 500) {
        console.error(`[SERVER ERROR] ${status}: ${statusText}`);
      }
    } else if (error.request) {
      console.error("[NETWORK ERROR] No response received from server");
    } else {
      console.error("[UNKNOWN ERROR]", error.message);
    }

    return Promise.reject(error); // Ensure error propagates to components
  },
);

// Individual API calls
export const fetchSuggestions = async () => {
  const response = await axiosInstance.get("app/suggestions");
  return response.data;
};

export const fetchGainers = async () => {
  const response = await axiosInstance.get("/app/gainers");
  return response.data;
};

export const fetchLossers = async () => {
  const response = await axiosInstance.get("/app/losers");
  return response.data;
};

export const fetchAllCoins = async () => {
  const response = await axiosInstance.get("/app/get/coin?id=all");
  return response.data;
};

export const fetchBTCDetails = async () => {
  const response = await axiosInstance.get("/app/get/coin", {
    params: { id: "btc-bitcoin" },
  });
  return response.data;
};

export const fetchETHDetails = async () => {
  const response = await axiosInstance.get("/app/get/coin", {
    params: { id: "eth-ethereum" },
  });
  return response.data;
};

export const fetchGlobalDetails = async () => {
  const response = await axiosInstance.get(`/app/global/status`);
  return response.data;
};

export const fetchStats = async (id) => {
  const response = await axiosInstance.get(`/app/get/coin?id=${id}`);
  return response.data;
};

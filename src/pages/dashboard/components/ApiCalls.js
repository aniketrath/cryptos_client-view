import axios from "axios";

// Functions to call 
export const fetchBTCDetails = async () => {
    try {
        const response = await axios.get('/app/get/coin', { params: { id: 'btc-bitcoin' } });
        return response.data;
    } catch (error) {
        console.error("[API ERROR]", error.message || error);
        throw error;
    }
};
export const fetchETHDetails = async () => {
    try {
        const response = await axios.get('/app/get/coin', { params: { id: 'eth-ethereum' } });
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
export const fetchSuggestions = async () => {
    try {
        const response = await axios.get('app/suggestions');
        return response.data;
    } catch (error) {
        console.error("[API ERROR]", error.message || error);
        throw error;
    }
};

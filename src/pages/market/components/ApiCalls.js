import axios from "axios";

export const fetchSuggestions = async () => {
    try {
        const response = await axios.get('app/suggestions');
        return response.data;
    } catch (error) {
        console.error("[API ERROR]", error.message || error);
        throw error;
    }
};

export const fetchGainers = async () => {
    try {
        const response = await axios.get('app/gainers');
        return response.data;
    } catch (error) {
        console.error("[API ERROR]", error.message || error);
        throw error;
    }
};

export const fetchLossers = async () => {
    try {
        const response = await axios.get('app/losers');
        return response.data;
    } catch (error) {
        console.error("[API ERROR]", error.message || error);
        throw error;
    }
};
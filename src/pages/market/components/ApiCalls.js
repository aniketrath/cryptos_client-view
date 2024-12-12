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
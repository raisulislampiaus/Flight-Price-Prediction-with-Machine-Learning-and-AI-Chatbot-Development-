// src/apiService.ts
import axios from 'axios';

const API_URL = 'https://flight-fare-prediction-flask-rest-api.onrender.com';

export const predictFlightPrice = async (data: {
  departure: string;
  arrival: string;
  stopage: number;
  airline: string;
  source: string;
  destination: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/predict`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error making prediction request', error);
    throw error;
  }
};

import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID || '';
const CLIENT_SECRET = process.env.CLIENT_SECRET || '';
const BASE_URL = 'https://api.igdb.com/v4';

const getAccessToken = async () => {
  try {
    const response = await axios.post(
      'https://id.twitch.tv/oauth2/token',
      null,
      {
        params: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: 'client_credentials',
        },
      }
    );
    console.log('Access token obtained:', response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Error fetching access token:',
        error.response ? error.response.data : error.message
      );
    } else {
      console.error('Unexpected error fetching access token:', error);
    }
    throw error;
  }
};

export const fetchGameData = async (gameId: string) => {
  const accessToken = await getAccessToken();
  try {
    console.log(`Fetching game data for ID: ${gameId}`);
    const query = `fields id,name,summary,rating,cover.url; where id = ${gameId};`;
    console.log('Query:', query);
    const response = await axios.post(`${BASE_URL}/games`, query, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Client-ID': CLIENT_ID,
        'Content-Type': 'text/plain',
      },
    });
    console.log('Game data fetched:', response.data);
    return response.data[0]; // Return the first (and only) game object
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Error fetching game data:',
        error.response ? error.response.data : error.message
      );
    } else {
      console.error('Unexpected error fetching game data:', error);
    }
    throw error;
  }
};

export const searchGamesByName = async (name: string) => {
  const accessToken = await getAccessToken();
  try {
    console.log(`Searching for games with name: ${name}`);
    const query = `search "${name}"; fields id,name,summary,rating,cover.url;`;
    console.log('Query:', query);
    const response = await axios.post(`${BASE_URL}/games`, query, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Client-ID': CLIENT_ID,
        'Content-Type': 'text/plain',
      },
    });
    console.log('Games search response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Error searching games:',
        error.response ? error.response.data : error.message
      );
    } else {
      console.error('Unexpected error searching games:', error);
    }
    throw error;
  }
};

import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30731378-2156da4c931b83ccd7be7dd1e';
const PER_PAGE = 12;

async function fetchData(query, page) {
  const response = await axios.get(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  );
  return response.data;
}
export { fetchData, PER_PAGE };

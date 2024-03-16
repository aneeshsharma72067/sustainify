/**
 * Fetches news articles related to climate from the NewsAPI.
 * @param {number} pageSize - The number of articles to fetch (default: 20).
 * @returns {Promise<object>} - A promise that resolves to the fetched news data.
 */
const fetchNews = async (pageSize = 20) => {
  const res = await fetch(
    `https://newsapi.org/v2/everything?q=climate&pageSize=${pageSize}&apiKey=ac62a6e95cd34410a7d49cae52dfea62`
  );
  const data = await res.json();
  console.log(data);
  return {
    articles: [],
  };
};

export { fetchNews };

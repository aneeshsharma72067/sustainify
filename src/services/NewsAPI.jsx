const fetchNews = async (pageSize = 20) => {
  const res = await fetch(
    `https://newsapi.org/v2/everything?q=climate&pageSize=${pageSize}&apiKey=ac62a6e95cd34410a7d49cae52dfea62`
  );
  const data = await res.json();
  console.log(data);

  // not sending the fetched data as newsAPI free plan is not supported for production build !!
  return {
    articles: [],
  };
};

export { fetchNews };

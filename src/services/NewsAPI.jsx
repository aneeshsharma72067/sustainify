const fetchNews = async () => {
  const res = await fetch(
    "https://newsapi.org/v2/everything?q=climate&pageSize=10&apiKey=ac62a6e95cd34410a7d49cae52dfea62"
  );
  const data = await res.json();
  console.log(data);
  return data;
};

export { fetchNews };

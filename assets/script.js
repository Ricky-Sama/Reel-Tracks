const apiKey = '3497cfa';
async function getMovieData(movieTitle) {
  const url = `https://www.omdbapi.com/?s=${movieTitle}&apikey=${apiKey}`;
  const res = await fetch(`${url}`);
  const data = await res.json();
  // console.log(data.Search);
  //if(data.Response == "True") displayMovieList(data.Search);

    
  //If error occurs trying to fetch API
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movie data:', error);
      return error;
    }
}

 
    // https://www.omdbapi.com/?s=thor&page=1&apikey=3497cfa


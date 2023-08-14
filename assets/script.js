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

/*

When the 'Search' button is clicked: (example: function whenSearchButtonClicked() {};)
    Get the movie title input by the user.
    
    If the movie title input is empty:
        Display an alert modal (not a regular alert, confirm, or prompt!) to the user to input a movie title.
        Exit and wait for the next action?

    Otherwise, request movie info from OMDb using the movie title.

        If the movie is found on OMDb:
            Display movie info.
            Save this move data to local storage for future reference.

            Request soundtrack/playlist related to the movie from Spotify.

            If a related playlist is found on Spotify:
                Display the playlist info.
                Save this playlist data to local storage for future reference.

            Else:
                Display a message that there's no related playlist found on Spotify.
        Else:
            Display a message that the movie was not found on OMDb.

When 'search' button is clicked:
    Call whenSearchButtonClicked()

*/
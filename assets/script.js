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
const movieSearchBox = document.getElementById('form-control-box');
const searchList = document.getElementById('form-list');
const resultGrid = document.getElementById('result-output');

const apiKey = '3497cfa';

// fetch movie data from OMDb API
async function getMovieData(movieTitle) {
    const url = `https://www.omdbapi.com/?s=${movieTitle}&apikey=${apiKey}`;
    
    try {
        const response = await fetch(url);
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
    
        if (data.Response === "True") {
            return data.Search;
        } else {
            throw new Error('API response indicates an error');
        }
    } catch (error) {
        console.error('Error fetching movie data:', error);
        return null; // Return null to indicate error
    }
}

// display movie details
function displayMovieDetails(details) {
    resultGrid.innerHTML = `
    <div class="movie-poster">
        <img src="${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt="movie poster">
    </div>
    <div class="movie-info">
        <h3 class="movie-title">${details.Title}</h3>
        <ul class="movie-misc-info">
            <li class="year">Year: ${details.Year}</li>
            <li class="rated">Ratings: ${details.Rated}</li>
            <li class="released">Released: ${details.Released}</li>
        </ul>
        <p class="genre"><b>Genre:</b> ${details.Genre}</p>
        <p class="writer"><b>Writer:</b> ${details.Writer}</p>
        <p class="actors"><b>Actors:</b> ${details.Actors}</p>
        <p class="plot"><b>Plot:</b> ${details.Plot}</p>
        <p class="language"><b>Language:</b> ${details.Language}</p>
        <p class="awards"><b><i class="fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
}

// Fetch almbum details from Deezer - using JSONP
function searchDeezerAlbums(movieTitle) {
    return new Promise((resolve, reject) => {
        const query = `${movieTitle} soundtrack`; // this adds 'soundtrack' to the users search for better searching
        const script = document.createElement('script');
        const jsonpCallBack = 'jsonp_callback_' + Math.round(100000 * Math.random());
        window[jsonpCallBack] = (data) => {
            delete window[jsonpCallBack];
            document.body.removeChild(script);
            resolve(data.data[0]); // Grabbing the first album search results
        };

        script.src = `https://api.deezer.com/search/album?q=${query}&output=jsonp&callback=${jsonpCallBack}`;
        script.onerror = reject;
        document.body.appendChild(script);
    });

}

// Display Deezer album details
function displayDeezerAlbumDetails(album) {
    resultGrid.innerHTML += `
        <div class="album-cover">
            <img src="${album.cover_medium}" alt="album cover">
        </div>
        <div class="album-info">
            <h3 class="album-title">${album.title}</h3>
            <p class="artist">${album.artist.name}</p>
        </div>`
}


// main function to search and display
async function searchAndDisplay(movieTitle) {
    
    try {
        const movieList = await getMovieData(movieTitle);
        if (movieList !== null && movieList.length > 0) {
            const firstMovie = movieList[0];
            displayMovieDetails(firstMovie);
        }

        const album = await searchDeezerAlbums(movieTitle);
        if (album !== null) {
            displayDeezerAlbumDetails(album);
        }

    } catch (error) {
        console.error(`Error:`, error);
    }
}

// Event listener for search button
document.getElementById('search-btn').addEventListener('click', function(){
    const movieTitle = movieSearchBox.value;
    searchAndDisplay(movieTitle);
});
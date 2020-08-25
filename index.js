//API movies call with axios library
const fetchData = async (searchMovie) => {
    //Create async function with axios call to the API
    const response = await axios.get('http://www.omdbapi.com/',{
        params: {//Axios library allows to pass objects as arguments
            apikey: '6092f0f8',
            s: searchMovie
        }
    });
    if (response.data.Error){
        return [];//If Error its true return an empty array to fix the error can not iterate.
    }

    console.log(response.data);//Just for check in the console the results
    return response.data.Search;
};

const root = document.querySelector('.autocomplete');//Create all HTML elements inside the original div
root.innerHTML = `
    <label><b>Search For a Movie</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

const input = document.querySelector('.input');//Select input element in HTML
const dropdown = document.querySelector('.dropdown');//Select the menu div element
const resultsWrapper = document.querySelector('.results');//Select the results div element

const onInput = async event => {//Call to api with fetchData function
    const movies = await fetchData(event.target.value);

    // If const movies is empty(delete the title from the input) remove the dropdown.
    if(!movies.length){
        dropdown.classList.remove('is-active');
        return;
    }

    resultsWrapper.innerHTML = ``;
    dropdown.classList.add('is-active');//When the call was finished add this class to the menu
    for (let movie of movies){
        const option = document.createElement('a');//Create an element <a>
        option.classList.add('dropdown-item');//Add this class each element
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

        option.innerHTML = `
            <img src="${imgSrc}"/>
            ${movie.Title}
        `;//Insert HTML inside the <a> element

        option.addEventListener('click', () => {//if you click in a movie, close again the dropdown and 
            dropdown.classList.remove('is-active');// put the value in the input form of this movie
            input.value = movie.Title;

            //Now we need to do another request for the movie data
            onSelectMovie(movie);
        });

        resultsWrapper.appendChild(option);//And add to the a
    }
       

       
};

input.addEventListener('input', debounce(onInput, 1500));//Event listener with onInput function and delay

document.addEventListener('click', event => {// If you click outside the input, this event will does not 
    if(!root.contains(event.target)){ // show the list of movies.
        dropdown.classList.remove('is-active');
    }
    console.log(event.target);
});

// This function make a new request to show the data of movie selected
const onSelectMovie = async movie => {

    const response = await axios.get('http://www.omdbapi.com/',{
        params: {//Axios library allows to pass objects as arguments
            apikey: '6092f0f8',
            i: movie.imdbID
        }
    });

    console.log(response.data);

    document.querySelector('.summary').innerHTML = movieTemplate(response.data);
};

const movieTemplate = movieDetail => {
    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}" />
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `;
};



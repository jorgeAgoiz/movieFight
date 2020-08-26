// createAutocomplete object with all methods inside

createAutoComplete({
    root: document.querySelector('.autocomplete'),
    renderOption(movie) {
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
            <img src="${imgSrc}"/>
            ${movie.Title} (${movie.Year})
        `;
    },
    inputValue(movie){
        return movie.Title;
    },
    onOptionSelect(movie) {
        onSelectMovie(movie);
    },
    async fetchData(searchTerms) {//API movies call with axios library
        //Create async function with axios call to the API
        const response = await axios.get('http://www.omdbapi.com/',{
            params: {//Axios library allows to pass objects as arguments
                apikey: '6092f0f8',
                s: searchTerms
            }
        });
        if (response.data.Error){
            return [];//If Error its true return an empty array to fix the error can not iterate.
        }
        return response.data.Search;
    }
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



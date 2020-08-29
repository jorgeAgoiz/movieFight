//The original object with all methods, ready to copy for another elements
const autoCompleteConfig = {
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
    async fetchData(searchTerms) {//API movies call with axios library
        //Create async function with axios call to the API
        const response = await axios.get('http://www.omdbapi.com/',{
            params: {//Axios library allows to pass objects as arguments
                apikey: 'YOURAPIKEY',//Introduce your api key.
                s: searchTerms
            }
        });
        if (response.data.Error){
            return [];//If Error its true return an empty array to fix the error can not iterate.
        }
        return response.data.Search;
    }
};

// createAutocomplete objects with all autoCompleteConfig methods inside
createAutoComplete({//Left movie object
    ...autoCompleteConfig,
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onSelectMovie(movie, document.querySelector('#left-summary'), 'left');
    }   
});
createAutoComplete({//Right movie object
    ...autoCompleteConfig,
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onSelectMovie(movie, document.querySelector('#right-summary'), 'right');
    },   
});

//Variables to check the movies are ready
let leftMovie;
let rightMovie;

// This function make a new request to show the data of movie selected
const onSelectMovie = async (movie, summaryElement, side) => {
// Also pass the element where we want to show the movie (summaryElement)
    const response = await axios.get('http://www.omdbapi.com/',{
        params: {//Axios library allows to pass objects as arguments
            apikey: '6092f0f8',
            i: movie.imdbID
        }
    });
    summaryElement.innerHTML = movieTemplate(response.data);

    //To check the movies are ready to compare
    if(side === 'left'){
        leftMovie = response.data;
    } else {
        rightMovie = response.data;
    }
    //If both are true run the comparison function
    if(leftMovie && rightMovie){
        runComparison();
    }

};

const runComparison = () => {// Function to compare the values of the DOM and apply the styles

    const leftSideStats = document.querySelectorAll('#left-summary .notification');
    const rightSideStats = document.querySelectorAll('#right-summary .notification');

    leftSideStats.forEach((leftStat, index) => {
        const rightStat = rightSideStats[index];

        const leftSideValue = parseFloat(leftStat.dataset.value);
        const rightSideValue = parseFloat(rightStat.dataset.value);

        if(rightSideValue > leftSideValue){
            leftStat.classList.remove('is-primary');
            leftStat.classList.add('is-warning');
        } else {
            rightStat.classList.remove('is-primary');
            rightStat.classList.add('is-warning');
        }
    });

};

//This is the template for the movie results
const movieTemplate = movieDetail => {
    //Store all the data values in variables to put into the DOM
    const dollars = parseInt(
        movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, '')
    );
    const metascore = parseInt(movieDetail.Metascore);
    const imdbRating = parseFloat(movieDetail.imdbRating);
    const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));
    const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
        const value = parseInt(word);
        //When you try to parse a String the result is Not A Number.
        if(isNaN(value)){
            return prev;
        } else {
            return prev + value;
        }
    }, 0);

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

        <article data-value=${awards}  class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>

        <article data-value=${dollars} class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>

        <article data-value=${metascore} class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>

        <article data-value=${imdbRating} class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        
        <article data-value=${imdbVotes} class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `;
};



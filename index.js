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
    console.log(movies);

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
        resultsWrapper.appendChild(option);//And add to the a
    }
       

       
};

input.addEventListener('input', debounce(onInput, 1500));//Event listener with onInput function and delay



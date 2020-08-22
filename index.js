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

const movie1 = document.querySelector('#movie1');//Select input element in HTML

const onInput = async event => {//Call to api with fetchData function
       const movies = await fetchData(event.target.value);
       console.log(movies);

       for (let movie of movies){
           const divM = document.createElement('div');//Create an element div
           divM.innerHTML = `
                <img src="${movie.Poster}"/>
                <h1>${movie.Title}<h1/>
           `;//Insert HTML inside the div element
           document.body.appendChild(divM);//And add to the body
       }
       

       
};

movie1.addEventListener('input', debounce(onInput, 1000));//Event listener with onInput function and delay



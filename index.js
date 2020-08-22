//API movies call with axios library
const fetchData = async (searchMovie) => {
    //Create async function with axios call to the API
    const response = await axios.get('http://www.omdbapi.com/',{
        params: {//Axios library allows to pass objects as arguments
            apikey: '6092f0f8',
            s: searchMovie
        }
    });
    console.log(response.data);//Just for check in the console the results
};

const movie1 = document.querySelector('#movie1');//Select input element in HTML

const onInput = event => {//Call to api with fetchData function
        fetchData(event.target.value);
};

movie1.addEventListener('input', debounce(onInput, 1000));//Event listener with onInput function



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

let timeOutId;
const onInput = event => {
    if(timeOutId){//If variable timeOudId its defined, the condition its true
        clearTimeout(timeOutId);//Cancel the call to the API
    }

    timeOutId = setTimeout(() => {
        fetchData(event.target.value);//Call when the user doesnt press keys in 1,5 seconds
    }, 1500);
};

movie1.addEventListener('input', onInput);//Event listener with onInput function



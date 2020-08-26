const createAutoComplete = ({ 
    root, 
    renderOption, 
    inputValue, 
    onOptionSelect, 
    fetchData 
    }) => {// This function recieve an root element as argument
    // Create the structure with the root element
    root.innerHTML = `
        <label><b>Search For a Movie</b></label>
        <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
         </div>
        </div>
    `;

    const input = root.querySelector('.input');//Select input element in HTML
    const dropdown = root.querySelector('.dropdown');//Select the menu div element
    const resultsWrapper = root.querySelector('.results');//Select the results div element

    const onInput = async event => {//Call to api with fetchData function
        const items = await fetchData(event.target.value);

        // If const movies is empty(delete the title from the input) remove the dropdown.
        if(!items.length){
            dropdown.classList.remove('is-active');
            return;
        }

        resultsWrapper.innerHTML = ``;
        dropdown.classList.add('is-active');//When the call was finished add this class to the menu
    
        for (let item of items){
            const option = document.createElement('a');//Create an element <a>
            option.classList.add('dropdown-item');//Add this class each element
            option.innerHTML = renderOption(item);//Insert HTML inside the <a> element

            option.addEventListener('click', () => {//if you click in a movie, close again the dropdown and 
                dropdown.classList.remove('is-active');// put the value in the input form of this movie
                input.value = inputValue(item);// and close the dropdown.
                onOptionSelect(item);// Another request to the API with the selected movie

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

};
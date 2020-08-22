const debounce = (func, delay) => {//Pass a function as argument and delay
    let timeoutId;//Variable to store seTimeout function
    return (...args) => {//args array are the values of input
        if (timeoutId){//If its define the function
            clearTimeout(timeoutId);//Clear the timer and not to call at API
        }
        timeoutId = setTimeout(() => {//Call api if not press keys in the delay that you was define
            func.apply(null, args);//Apply a function to all arguments
        }, delay);
    };
};
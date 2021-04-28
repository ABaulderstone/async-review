function getJoke() {
    return new Promise((resolve, reject) => {
        $.getJSON("https://icanhazdadjoke.com/", (response) => {
            if (response) {
                resolve(response.joke);
            }
            reject(new Error("Failed to get Joke"));
        })

    })
}

document.getElementById("button").addEventListener("click", () => {
     let promiseArray = []; 
     for(let i= 0; i < 5; i++) {
         promiseArray.push(getJoke())
     }
        Promise.all(promiseArray)
        .then(jokeArray => console.log(jokeArray))
        .catch(error => console.error("Error caught: " + error.message));
})
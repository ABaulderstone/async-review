function squareNumber(number){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof number !== 'number') {
                reject(new Error("Input must be a number")); 
            }
            resolve(number * number);
        }, 3000)
    })
}
let squaredNumber = squareNumber(5);
squaredNumber
    .then(number => console.log(number))
    .catch(error => console.log("Error: " + error.message))



console.log(squaredNumber);
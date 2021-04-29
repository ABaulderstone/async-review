## Synchronous code example 

```js
function wait(ms) {
  let start = Date.now(),
    now = start;
  while (now - start < ms) {
    now = Date.now();
  }
}
console.log("let's wait for 5 seconds ...");

wait(5000);

console.log("finished"); // Waiting - synchronous code
```

Why is this bad? Why would it be especially bad for the web? 

```html
<!DOCTYPE html>
<html>
<head>
</head>
<body>
    <button id="button">Click Me!</button>
    <script>
        function wait(ms) {
            let start = Date.now(),
            now = start;
            while (now - start < ms) {
                now = Date.now();
            }
        }

        document.getElementById("button").addEventListener("click", () => {
            wait(5000);
            alert("Ran!");
        });
    </script>
</body>
</html>
```

As you can see this is a very bad user experience and keeps us from doing anything else while we wait for our code to finish executing. It also confuses the user when they have interacted multiple times with something on our page, but the response is delayed.

## Async Code 

```js
console.log(1);

setTimeout(() => {
    console.log(2);
}, 5000);

console.log(3);
``` 
What will this print to the screen? 

```js
console.log(1);

setTimeout(() => {
    console.log(2);
}, 0);

console.log(3);
``` 

What about this? 
## LOUPE VIDEO 
Then a break 

## Promise review 

```js
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
// squaredNumber
//     .then(number => console.log(number))
//     .catch(error => console.log("Error: " + error.message))



console.log(squaredNumber);
```
What do we get with the console log?

Chaining example 
```js
function generateRandomNumber(limit) {
    console.log("Generating number between 1-" + limit); 
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof limit !== 'number') {
                reject(new Error("Input must be a number"));
            }
            const randomNumber = Math.floor(Math.random() * limit) + 1
            resolve(randomNumber)
        }, 1000)
    })
}

function doubleNumber(num) {
    return new Promise((resolve, reject) => {   
        if (num < 0) {
            reject(new Error("Can't double negative number with simple math"))
        }
        resolve(num * 2)
    })
}

function logIfNotSmall(num) {
    if (num > 15) {
        throw new Error("That's too small")
    } else 
    console.log("The doubled number is " + num)
}

generateRandomNumber(10)
    .then(number => {
        console.log("The number is " + number)
        return number;
    })
    .then(doubleNumber)
    .then(logIfSmall)
    .catch(error => console.error("Caught Error: "  + error.message))

``` 
## Wrap callback syntax with promises example

```js
const fs = require('fs');

// function pickRandomName(err, data) { 
//     if (err) {
//         console.log(err.message);
//     }
//     const names = data.split('\n').filter(name => name.length > 0)
//     const randomIndex = Math.floor(Math.random() * names.length);
//     const capitalisedName = names[randomIndex].charAt(0).toUpperCase() + names[randomIndex].slice(1); 
//     console.log(capitalisedName+ " it's your turn to answer");
// }
// fs.readFile('./melb-fasttrack.txt', 'utf8', pickRandomName); 

function getData(path) { 
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (error, data) => {
            if (error) { 
                reject(error);
            }
            resolve(data);
        })
    })
}

function convertToArray(str) {
    return new Promise ((resolve, reject) => {
        if(str.length === 0) {
            const err = new Error("Can't convert empty string")
            reject(err)
        }
        const arr = str.split('\n').filter(element => element.length > 0);
        resolve(arr);
    })    
}

function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
}

function capitalise(str) {
       return str.split(" ")
        .map(name => name[0].toUpperCase() + name.substring(1))
        .join(" ");

}

function shuffle(array) { 
    const copy = [...array];
    for (let i = copy.length -1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i); 
        let temp = copy[i];
        copy[i] = copy[randomIndex];
        copy[randomIndex] = temp;
    }
    return copy
}

function chunk(array, size) {
    if (size > array.length) {
        throw new Error("Chunk is bigger than group")
    }
    return array.reduce((result, item, index) => {
        const chunk = Math.floor(index/size)
        if(!result[chunk]) {
            result[chunk] = [];
        }
        result[chunk].push(item)
        return result
    }, [])
}

// getData('./melb-gentech.txt')
//     .then(convertToArray)
//     .then(getRandomElement)
//     .then(capitalise)
//     .then(name => console.log(name + " it's your turn to answer"))
//     .catch(error => console.log(`caught error: ${error.message}`));


getData('./melb-fasttrack.txt')
    .then(convertToArray)
    .then(shuffle)
    .then(shuffledArray => chunk(shuffledArray,20))
    .then(chunkedArray => console.log(chunkedArray))
    .catch(error => console.log(`caught error: ${error.message}`));
```

// Although it may have saved some memory to only use one array, I opted to use 3 for the ease of using array.indexOf()
// to check for duplicate names and ID's. I could have looped through each object and checked if
// the values were equal but I thought this was more readable.
const objectsArray = [];
const indexArray = [];
const nameArray = [];

/**
 * Generates 100 objects and adds them to an array
 * @param {Array} arr - The array to push generated objects to
 * @param {Array} indArr - The array all generated indexes will be stored in
 * @param {Array} nameArr - The array all generated names will be stored in
 */
const generateObjects = (arr, indArr, nameArr) => {
  for (let i = 0; i <= 100; i++) {
    // Run generation functions
    const index = generateRandomIndex(indArr);
    const name = generateRandomName(nameArr);

    // Create new object
    const newObject = {
      index,
      name,
    };

    // Add object to array
    arr.push(newObject);
  }
};

/**
 * Generates a random integer to be used as an index
 * @param {Array} arr - Array generated index will be checked against and added to
 */
const generateRandomIndex = (arr) => {
  // Generate random number with a maximum of 20000000000
  const newIndex = Math.floor(Math.random() * 20000000000);

  // If the index already exists, run this function again
  if (arr.indexOf(newIndex) > -1) {
    return generateRandomIndex(arr);
  }

  // Add the index to the index array, return the index
  arr.push(newIndex);
  return newIndex;
};

/**
 * Generates a random string of characters to be used as a name
 * @param {Array} arr - Array generated names will be checked against and added to
 */
const generateRandomName = (arr) => {
  // Establish the character list to pull from and create the temporary string
  const characterList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let finalString = '';

  // Add 10 randomly picked characters to the temporary string
  for (let i = 0; i < 11; i++) {
    finalString += characterList[Math.floor(Math.random() * 52)];
  }

  // If the random string already existed, run this funciton again
  if (arr.indexOf(finalString) > -1) {
    return generateRandomName(arr);
  }

  // Add temporary string to the names array
  arr.push(finalString);
  return finalString;
};

/**
 * Sorts an array based on a given object key and prints its contents to the screen
 * @param {Array} arr - The array to be sorted
 * @param {string} key - The key we want to sort by, in this example it's either index or name
 */
const sortAndPrintArray = (arr, key) => {
  // Sort the array based on the function parameters
  arr.sort((a, b) => {
    if (a[key] > b[key]) {
      return 1;
    }

    if (a[key] < b[key]) {
      return -1;
    }

    return 0;
    a - b;
  });

  // Print each object to the string
  arr.forEach((obj) => console.log(obj));
};

// Run object generation function
generateObjects(objectsArray, indexArray, nameArray);

// The blanks spaces are just printed for formatting
console.log('\n');
console.log('Sorted by Index:\n');

// Print the objects sorted by index
sortAndPrintArray(objectsArray, 'index');
console.log('\n');

console.log('Sorted by Name\n');

// Print the objects sorted by name
sortAndPrintArray(objectsArray, 'name');

const Fuse = require('fuse.js');

const fuzzySearch = (result, query) => {

    // Check if result contains data
    if (!result || result.length === 0) {
        console.log("No data to search."); //Dev-log
        return;
    }

    // Extract city names
    const cityNames = result.map(row => row.name);

    // Fuse.js options
    const options = {
        includeScore: true,
        threshold: 0.4,
    };

    // Initialize Fuse with city names
    const fuse = new Fuse(cityNames, options);
    const searchResults = fuse.search(query);

    console.log(searchResults); // Dev log
    return searchResults;
};

module.exports = fuzzySearch; 

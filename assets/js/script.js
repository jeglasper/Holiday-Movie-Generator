//const theMovieDatabaseApiKey = 'e3627b67c2b5202d68e00b37541af9c4';
//const theMvoieDatabaseEndpoint = 'https://api.themoviedb.org/3/search/movie?'
// waiting for email back from tunefind for API key and proper endpoint URL
//const tuneFindApiKey = '' 
//const tuneFindEndpoint = 'https://[ENDPOINT].api.tunefind.com/api/v2'

//API #1 - Search Functionality & Pull information about Film by imdbID
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6234e9a526msh58287cced736d7cp1f89cdjsn3c58ad387de2',
		'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
	}
};

//API #2 - Average Movie Ratings by Number of Votes - Sorted by imdbID
const options2 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6234e9a526msh58287cced736d7cp1f89cdjsn3c58ad387de2',
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}
};

var clearButton = document.getElementById('clear-button');
var saveButton = document.getElementById('save-button');
var searchButton = document.querySelector('#button-addon3');
var enterSearch = document.querySelector('#enterSearch');
var tableBody = document.getElementById('search-table');
var searchResults = document.getElementById('searchResults');
var movieTitle = document.getElementById('movie-title');
var releaseDate = document.getElementById('release-date');
var actorNames = document.getElementById('actors');
var plot = document.getElementById('plot');
var moviePoster = document.getElementById('movie-poster');
var avgRating = document.getElementById('avg-rating');
var numVote = document.getElementById('votes');

var searchterm = '';

var getSearchResults = function() {

	//creates the applicable search language to insert in the the apiURL to pull search items
	console.log(enterSearch.value);
	searchterm = enterSearch.value;
	searchterm = searchterm.replace(/ /g,'%20');
	console.log('apiURL with Searched Movie Title: ' + searchterm);

	var apiURL = 'https://movie-database-alternative.p.rapidapi.com/?s=' + searchterm + '&type=movie';
	console.log(apiURL);

	fetch(apiURL, options)
		.then(function(response) {
			return response.json();		
		})
		.then (function(response) {
			var myArray = response.Search;
			console.log(myArray);
			
			//For Loop - displays search results
			for (var i = 0; i < myArray.length; i++) {
				var createTableRow = document.createElement('tr');
				var tableData = document.createElement('td');
				var movieTitleIMDB = document.createElement('div');

				movieTitleIMDB.textContent = myArray[i].Title + ' (' + myArray[i].Year + ') ' + '- imdbID: ' +  myArray[i].imdbID + '';

				tableData.appendChild(movieTitleIMDB);
				createTableRow.appendChild(tableData);
				tableBody.appendChild(createTableRow);
			}
			searchterm = '';
			var searchOptions = document.getElementsByTagName('tr');
			for (var i = 0; i < searchOptions.length; i++) {
				console.log(searchOptions[i].textContent);
				searchOptions[i].addEventListener('click',displayResults)
			}
		})
}

var displayResults = function(event) {
	var imdbID = event.target.textContent.substring(event.target.textContent.length - 9);
	console.log(imdbID);
	console.log(typeof imdbID);
	var apiURL = 'https://movie-database-alternative.p.rapidapi.com/?r=json&i=' + imdbID + '&type=movie';
	console.log(apiURL);

	fetch(apiURL, options)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			console.log(data);
			movieTitle.textContent = data.Title;
			releaseDate.textContent = data.Released;
			actorNames.textContent = data.Actors;
			plot.textContent = data.Plot;
			moviePoster.setAttribute('src', data.Poster);
			moviePoster.setAttribute('class', "");
			saveButton.addEventListener('click', addMovieWatchlist)
		})
	
	apiURL = 'https://moviesdatabase.p.rapidapi.com/titles/' + imdbID + '/ratings';

	fetch(apiURL,options2)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			console.log(data);
			avgRating.textContent = data.results.averageRating;
			numVote.textContent = data.results.numVotes;
		})
}

var addMovieWatchlist = function () {

}

var clearSearchList = function () {
	var searchOptions = document.getElementsByTagName('tr');
	for (var i = searchOptions.length - 1; i > -1; i--) {
		searchOptions[i].remove();
	}
}

searchButton.addEventListener("click", getSearchResults);
clearButton.addEventListener("click", clearSearchList)
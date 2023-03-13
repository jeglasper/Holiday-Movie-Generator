//const theMovieDatabaseApiKey = 'e3627b67c2b5202d68e00b37541af9c4';
//const theMvoieDatabaseEndpoint = 'https://api.themoviedb.org/3/search/movie?'
// waiting for email back from tunefind for API key and proper endpoint URL
//const tuneFindApiKey = '' 
//const tuneFindEndpoint = 'https://[ENDPOINT].api.tunefind.com/api/v2'

const options1 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6234e9a526msh58287cced736d7cp1f89cdjsn3c58ad387de2',
		'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
	}
};

var searchButton = document.querySelector('#button-addon3');
var enterSearch = document.querySelector('#enterSearch');
var tableBody = document.getElementById('search-table');
var searchResults = document.getElementById('searchResults')

var searchterm = '';

var getSearchResults = function() {

	//creates the applicable search language to insert in the the apiURL to pull search items
	console.log(enterSearch.value);
	searchterm = enterSearch.value;
	searchterm = searchterm.replace(/ /g,'%20');
	console.log('apiURL with Searched Movie Title: ' + searchterm);

	var apiURL = 'https://movie-database-alternative.p.rapidapi.com/?s=' + searchterm + '&type=movie';
	console.log(apiURL);

	fetch(apiURL, options1)
		.then(function(response) {
			return response.json();
		})
		.then (function(response) {
			console.log(response);
		})
		.then(function(data) {
			for (var i = 0; i < data.length; i++) {
				var createTableRow = document.createElement('tr');
				var tableData = document.createElement('td');
				var movieTitleIMDB = document.createElement('div');

				movieTitleIMDB.textContent = json.Search[i].Title + ' ' + json.Search[i].imdbID;
				//movieTitleIMDB.setAttribute('imdbID', Search[i].imdbID);

				tableData.appendChild(movieTitleIMDB);
				createTableRow.appendChild(tableData);
				tableBody.appendChild(createTableRow);
			}
		})



}

searchButton.addEventListener("click", getSearchResults);



//var getSearchResults = function () {

//
//	fetch(apiURL, options1)
//		.then(function (response) {
//			console.log(response);
//			response.json().then(function (data) {
//				console.log(data, title);

//			})
//		})
//}
//*	|===============================================================================================================|
//?	|	This app uses the official version of YTS (yts.mx or yts.ag) API to fetch for films available to download.	|
//!	|			If you are interested in it you can see the full documentation at https://yts.mx/api				|
//°	|===============================================================================================================|

//*	|===============================================|
//*	|	Declaración e inicialización de variables	|
//*	|===============================================|

const api = "https://yts.mx/api/v2/";
//* Parametros de busqueda
const queryTerm = document.querySelector(".search-bar");
const quality = document.querySelector("#calidad");
const genre = document.querySelector("#genre");
const rating = document.querySelector("#rating");
const year = document.querySelector("#year");
//* Colección de películas cargadas actualmente
const CurrentMovies = document.getElementsByClassName("movie");
//* Contenedor en donde se almacenan las películas
const MoviesContainer = document.querySelector(".movies-container");

//?	|===================================|
//?	|	Funciones y llamadas a la API	|
//?	|===================================|

const CreateNewFilm = (JsonApiOutput) => {
	let data = JsonApiOutput.data;
	data.movies.forEach((movie) => {
		//? Declara y recolecta la info de las variables que van a ser mostradas en el frontend
		const background = movie.background_image;
		const YtsLink = movie.url
		const img = movie.medium_cover_image;
		const title = movie.title_long;
		const ImdbId = movie.imdb_code;
		const rating = movie.rating;
		const genres = movie.genres.join(", ");
		const desc = movie.summary;
		let lang = movie.language;
		let firstLetter = lang.charAt(0).toUpperCase();
		lang = firstLetter + lang.slice(1);
		const date = movie.date_uploaded;
		const YoutubeTrailerId = movie.yt_trailer_code;
		const downloadLinks = movie.torrents
		if (downloadLinks[1].url !== "1080p") {
			var singleLink =  downloadLinks[0].url
		}
		else {
			var singleLink = downloadLinks[1].url
		}
		//? Rellena el Template con la información de la API
		const template = `<div class="movie" style="background-image: url('${background}')">
		<div class="top">
			<div class="left">
				<img loading="lazy" src="${img}" alt="">
			</div>
			<div class="right">
				<div class="top">
					<h1 class="title">${title}</h1>
					<a class="not-a" href="https://www.imdb.com/title/${ImdbId}/">
						<h3 class="rating info">⭐ ${rating}</h3>
					</a>
				</div>
				<div class="bottom">
					<div class="genres"><em>${genres}</em></div>
					<details class="description">
						<h2></h2><summary>Ver Resumen</summary></h2>
						<p>${desc}</p>
					  </details>
				</div>
			</div>
		</div>
		<div class="bottom">
			<div class="lang info">🌐: ${lang}</div>
			<div class="date info">${date}</div>
			<a class="not-a" href="https://www.youtube.com/watch?v=${YoutubeTrailerId}/">
				<div class="trailer info"><span class="material-symbols-outlined">play_arrow</span> Ver trailer
				</div>
			</a>
			<a href="${singleLink}" class="not-a download info">
				<span class="material-symbols-outlined">download</span> Descargar Torrent
			</a>
		</div>
	</div>`;
		//? Agrega los templates al DOM
		MoviesContainer.insertAdjacentHTML("beforeend", template);
	});
};

const DeleteMovies = () => {
	while (CurrentMovies.length > 0) {
		CurrentMovies[0].parentNode.removeChild(CurrentMovies[0]);
	}
};

const SearchMovie = () => {
	DeleteMovies();
	ApiCall(
		`list_movies.json?quality=${quality.value}&minimum_rating=${rating.value}&query_term=${queryTerm.value}&genre=${genre.value}`,
		CreateNewFilm
	);
};

const ApiCall = (path, callback) => {
	fetch(`${api}${path}`)
		.then((response) => response.json())
		.then((data) => {
			if (data.data.movie_count === 0){
				console.error("There has been an error. Probably, the movie you were searching for doesnt exist.")
				alert("Error! La pelicula que estabas buscando no se encontró. Intenta buscar el título en ingles o filtrar por año.")
			}else{
			callback(data);
			}
		});
};

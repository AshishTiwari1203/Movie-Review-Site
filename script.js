// API Call Setup
const API_KEY = 'api_key=b7016393a8fcb05325b894581cd02261';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

//Movie container 
const main= document.getElementById('main');
const form= document.getElementById('form');
const search= document.getElementById('search');

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then(res => res.json()) 
    .then(data => {
      // Using this data to show movies
      console.log(data.results);
      showMovies(data.results);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}


//Function too show movies
function showMovies(data){

  //To clear previous movie content
  main.innerHTML = '';

  data.forEach(movie => {
    const{title, poster_path, vote_average, overview} = movie;
    const movieEle = document.createElement('div');
    movieEle.classList.add('movie');
    movieEle.innerHTML=`
            <img src="${IMG_URL+poster_path}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
    
    `

    //After getting the data in proper format 
    //Append the data recieved

    main.appendChild(movieEle);
  });
}

//To get color
function getColor(vote){
  if(vote>= 8){
    return 'green'
  }
  else if(vote >= 5){
    return 'orange'
  }
  else{
    return 'red'
  }
}

form.addEventListener('submit', (e)=> {
  e.preventDefault();

  const searchTerm = search.value;

  if(searchTerm){
    getMovies(searchURL+'&query='+searchTerm)
  }
  else{
    getMovies(API_URL);
  }
  
})
    
// // Now making the function to get the movies
// function getMovies(url) {
//   fetch(url)
//     .then(res => res.json()) // Fix: pass a function to .then() to handle the response
//     .then(data => {
//       console.log(data);
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//     });
// }


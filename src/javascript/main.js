// https://developer.themoviedb.org/reference/intro/getting-started

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
        'language': 'es',
    }
})
const API_URL = 'https://api.themoviedb.org/3/'

// Funciones personalizadas
const lazyLoader =  new IntersectionObserver((entries) => {
    entries.forEach(element => { 
        if (element.isIntersecting) {
            const url = element.target.getAttribute('data-src')
            element.target.setAttribute('src', url)
            lazyLoader.unobserve(element.target)
        }
    })
})

const createEl = (el) => document.createElement(el)
const createMovies = (iterable, sec, lazyLoad = false) => {
    sec.innerHTML = "";
    iterable.forEach(element => {
        const movieContainer = createEl('div')
        movieContainer.classList.add('movie-container')
        const movieImg = createEl('img')
        movieImg.classList.add('movie-img')
        movieImg.setAttribute('alt',element.title)
        movieImg.setAttribute(lazyLoad ? 'data-src' : 'src',`https://image.tmdb.org/t/p/w300${element.poster_path}`)
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute('src','https://static.platzi.com/static/images/error/img404.png')
        })
        movieContainer.addEventListener('click', () => location.hash = `#movie=${element.id}`)

        if(lazyLoad) {
            lazyLoader.observe(movieImg)
        }
        movieContainer.appendChild(movieImg)
        sec.appendChild(movieContainer)
    });
}
const createCategories = (iterable, sec) => {
    sec.innerHTML = "";
    iterable.forEach(element => {
        const categoryContainer = createEl('div')
        categoryContainer.classList.add('category-container')
        const categoryH3 = createEl('h3')
        categoryH3.classList.add('category-title')
        categoryH3.setAttribute('id',`id${element.id}`)
        categoryH3.addEventListener('click', () => {
            location.hash = `#category=id${element.id}-${element.name}`
        })
        const categoryH3Text = document.createTextNode(element.name)
        categoryH3.appendChild(categoryH3Text)
        categoryContainer.appendChild(categoryH3)
        sec.appendChild(categoryContainer)
    });   
}

//Funciones de llamado al API
const getTrendingMoviesPreview = async () => {
    const { data } = await api('trending/movie/week')
    const movies = data.results
    createMovies(movies,trendingMoviesPreviewList,true)
}
const getCategoriesPreview = async () => {
    const { data } = await api('genre/movie/list')
    const categories = data.genres
    createCategories(categories, categoriesPreviewList)
}
const getMoviesByCategory = async (id) => {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id,
        }
    })
    const movies = data.results
    createMovies(movies,genericSection,true)
}
const getMoviesBySearch = async (query) => {
    const { data } = await api('search/movie', {
        params: {
            query,
        }
    })
    const movies = data.results
    createMovies(movies,genericSection, true)
}
const getTrendingMovies = async () => {
    const { data } = await api('trending/movie/week')
    const movies = data.results
    createMovies(movies,genericSection, true)
}
const getMovieById = async (id) => {
    const { data: movie } = await api(`movie/${id}`)

    const movielImgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    headerSection.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url(${movielImgUrl})`; 

    movieDetailTitle.innerHTML = movie.title
    movieDetailScore.innerHTML = movie.vote_average.toFixed(1)
    movieDetailDescription.innerHTML = movie.overview 
    movieDetailCategoriesList.innerHTML = ''

    createCategories(movie.genres, movieDetailCategoriesList)
    getRelatedMoviesById(id)
}
const getRelatedMoviesById = async (id) => {
    const { data } = await api(`movie/${id}/similar`)
    const movies = data.results
    createMovies(movies,relatedMoviesContainer, true)
}
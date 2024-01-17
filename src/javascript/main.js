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


const createEl = (el) => document.createElement(el)

const getTrendingMoviesPreview = async () => {
    const { data } = await api('trending/movie/week')
    const movies = data.results
    
    trendingMoviesPreviewList.innerHTML = "";

    movies.forEach(element => {
        const movieContainer = createEl('div')
        movieContainer.classList.add('movie-container')

        const movieImg = createEl('img')
        movieImg.classList.add('movie-img')
        movieImg.setAttribute('alt',element.title)
        movieImg.setAttribute('src',`https://image.tmdb.org/t/p/w300${element.poster_path}`)

        movieContainer.appendChild(movieImg)
        trendingMoviesPreviewList.appendChild(movieContainer)
    });
}
const getCategoriesPreview = async () => {
    const { data } = await api('genre/movie/list')
    const categories = data.genres

    categoriesPreviewList.innerHTML = "";

    categories.forEach(element => {
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
        categoriesPreviewList.appendChild(categoryContainer)
    });
}

const getMoviesByCategory = async (id, categoryName) => {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id,
        }
    })
    const movies = data.results
    
    genericSection.innerHTML = "";

    movies.forEach(element => {
        const movieContainer = createEl('div')
        movieContainer.classList.add('movie-container')

        const movieImg = createEl('img')
        movieImg.classList.add('movie-img')
        movieImg.setAttribute('alt',element.title)
        movieImg.setAttribute('src',`https://image.tmdb.org/t/p/w300${element.poster_path}`)

        movieContainer.appendChild(movieImg)
        genericSection.appendChild(movieContainer)
    });
}
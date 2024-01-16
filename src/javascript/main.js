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


const getTrendingMoviesPreview = async () => {
    const { data } = await api('trending/movie/week')
    const movies = data.results

    movies.forEach(element => {
        const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')

        const movieImg = document.createElement('img')
        movieImg.classList.add('movie-img')
        movieImg.setAttribute('alt',element.title)
        movieImg.setAttribute('src',`https://image.tmdb.org/t/p/w300${element.poster_path}`)

        movieContainer.appendChild(movieImg)
        trendingPreviewMoviesContainer.appendChild(movieContainer)
    });
}

const getCategoriesPreview = async () => {
    const { data } = await api('genre/movie/list')
    const categories = data.genres

    categories.forEach(element => {
        const categoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')
        const categoryContainer = document.createElement('div')
        categoryContainer.classList.add('category-container')

        const categoryH3 = document.createElement('h3')
        categoryH3.classList.add('category-title')
        categoryH3.setAttribute('id',`id${element.id}`)

        const categoryH3Text = document.createTextNode(element.name)

        categoryH3.appendChild(categoryH3Text)
        categoryContainer.appendChild(categoryH3)
        categoriesContainer.appendChild(categoryContainer)
    });
}

getTrendingMoviesPreview()
getCategoriesPreview()
let page = 1
let maxPage
let infiniteScroll

searchFormBtn.addEventListener('click', () => location.hash = `#search=${searchFormInput.value}`)
trendingBtn.addEventListener('click', () => location.hash = '#trends')
arrowBtn.addEventListener('click', () => history.back())


window.addEventListener('DOMContentLoaded', navigatorFn, false)
window.addEventListener('hashchange', navigatorFn, false)
window.addEventListener('scroll', infiniteScroll, false)


function navigatorFn() {
    console.log({location});

    if (infiniteScroll) {
        window.removeEventListener('scroll', infiniteScroll, {passive: false})
        infiniteScroll = undefined
    }

    if(location.hash.startsWith('#trends')) {
        trendsPage()
    } else if (location.hash.startsWith('#search=')) {
        searchPage()
    } else if (location.hash.startsWith('#movie=')) {
        moviePage()
    } else if (location.hash.startsWith('#category=')) {
        categoryPage()
    } else {
        homePage()
    }

    window.scroll(0,0)

    if(infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, false)
    }
}

function homePage() {
    console.log('Home');

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.remove('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.remove('inactive')
    likedMoviesSection.classList.remove('inactive')
    categoriesPreviewSection.classList.remove('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.add('inactive')


    getTrendingMoviesPreview()
    getCategoriesPreview()
    getLikedMovies()
}
function categoryPage() {
    console.log('Categorías');

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    likedMoviesSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    const categoryData = location.hash.split('=id')[1]
    const [catId, catName] = categoryData.split('-')
    headerCategoryTitle.innerHTML = decodeURI(catName)
    getMoviesByCategory(catId)
    infiniteScroll = getPaginatedMoviesByCategory(catId)

}
function moviePage() {
    console.log('Peliculas');

    headerSection.classList.add('header-container--long')
    // headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.add('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    likedMoviesSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.remove('inactive')

    const movieId = location.hash.split('=')[1]
    getMovieById(movieId)
}
function searchPage() {
    console.log('Busquedas');

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.add('inactive')
    likedMoviesSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    const movieName = location.hash.split('=')[1]
    getMoviesBySearch(movieName)
    infiniteScroll = getPaginatedMoviesBySearch(movieName)

}
function trendsPage() {
    console.log('Trends');

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    likedMoviesSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    headerCategoryTitle.innerHTML = 'Tendencias'
    getTrendingMovies()

    infiniteScroll = getPaginatedTrendingMovies
}
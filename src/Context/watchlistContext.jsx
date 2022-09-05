import React, {useState, useEffect} from "react"
const Context = React.createContext()

function ContextProvider ( { children } ) {
    const [watchList, setWatchlist] = useState( JSON.parse( localStorage.getItem('watchlist') ) || [] )
    const [genres, setGenres] = useState([])    

    const genresUrl='https://api.themoviedb.org/3/genre/movie/list?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US'
    
    async function getGenreList(){
        const response = await(fetch(genresUrl))
        const genreData = await response.json()

        setGenres( [...genreData.genres] )
    }

    useEffect( () => {
        getGenreList()
    }, [] )

    function deleteElement( id ) {
        setWatchlist( prevWatchlist => prevWatchlist.filter( currElem => currElem.id !== id ) )
        localStorage.setItem( 'watchlist', JSON.stringify( watchList ) )
    }

    function addElement ( Obj ) {
        setWatchlist( prevWatchlist => [...prevWatchlist, Obj] )
        localStorage.setItem( 'watchlist', JSON.stringify( watchList ) )
    }

    function isInWatchlist( id ) {
        return watchList.find( el => el.id===id ) ? true : false
    }

    return (
        <Context.Provider 
            value={{ 
                watchList, 
                genres, 
                deleteElement,  
                addElement, 
                isInWatchlist 
            }}
        >
            { children }
        </Context.Provider>
    )

}

export {ContextProvider, Context}
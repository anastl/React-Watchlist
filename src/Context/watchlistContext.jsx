import React, {useState, useEffect} from "react"
const Context = React.createContext()

function ContextProvider ( { children } ) {
    const [watchList, setWatchlist] = useState( JSON.parse( localStorage.getItem('watchlist') ) || [] )
    const [genres, setGenres] = useState([]) 
    const [mediaType, setMediaType] = useState('movie')

    const genresUrl='https://api.themoviedb.org/3/genre/movie/list?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US'
    
    async function getGenreList(){
        const response = await(fetch(genresUrl))
        const genreData = await response.json()

        setGenres( [...genreData.genres] )
    }

    useEffect( () => {
        getGenreList()
    }, [] )

    useEffect( () => {
        localStorage.clear()
        localStorage.setItem( 'watchlist', JSON.stringify( watchList ) )
    }, [watchList] )
   
    function deleteElement( id ) {
        setWatchlist( prevWatchlist => prevWatchlist.filter( currElem => currElem.id !== id ) )
    }
    
    function addElement ( Obj ) {
        { Obj.id && setWatchlist( prevWatchlist => [...prevWatchlist, Obj] ) }
    }

    function isInWatchlist( id ) {
        return watchList.find( el => el.id===id ) ? true : false
    }

    function handleMedia( type ){
        setMediaType( type )
    }

    console.log(mediaType)

    return (
        <Context.Provider 
            value={{ 
                watchList, 
                genres, 
                deleteElement,  
                addElement, 
                isInWatchlist,
                mediaType,
                handleMedia 
            }}
        >
            { children }
        </Context.Provider>
    )

}

export {ContextProvider, Context}
import React, { useState, useContext } from "react"
import Media from "../Components/Media"
import { Context } from "../Context/watchlistContext"

export default function MoviesAndSeries() {
    const { genres, mediaType, handleMedia, searchResults, setSearchResults } = useContext(Context)
    const [media, setMedia] = useState([])
    const [query, setQuery] = useState({
        movie: mediaType==='movie' ? true : false,
        mediaName: ''
    })
    const mediaUrl = `https://api.themoviedb.org/3/search/${ query.movie ? 'movie' : 'tv' }?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US&query=${ query.mediaName }&include_adult=false`

    async function getResults(){
        try {
            const res = await fetch(mediaUrl)
            const data = await res.json()

            const allMedia = data.results.reduce( ( mediaArray, currentMedia ) => {
                const {id, 
                        release_date, first_air_date,
                        genre_ids, 
                        title, name,
                        overview,
                        poster_path,
                        vote_average,
                    } = currentMedia

                if ( poster_path && overview && (release_date || first_air_date)) {
                    const mediaGenres = genre_ids.reduce( ( genresArr, currGenreId ) => {
                        const genrePos = genres.findIndex( ({id}) => currGenreId===id )
                        genresArr.push( genres.at(genrePos).name ) 
                        return genresArr
                    }, [] ).join(', ')

                    mediaArray.push(
                        <Media 
                        key={id} 
                        id={id}
                        src={poster_path}
                        title={title || name}
                        release_date={release_date || first_air_date}
                        summary={overview}
                        genres={mediaGenres}
                        rating={vote_average}
                        />
                    )
                }
    
                return mediaArray
            }, [] )

            setMedia( allMedia )
            setSearchResults( allMedia )
        }
        catch (e) { console.log(e) }
    }

    function handleChange( e ) {
        const {name, value, type, checked} = e.target
        setQuery( prevQuery => {
            return {
                ...prevQuery,
                [name]: type === "checkbox" ? checked : value
            }
        } )
        if ( type === 'checkbox' ) {
            const aux = checked ? 'movie' : 'tv'
            handleMedia( aux )
        }
    }
    
    return (
            <main>
                <div className="search--area">
                    <h1 className="search--title">Search for a {query.movie ? 'Movie' : 'Tv Show'}</h1>
                    <form className="form" onSubmit={ (e) => {
                        e.preventDefault()
                        getResults()
                        setSearchResults([])
                    }}>
                        <div className="form-container">
                            <label className="slider-label" htmlFor="movie">
                                <input 
                                    className="input-checkbox"
                                    type="checkbox" 
                                    id="movie" 
                                    name="movie" 
                                    checked={ query.movie }
                                    onChange={ handleChange } ></input>
                                <span className="slider" ></span>
                                <span className="media-type">{query.movie ? 'Movies' : 'Tv Shows'}</span>
                            </label>
                            <input 
                                className="input-text"
                                type="text" 
                                name="mediaName" 
                                placeholder={ query.movie ? "Star Wars, Star, Star Trek"  : "Office, The Office, The Office UK"}
                                value={ query.mediaName } 
                                onChange={ handleChange }
                                />
                            <button className="button" type="submit">Search</button>
                        </div>
                    </form>
                </div>
                <div className="container">
                    { searchResults || media }
                </div>
            </main>
    )
}
import React, { useState, useEffect, useContext } from "react"
import Media from "../Components/Media"
import { Context } from "../Context/watchlistContext"

export default function Movies() {
    const { genres } = useContext(Context)
    const [movies, setMovies] = useState([])
    const [query, setQuery] = useState('')
    const moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US&query=${query}&include_adult=false`

    async function getResults(){
        try {
            const res = await fetch(moviesUrl)
            const data = await res.json()
            
            const allMovies = data.results.reduce( ( movieArray, currentMovie ) => {
                const {id, 
                        genre_ids, 
                        title,
                        overview,
                        poster_path,
                        release_date,
                        vote_average,
                    } = currentMovie
    
                if ( poster_path && overview && release_date) {
    
                    const movieGenres = genre_ids.reduce( ( genresArr, currGenreId ) => {
                        const genrePos = genres.findIndex( ({id}) => currGenreId===id )
                        genresArr.push( genres.at(genrePos).name ) 
                        return genresArr
                    }, [] ).join(', ')
    
                    movieArray.push(
                        <Media 
                            key={id}
                            id={id}
                            src={poster_path}
                            title={title}
                            release_date={release_date}
                            summary={overview}
                            genres={movieGenres}
                            rating={vote_average}
                        />
                    )
                }
    
                return movieArray
            }, [] )
    
            setMovies( allMovies )
        }
        catch (e) { console.log(e) }
    }

    
    return (
        <div className="container">
            <main className="search--area">
                <h1 className="search title">Search for a movie</h1>
                <form className="form" onSubmit={ (e) => {
                    e.preventDefault()
                    getResults()
                }}>
                    <input 
                        className="input-text"
                        type="text" 
                        name="movie" 
                        placeholder="Star Wars, Star, Star Trek" 
                        value={query} 
                        onChange={ (e) =>  setQuery(e.target.value)}
                    />
                    <button className="button" type="submit">Search</button>
                </form>
                {movies}
            </main>
        </div>
    )
}
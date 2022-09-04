import React, { useState, useEffect } from "react"
import Movie from "../Components/Movie"

export default function Movies() {
    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])
    const url = `https://api.themoviedb.org/3/search/movie?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US&query=${query}&include_adult=false`
    const genresUrl='https://api.themoviedb.org/3/genre/movie/list?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US'

    async function getResults(){
        try {
            // const res = await fetch(`https://www.omdbapi.com/?apikey=fa50c2e8&i=${movieID}`)
            const res = await fetch(url)
            const data = await res.json()
            // return data

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
                        <Movie 
                            key={id}
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

    async function getGenreList(){
        const response = await(fetch(genresUrl))
        const genreData = await response.json()

        setGenres( [...genreData.genres] )
    }

    useEffect( () => {
        getGenreList()
    }, [] )
    
    return (
        <div className="container">
            <main className="search--area">
                <h1 className="search title">Search for a movie</h1>
                <form className="form" onSubmit={ (e) => {
                    e.preventDefault()
                    getResults()} 
                }>
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
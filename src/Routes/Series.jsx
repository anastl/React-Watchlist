import React, { useState, useContext } from "react"
import Media from "../Components/Media"
import { Context } from "../Context/watchlistContext"

export default function Series( props ) {
    const { genres } = useContext(Context)
    const [series, setSeries] = useState([])
    const [query, setQuery] = useState('')
    const seriesUrl = `https://api.themoviedb.org/3/search/tv?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US&page=1&query=${query}&include_adult=false`

    async function getSeriesData(){
        try {
            const res = await fetch(seriesUrl)
            const data = await res.json()
            const allSeries = data.results.reduce( (seriesArray, currSeries) => {
                const {id,
                       first_air_date,
                       genre_ids,
                       name,
                       overview,
                       poster_path,
                       vote_average 
                } = currSeries

                if ( poster_path && overview && first_air_date ) {
                    const showGenres = genre_ids.reduce( ( genresArr, currGenreId ) => {
                        const genrePos = genres.findIndex( ({id}) => currGenreId===id )
                        genresArr.push( genres.at(genrePos).name ) 
                        return genresArr
                    }, [] ).join(', ')

                    seriesArray.push(
                        <Media 
                            key={id}
                            id={id}
                            src={poster_path}
                            title={name}
                            release_date={first_air_date}
                            summary={overview}
                            genres={showGenres}
                            rating={vote_average}
                        />
                    )
                }
                return seriesArray                
            }, [] )

            setSeries( allSeries )
        }
        catch (e) { console.log(e) }
    }

    return (
        <div className="container">
            <main className="search--area">
                <h1 className="search title">Search for a series</h1>
                <form className="form" onSubmit={ (e) => {
                    e.preventDefault()
                    getSeriesData( )
                    getResults()
                }}>
                    <input 
                        className="input-text"
                        type="text" 
                        name="series" 
                        placeholder="Office, The Office, The Office UK" 
                        value={query} 
                        onChange={ (e) =>  setQuery(e.target.value) }
                    />
                    <button className="button" type="submit">Search</button>
                </form>
                {series}
            </main>
        </div>
    )
}
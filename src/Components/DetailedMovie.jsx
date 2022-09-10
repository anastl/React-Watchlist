import React, { useContext, useEffect, useState } from "react"
import { Context } from "../Context/watchlistContext"
import { useParams } from "react-router-dom"

export default function DetailedMovie( props ) {
    const { movieId } = useParams()
    const { deleteElement, addElement, isInWatchlist  } = useContext(Context)
    const [ movie, setMovie ] = useState('')
    const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US&append_to_response=watch%2Fproviders`

    async function getDetails() {
        try {
            const res = await fetch(detailsUrl)
            const data = await res.json()
            
            const { title,
                    id,
                    poster_path,
                    tagline,
                    homepage,
                    vote_average,
                    runtime,
                    budget,
                    release_date,
                    genres,
                    overview,
                    spoken_languages,
                    production_companies,
                    watch
            } = data
            
            const imgSrc = `https://image.tmdb.org/t/p/original${poster_path}`
            const [year, month, day] = release_date.split('-')
            const genresNames = genres.map( el => el.name ).join(', ')
            const addMovieBtn = <button onClick={ () => addElement( data ) } >Add to watchlist</button>
            const deleteMovieBtn = <button onClick={ () => deleteElement( id ) } >Delete from watchlist</button>


            const movieDets = (
                <main className="movie--details-page">
                    <div className="movie--poster-and-info">
                        <img alt="" src={imgSrc} className="movie--poster"/>
                        <div className="movie--info">
                            <h3 className="movie--title">{ title }</h3>
                            {tagline && <p className="movie--tagline">{ tagline }</p>}
                            <div className="movie--website--container">
                                <a href={ homepage }>
                                    Website
                                    <span className="material-symbols-outlined">language</span>
                                </a>
                            </div>
                            <div className="movie--rating-container">
                                <span className="material-symbols-outlined">star</span>
                                <p className="p small">{ vote_average }/10</p>
                            </div>
                            <p className="p small">{ runtime }</p>
                            <p className="p small">{ budget }</p>
                            <p className="p small">Release date: { `${day}/${month}/${year}` }</p>
                            <p className="p small">Genres: { genresNames }</p>
                        </div>
                    </div>
                    <div className="movie--details">
                        <p className="p">{ overview }</p>
                    </div>
                    <div className="movie--recommendations"></div>
                    <div className="buttons-container">
                        { isInWatchlist(id) ? deleteMovieBtn : addMovieBtn  }
                        {/* <button onClick={ display more info abt the movie }>Show more</button> */}
                    </div>
                </main>
            )
            
            setMovie( movieDets )

        }
        catch (e) { console.log(e) }
    }

    useEffect( () => getDetails, [])

    return ( 
        <div className="container">
            { movie }
        </div>
    )

}
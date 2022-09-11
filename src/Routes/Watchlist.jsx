import React, { useContext } from "react"
import Media from "../Components/Media"
import { Context } from "../Context/watchlistContext"
import { Link } from 'react-router-dom'

export default function Watchlist() {
    const { watchList } = useContext( Context )

    const movies = watchList.map( movieObj => {
        const {id,
               src,
               title,
               release_date,
               summary,
               genres,
               rating
        } = movieObj

        const imgSrc = `https://image.tmdb.org/t/p/original${src}`

        return (
            <Media 
                key={id}
                id={id}
                src={imgSrc}
                title={title}
                release_date={release_date}
                summary={summary}
                genres={genres}
                rating={rating}
            />
        )
    } )

    const moviesPlaceholder = (
        <div className="watchlist--no-content">
            <p className="p description">No movies or tv shows have been added to your watchlist</p>
            <div className="watchlist--redirect">
                Try <Link className="watchlist--redirect-a" to="/search">adding</Link> movies or 
                tv shows and they'll appear here!
            </div>
        </div>
    )

    return (
        <div className="container">
            { watchList.length ? movies : moviesPlaceholder }
        </div>
    )
}
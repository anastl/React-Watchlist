import React, { useContext } from "react"
import Media from "../Components/Media"
import { Context } from "../Context/watchlistContext"

export default function Watchlist() {
    const { watchList } = useContext(Context)

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
        <h2>No movies or series have been added to your watchlist</h2>
    )

    return (
        <div className="container">
            { watchList.length ? movies : moviesPlaceholder }
        </div>
    )
}
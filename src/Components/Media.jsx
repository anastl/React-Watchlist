import React, { useContext } from "react"
import { Context } from "../Context/watchlistContext"

export default function Media( props ) {
    const { deleteElement, addElement, isInWatchlist } = useContext(Context)
    const {title,
           id,
           src,
           release_date,
           summary,
           genres,
           rating} = props

    const imgSrc = `https://image.tmdb.org/t/p/original${src}`
    const nemSummary = summary.slice(0, 400) === summary ? summary : summary.slice(0, 200)+"..."
    const [year, ...trash] = release_date.split('-')

    const addMovieBtn = <button onClick={ () => addElement( props ) } >Add to watchlist</button>
    const deleteMovieBtn = <button onClick={ () => deleteElement( id ) } >Delete from watchlist</button>

    return (
        <div className="movie-card">
            <div className="movie-info">
                <h3 className="title card-title">{ title }</h3>
                <p className="p small date">{ year }</p>
                <div className="rating-info">
                    <span className="material-symbols-outlined">star</span>
                    <p className="p small">{ rating }</p>
                </div>
                <p className="p summary">{ nemSummary }</p>
                <p className="p small genres">{ genres }</p>
                <div className="buttons-container">
                    { isInWatchlist(id) ? deleteMovieBtn : addMovieBtn  }
                    {/* <button onClick={ display more info abt the movie }>Show more</button> */}
                </div>
            </div>
            <img className="poster-image" alt="" src={imgSrc} />
        </div>
    )
}

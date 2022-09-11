import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../Context/watchlistContext"

export default function Media( props ) {
    const { deleteElement, addElement, isInWatchlist } = useContext(Context)
    const navigate = useNavigate()
    const {title,
           id,
           src,
           release_date,
           summary,
           genres,
           rating} = props
    
    const imgSrc = `https://image.tmdb.org/t/p/original${src}`
    const newSummary = summary.slice(0, 400) === summary ? summary : summary.slice(0, 397)+"..."
    const [year, ...trash] = release_date.split('-')

    const addMediaBtn = <button className="pop-out" onClick={ () => addElement( props ) } >Add to watchlist</button>
    const deleteMediaBtn = <button className="pop-out" onClick={ () => deleteElement( id ) } >Delete from watchlist</button>

    return (
        <div className="media-card">
            <div className="media-info">
                <h3 className="title card-title">{ title }</h3>
                <p className="p small date">{ year }</p>
                <div className="rating-info rating_container">
                    <span className="material-symbols-outlined">star</span>
                    <p className="p small">{ rating }/10</p>
                </div>
                <p className="p summary">{ newSummary }</p>
                <p className="p small genres">Genres: { genres }</p>
                <div className="buttons-container">
                    { isInWatchlist(id) ? deleteMediaBtn : addMediaBtn  }
                    <button 
                    className="show-more-a" 
                    onClick={() => navigate(`/search/${id}`)}
                    >
                        Show more
                    </button>
                </div>
            </div>
            <img className="poster-image" alt="" src={imgSrc} />                             

        </div>
    )
}

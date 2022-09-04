import React, { useState } from "react"

export default function Movie(props) {
    const {title,
           src,
           release_date,
           summary,
           genres,
           rating} = props

    const imgSrc = `https://image.tmdb.org/t/p/original${src}`
    const nemSummary = summary.slice(0, 400) === summary ? summary : summary.slice(0, 200)+"..."
    const [year, ...trash] = release_date.split('-')

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
            <p className="p small genres">{genres}</p>
            </div>
            <img className="poster-image" alt="" src={imgSrc} />
        </div>
    )
}

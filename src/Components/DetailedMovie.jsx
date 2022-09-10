import React, { useContext, useEffect, useState } from "react"
import { Context } from "../Context/watchlistContext"
import { useParams, useNavigate } from "react-router-dom"

export default function DetailedMovie( props ) {
    const { mediaId } = useParams()
    const back = useNavigate()

    const [ obj, setObj ] = useState({
        id:'',
        release_date:'',
        genres:'',
        title:'',
        summary:'',
        src:'',
        rating:''
    })
    
    const { deleteElement, addElement, isInWatchlist  } = useContext(Context)
    const [ movie, setMovie ] = useState([])
    const detailsUrl = `https://api.themoviedb.org/3/movie/${mediaId}?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US&append_to_response=watch%2Fproviders`
    const addMovieBtn = <button className="details_button" onClick={ () => addElement( obj ) } >Add to watchlist</button>
    const deleteMovieBtn = <button className="details_button" onClick={ () => deleteElement( parseInt( mediaId ) ) } >Delete from watchlist</button>

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
                    revenue,
                    spoken_languages,
                    production_companies,
                    watch
            } = data

            setObj ({
                id: id,
                release_date: release_date,
                genres: genres.map( el => el.id ),
                title: title,
                summary: overview,
                src: poster_path,
                rating: vote_average
            })
            
            const imgSrc = `https://image.tmdb.org/t/p/original${poster_path}`
            const [year, month, day] = release_date.split('-')
            const genresNames = genres.map( el => el.name ).join(', ')

            const movieDets = (
                <>
                    <img alt="" src={imgSrc} className="movie--poster"/>
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
                    <p className="p small runtime">Runtime: { runtime } minutes</p>
                    <p className="p small budget">Budget: ${ budget.toLocaleString() }</p>
                    <p className="p small revenue">Revenue: ${ revenue.toLocaleString() }</p>
                    <p className="p small rel_date">Release date: { `${day}/${month}/${year}` }</p>
                    <p className="p small genres">Genres: { genresNames }</p>
                    <p className="p movie--details">{ overview }</p>
                    <div className="movie--recommendations"></div>
                </>
            )
            
            setMovie( movieDets )

        }
        catch (e) { console.log(e) }
    }

    useEffect( () => {getDetails()}, [])

    // console.log(Obj)

    return ( 
        <main className="movie--details-page">
            <div className="media--detailed">
                { movie }
                { isInWatchlist(parseInt(mediaId)) ? deleteMovieBtn : addMovieBtn  }
                <button className="back-btn" onClick={ () => back(-1) }>
                    <span className="material-symbols-outlined">
                        arrow_back
                    </span>
                    Go back
                </button>
            </div>
        </main>
    )

}
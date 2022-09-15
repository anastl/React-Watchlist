import React, { useContext, useEffect, useState } from "react"
import { Context } from "../Context/watchlistContext"
import { useParams, useNavigate } from "react-router-dom"

export default function DetailedMedia( props ) {
    const { mediaType } = useContext(Context)
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
    const [ media, setMedia ] = useState([])
    const mediaURl = `https://api.themoviedb.org/3/${mediaType}/${mediaId}?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US&append_to_response=watch%2Fproviders`
    const addMediaBtn = <button aria-roledescription="add movie to watchlist" className={`${mediaType}--watchlist_button details-btn pop-out`} onClick={ () => addElement( obj ) } >Add to watchlist</button>
    const deleteMediaBtn = <button aria-roledescription="delete movie from watchlist" className={`${mediaType}--watchlist_button details-btn pop-out`} onClick={ () => deleteElement( parseInt( mediaId ) ) } >Delete from watchlist</button>

    async function getDetails() {
        try {           
            const res = await fetch(mediaURl)
            const data = await res.json()
            
            const { title, name,
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
                    production_companies,
                    watch_providers,
                    created_by,
                    episode_run_time,
                    first_air_date,
                    languages,
                    last_air_date,
                    last_episode_to_air,
                    next_episode_to_air,
                    number_of_episodes,
                    number_of_seasons,
                    origin_country,
                    original_name,
                    status
            } = data

            setObj ({
                id: id,
                release_date: release_date || first_air_date,
                genres: genres.map( el => el.name ),
                title: title || name,
                summary: overview,
                src: poster_path,
                rating: vote_average
            })
            
            const imgSrc = `https://image.tmdb.org/t/p/original${poster_path}`     
            const genresNames = genres.map( el => el.name ).join(', ')
            
            if ( mediaType === 'movie' ){
                const [year, month, day] = release_date.split('-')
                const movieDets = (
                    <>
                        <img alt="" src={imgSrc} className="movie--poster"/>
                        <h3 className="movie--title">{ title }</h3>
                        {tagline && <p className="movie--tagline">{ tagline }</p>}
                        <div className="movie--website--container website-container">
                            <a href={ homepage }>
                                <span>Website</span>
                                <span className="material-symbols-outlined">language</span>
                            </a>
                        </div>
                        <div className="movie--rating-container">
                            <span className="material-symbols-outlined">star</span>
                            <p className="small">{ vote_average }/10</p>
                        </div>
                        <p className="small runtime">Runtime: { runtime } minutes</p>
                        <p className="small budget">Budget: ${ budget.toLocaleString() }</p>
                        <p className="small revenue">Revenue: ${ revenue.toLocaleString() }</p>
                        <p className="small rel_date">Release date: { `${day}/${month}/${year}` }</p>
                        <p className="small genres">Genres: { genresNames }</p>
                        <p className="movie--details">{ overview }</p>
                        <div className="movie--recommendations"></div>
                    </>
                )
                
                setMedia( movieDets )
            } else {
                const [f_year, f_month, f_day] = first_air_date.split('-')
                const [l_year, l_month, l_day] = last_air_date.split('-')
                const [l_e_year, l_e_month, l_e_day] = last_episode_to_air.air_date.split('-')
                
                
                const lastEpisodeToAir = (
                    <div className="tv--last-episode-container">
                        <span className="last-episode-banner">Last episode to be aired</span>
                        <span className="last-episode-name">{last_episode_to_air.name}</span>
                        <span className="last-episode-overview">{last_episode_to_air.overview}</span>
                        <span className="last-episode-episode-number">Episode: {last_episode_to_air.episode_number}</span>
                        <span className="last-episode-season-number">Season: {last_episode_to_air.season_number}</span>
                        <div className="last-episode-rating-container rating_container">
                            <span className="material-symbols-outlined">star</span>
                            <p className="p rating">{ last_episode_to_air.vote_average }/10</p>
                        </div>
                        <span className="last-episode-air-date">Aired on: {`${l_e_day}/${l_e_month}/${l_e_year}`}</span>
                    </div>
                )
                
                let nextEpisodeToAir

                if ( next_episode_to_air != null ){
                    const [n_e_year, n_e_month, n_e_day] = next_episode_to_air.air_date.split('-')

                    nextEpisodeToAir = (
                        <div className="tv--next-episode-container">
                            <span className="next-episode-banner">Next episode to be aired</span>
                            <span className="next-episode-name">{next_episode_to_air.name}</span>
                            <span className="next-episode-overview">{next_episode_to_air.overview}</span>
                            <span className="next-episode-episode-number">Episode: {next_episode_to_air.episode_number}</span>
                            <span className="next-episode-season-number">Season: {next_episode_to_air.season_number}</span>
                            <span className="next-episode-air-date">Will be released on: {`${n_e_day}/${n_e_month}/${n_e_year}`}</span>
                        </div>
                    )
                }

                const creatorNames = created_by.length > 1 ? 
                    created_by.map( creatorObj => creatorObj.name).join(', ') 
                    : created_by.name

                const tvDets = (
                    <>
                        <img alt="" src={imgSrc} className="tv--poster"/>
                        <h3 className="tv--title">{ name }</h3>
                        <h6 className="tv--title--original">Original name: { original_name }</h6>
                        {tagline && <p className="tv--tagline">{ tagline }</p>}
                        <div className="tv--website--container website-container">
                            <a href={ homepage }>
                                <span>Website</span>
                                <span className="material-symbols-outlined">language</span>
                            </a>
                        </div>
                        <div className="tv--rating-container rating_container">
                            <span className="material-symbols-outlined">star</span>
                            <p className="p small">{ vote_average }/10</p>
                        </div>
                        <p className="details runtime">Runtime: { Array.isArray(episode_run_time) ? episode_run_time.at(-1) : episode_run_time } minutes</p>
                        <p className="details f_air_date">First air date: { `${f_day}/${f_month}/${f_year}` }</p>
                        <p className="details l_air_date">Last air date: { `${l_day}/${l_month}/${l_year}` }</p>
                        <p className="details genres">Genres: { genresNames }</p>
                        { lastEpisodeToAir }
                        { next_episode_to_air != null ? nextEpisodeToAir : '' }
                        {creatorNames && <div className="details tv--creator-container">
                            Creator(s): { creatorNames }
                        </div>}
                        <p className="details number-of-episodes">Number of episodes: { number_of_episodes }</p>
                        <p className="details number-of-seasons">Number of seasons: { number_of_seasons }</p>
                        <p className="details origin-country">Origin country: { origin_country }</p>
                        <p className="details status">Status: { status }</p>
                        <p className="tv--details">{ overview }</p>
                        {/* <div className="tv--recommendations"></div> */}
                    </>
                )

                setMedia( tvDets )
            }


        }
        catch (e) { console.log(e) }
    }

    useEffect( () => {getDetails()}, [])

    return ( 
        <main className="media--details-page">
            <div className={`${mediaType}--detailed`}>
                { media }
                { isInWatchlist(parseInt(mediaId)) ? deleteMediaBtn : addMediaBtn  }
                <button className={`${mediaType}--back-btn details-btn pop-out`} onClick={ () => back(-1) }>
                    <span className="material-symbols-outlined">
                        arrow_back
                    </span>
                    Back
                </button>
            </div>
        </main>
    )

}
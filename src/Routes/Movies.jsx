import React, { useState } from "react"

export default function Movies() {
    const [query, setQuery] = useState('')
    const url = `https://api.themoviedb.org/3/search/movie?api_key=a549a10218e6b1e84fddfc056a830b2c&language=en-US&query=${query}&include_adult=false`
    
    async function getResults(url){
        try {
            // const res = await fetch(`https://www.omdbapi.com/?apikey=fa50c2e8&i=${movieID}`)
            const res = await fetch(url)
            const data = await res.json()
            // return data
            console.log( data )
        }
        catch (e) { console.log(e) }
    }
    return (
        <div className="container">
            <main className="search--area">
                <h1 className="search title">Search for a movie</h1>
                <form className="form" onSubmit={ (e) => {
                    e.preventDefault()
                    getResults(url)} 
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
            </main>
        </div>
    )
}
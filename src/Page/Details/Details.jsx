import React, { useState, useEffect } from "react"
import getDetails from "../../api/Details"

// Style imports
import "./Details.css"

const DetailsPage = () => {
	const [details, setDetails] = useState([])
	const [error, setError] = useState(null)
	const [movieId, setMovieId] = useState(null)

	useEffect(() => {
		const url = window.location.pathname
		const movieId = parseInt(url.split("/movie/")[1])
		setMovieId(movieId)
		getDetails(movieId).then((data) => {
			if (data.error) {
				setError(data.error)
			} else {
				setDetails(data)
			}
		})
	}, [])

	if (error) {
		return <div>There was an error: {error.message}</div>
	}

	return (
		<div className="details-page">
			<header>
				<div className="title">Details page</div>
				<button
					onClick={() => {
						localStorage.removeItem("user")
						localStorage.removeItem("token")
						window.location.href = "/login"
					}}
				>
					Logout
				</button>
			</header>
			<main>
				<div className="content">
					<div className="movie-backdrop">
						<img
							src={
								"https://image.tmdb.org/t/p/original" +
								details.backdrop_path
							}
							alt={details.title}
							className="movie-backdrop-image"
						/>
					</div>
					<h1 className="movie-title">{details.title}</h1>
					<div className="release-date">
						Release date: {details.release_date}
					</div>
					<p className="movie-description">{details.overview}</p>

					{console.log(details)}
				</div>
			</main>
		</div>
	)
}

export default DetailsPage

import React, { useState, useEffect } from "react"
import getDetails from "../../api/Details"
import Header from "../../Component/Header/Header"

// Style imports
import "./Details.css"

const DetailsPage = () => {
	const [details, setDetails] = useState([])
	const [error, setError] = useState(null)

	useEffect(() => {
		const url = window.location.pathname
		const movieId = parseInt(url.split("/movie/")[1])
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
			<Header title="Movie Details" />
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
					<div className="vote-average">
						Vote average: {details.vote_average}
					</div>
					<p className="movie-description">{details.overview}</p>

					{console.log(details)}
				</div>
			</main>
		</div>
	)
}

export default DetailsPage

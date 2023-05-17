import React, { useState, useEffect } from "react"
import getSeriesDetails from "../../api/SeriesDetails"
import Header from "../../Component/Header/Header"

// Style imports
import "./TvDetails.css"

const TvDetailsPage = () => {
	const [details, setDetails] = useState([])
	const [error, setError] = useState(null)
	const [tvId, setTvId] = useState(null)

	useEffect(() => {
		const url = window.location.pathname
		const tvId = parseInt(url.split("/serie/")[1])
		setTvId(tvId)
		getSeriesDetails(tvId).then((data) => {
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
			<Header title="Details page" />
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
					<h1 className="movie-title">{details.name}</h1>
					<div className="release-date">
						Release date: {details.first_air_date}
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

export default TvDetailsPage

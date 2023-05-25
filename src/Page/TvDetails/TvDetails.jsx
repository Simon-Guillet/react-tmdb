import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import getSeriesDetails from "../../api/SeriesDetails"
import Header from "../../Component/Header/Header"
import Loader from "../../Component/Loader/Loader"

// Style imports
import "./TvDetails.css"

const TvDetailsPage = () => {
	const { id } = useParams()
	const [details, setDetails] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(true)
		getSeriesDetails(id)
			.then((data) => {
				if (data.error) {
					setError(data.error)
				} else {
					setDetails(data)
				}
			})
			.finally(() => {
				setLoading(false)
			})
	}, [id])

	if (error) {
		return <div>There was an error: {error.message}</div>
	}

	return (
		<div className="details-page">
			<Header title="Series Details" />
			<main>
				{loading ? (
					<Loader />
				) : (
					<div className="content">
						{details.backdrop_path && (
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
						)}
						<h1 className="movie-title">{details.name}</h1>
						<div className="release-date">
							Release date: {details.first_air_date}
						</div>
						<div className="vote-average">
							Vote average: {details.vote_average}
						</div>
						<p className="movie-description">{details.overview}</p>
						{details.id !== 1 && (
							<Link to={`/serie/${details.id - 1}`}>
								<button className="previous-button">
									Previous
								</button>
							</Link>
						)}
						<Link to={`/serie/${details.id + 1}`}>
							<button className="next-button">Next</button>
						</Link>

						{console.log(details)}
					</div>
				)}
			</main>
		</div>
	)
}

export default TvDetailsPage

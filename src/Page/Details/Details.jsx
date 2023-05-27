import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import getDetails from "../../api/Details"
import Header from "../../Component/Header/Header"
import Loader from "../../Component/Loader/Loader"

// Style imports
import "./Details.css"

const DetailsPage = () => {
	const { id } = useParams()
	const [details, setDetails] = useState([])
	const [genreDetails, setGenreDetails] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)
	const [genreLoading, setGenreLoading] = useState(true)

	useEffect(() => {
		setLoading(true)
		setGenreDetails([])
		getDetails(id)
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

	useEffect(() => {
		setGenreLoading(true)
		const fetchGenres = async () => {
			if (details.genres) {
				try {
					const genreResponse = await Promise.all(
						details.genres.map((genreLink) =>
							fetch(`https://127.0.0.1:8000${genreLink}`)
						)
					)

					const genreData = await Promise.all(
						genreResponse.map((response) => response.json())
					)

					setGenreDetails(genreData)
				} catch (error) {
					console.log(error)
				}
			}
			setGenreLoading(false)
		}

		fetchGenres()
	}, [details])

	if (error) {
		return <div>There was an error: {error.message}</div>
	}

	return (
		<div className="details-page">
			<Header title="Movie Details" />
			<main>
				{loading ? (
					<Loader />
				) : (
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
						{genreLoading ? (
							<Loader />
						) : (
							<div className="genre">
								Genre:
								{genreDetails.map((genre) => (
									<span key={genre.id}>{genre.name}</span>
								))}
							</div>
						)}
						<p className="movie-description">{details.overview}</p>
						{details.id !== 1 && (
							<Link to={`/movie/${details.id - 1}`}>
								<button className="previous-button">
									Previous
								</button>
							</Link>
						)}
						<Link to={`/movie/${details.id + 1}`}>
							<button className="next-movie">Next</button>
						</Link>

						{console.log(details)}
					</div>
				)}
			</main>
		</div>
	)
}

export default DetailsPage

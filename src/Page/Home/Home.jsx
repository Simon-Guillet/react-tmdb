import React, { useState, useEffect } from "react"
import getMovies from "../../api/Movies"
import Header from "../../Component/Header/Header"
import Card from "../../Component/Card/Card"
import Loader from "../../Component/Loader/Loader"

// Style imports
import "./Home.css"

const HomePage = () => {
	const [movies, setMovies] = useState([])
	const [error, setError] = useState(null)
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(true)
		getMovies(page)
			.then((data) => {
				if (data.error) {
					setError(data.error)
				} else {
					setMovies(data)
				}
			})
			.finally(() => {
				setLoading(false)
			})
	}, [page])

	const next = () => {
		if (movies["hydra:view"]["hydra:next"]) {
			setPage(page + 1)
		}
	}

	const previous = () => {
		if (movies["hydra:view"]["hydra:previous"]) {
			setPage(page - 1)
		}
	}

	if (error) {
		return <div>There was an error: {error.message}</div>
	}

	return (
		<div className="home-page">
			<Header title="Home page" />
			<main>
				<div className="content">
					{loading ? (
						<Loader />
					) : (
						<div className="list-movies">
							{movies["hydra:member"] &&
								movies["hydra:member"].map((movie) => (
									<Card
										media={movie}
										type="movie"
										key={movie.id}
									/>
								))}
						</div>
					)}
					{console.log(movies)}
					<div className="pagination">
						<button onClick={previous}>Previous</button>
						<div className="page-number">{page}</div>
						<button onClick={next}>Next</button>
					</div>
				</div>
			</main>
		</div>
	)
}

export default HomePage

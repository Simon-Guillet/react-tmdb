import React, { useState, useEffect } from "react"
import getMovies from "../../api/Movies"
import Header from "../../Component/Header/Header"

// Style imports
import "./Home.css"

const HomePage = () => {
	const [movies, setMovies] = useState([])
	const [error, setError] = useState(null)
	const [page, setPage] = useState(1)

	useEffect(() => {
		getMovies(page).then((data) => {
			if (data.error) {
				setError(data.error)
			} else {
				setMovies(data)
			}
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
					<div className="list-movies">
						{movies["hydra:member"] &&
							movies["hydra:member"].map((movie) => (
								<a href={"/movie/" + movie.id} key={movie.id}>
									<div className="movie-card" key={movie.id}>
										<div className="movie-image">
											<img
												src={
													"https://image.tmdb.org/t/p/w500" +
													movie.poster_path
												}
												alt={movie.title}
											/>
										</div>
										<div className="movie-title">
											{movie.title}
										</div>
									</div>
								</a>
							))}
					</div>
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

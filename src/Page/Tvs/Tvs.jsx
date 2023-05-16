import React, { useState, useEffect } from "react"
import getSeries from "../../api/Series"
import Header from "../../Component/Header/Header"

// Style imports
import "./Tvs.css"

const TvsPage = () => {
	const [series, setSeries] = useState([])
	const [error, setError] = useState(null)
	const [page, setPage] = useState(1)

	useEffect(() => {
		getSeries(page).then((data) => {
			if (data.error) {
				setError(data.error)
			} else {
				setSeries(data)
			}
		})
	}, [page])

	const next = () => {
		if (series["hydra:view"]["hydra:next"]) {
			setPage(page + 1)
		}
	}

	const previous = () => {
		if (series["hydra:view"]["hydra:previous"]) {
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
						{series["hydra:member"] &&
							series["hydra:member"].map((serie) => (
								<a href={"/serie/" + serie.id} key={serie.id}>
									<div className="movie-card" key={serie.id}>
										<div className="movie-image">
											<img
												src={
													"https://image.tmdb.org/t/p/w500" +
													serie.poster_path
												}
												alt={serie.title}
											/>
										</div>
										<div className="movie-title">
											{serie.name}
										</div>
									</div>
								</a>
							))}
					</div>
					{console.log(series)}
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

export default TvsPage

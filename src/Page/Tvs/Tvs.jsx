import React, { useState, useEffect } from "react"
import getSeries from "../../api/Series"
import Header from "../../Component/Header/Header"
import Card from "../../Component/Card/Card"
import Loader from "../../Component/Loader/Loader"

// Style imports
import "./Tvs.css"

const TvsPage = () => {
	const [series, setSeries] = useState([])
	const [error, setError] = useState(null)
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(true)
		getSeries(page)
			.then((data) => {
				if (data.error) {
					setError(data.error)
				} else {
					setSeries(data)
				}
			})
			.finally(() => {
				setLoading(false)
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
			<Header title="Tv Shows" />
			<main>
				<div className="content">
					{loading ? (
						<Loader />
					) : (
						<div className="list-movies">
							{series["hydra:member"] &&
								series["hydra:member"].map((serie) => (
									<Card
										media={serie}
										type="serie"
										key={serie.id}
									/>
								))}
						</div>
					)}
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

import React from "react"
import { Link } from "react-router-dom"

// Style imports
import "./Card.css"

const Card = (props) => {
	return (
		<Link
			to={"/" + props.type + "/" + props.media.id}
			className="movie-link"
		>
			<div className="movie-card" key={props.media.id}>
				<div className="movie-image">
					<img
						src={
							"https://image.tmdb.org/t/p/w500" +
							props.media.poster_path
						}
						alt={props.media.title}
					/>
				</div>
				<div className="movie-title">
					{props.media.title || props.media.name}
				</div>
			</div>
		</Link>
	)
}

export default Card

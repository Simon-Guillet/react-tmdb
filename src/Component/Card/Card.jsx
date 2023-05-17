import React from "react"

// Style imports
import "./Card.css"

const Card = (props) => {
	return (
		<a
			href={"/" + props.type + "/" + props.media.id}
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
				<div className="movie-title">{props.media.title}</div>
			</div>
		</a>
	)
}

export default Card

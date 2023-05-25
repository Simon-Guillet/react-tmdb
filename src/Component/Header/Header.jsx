import React from "react"
import { Link, useNavigate } from "react-router-dom"

// Style imports
import "./Header.css"

const Header = (props) => {
	const navigate = useNavigate()

	const handleLogout = () => {
		localStorage.removeItem("user")
		localStorage.removeItem("token")
		navigate("/login")
	}

	return (
		<header>
			<div className="title">{props.title}</div>
			<ul className="nav">
				<li>
					<Link
						to="/"
						aria-current={
							props.title === "Home page" ||
							props.title === "Movie Details"
								? "page"
								: undefined
						}
					>
						Movies
					</Link>
				</li>
				<li>
					<Link
						to="/tvs"
						aria-current={
							props.title === "Tv Shows" ||
							props.title === "Series Details"
								? "page"
								: undefined
						}
					>
						Tv Shows
					</Link>
				</li>
			</ul>
			<button onClick={handleLogout}>Logout</button>
		</header>
	)
}

export default Header

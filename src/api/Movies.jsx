const getMovies = (page) => {
	const API_KEY = localStorage.getItem("token")
	return fetch("https://127.0.0.1:8000/api/movies?page=" + page, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		Authorization: `Bearer ${API_KEY}`,
	})
		.then((response) => response.json())
		.then((data) => {
			return data
		})
		.catch((error) => {
			console.log(error)
		})
}

export default getMovies

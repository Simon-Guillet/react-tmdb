const getDetails = (id) => {
	const token = localStorage.getItem("token")
	return fetch("https://127.0.0.1:8000/api/movies/" + id, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		Authorization: `Bearer ${token}`,
	})
		.then((response) => response.json())
		.then((data) => {
			return data
		})
		.catch((error) => {
			console.log(error)
		})
}

export default getDetails

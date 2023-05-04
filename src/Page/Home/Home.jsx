import React, { useState, useEffect } from 'react';
import getMovies from '../../api/Movies';

// Style imports
import './Home.css';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getMovies().then((data) => {
            if (data.error) {
                setError(data.error);
            } else {
                setMovies(data);
            }
        });
    }, []);

    if (error) {
        return <div>There was an error: {error.message}</div>;
    }

    return(
        <div className="home-page">
            <header>
                <div className="title">Home page</div>
                <button onClick={() => {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }}>
                    Logout
                </button>
            </header>
            <main>
                <div className="content">
                    <div className="content-title">Content</div>

                    <div className="list-movies">
                        {movies["hydra:member"] && movies["hydra:member"].map((movie) => (
                            <a href={"/movie/" + movie.id} key={movie.id}>
                                <div className="movie-card" key={movie.id}>
                                    <div className="movie-image">
                                        <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title} />
                                    </div>
                                    <div className="movie-title">{movie.title}</div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default HomePage;
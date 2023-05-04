

const HomePage = () => {


    return(
        <div>
            Home page
            <button onClick={() => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.location.href = '/login';
            }}>
                Logout
            </button>
        </div>
    )
}

export default HomePage;
import '../css/Home.css';
import { useState, useEffect } from "react";
import { listPhotos, searchPhotos } from "../services/api";
import PhotoCard from "../components/PhotoCard";

function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const data = await listPhotos();
                setPhotos(data);
            } catch (error) {
                console.log(error);
                setError("Failed to load photos...");
            } finally {
                setLoading(false);
            }
        }
        fetchPhotos();
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        alert('Search button clicked: ' + searchQuery);
    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text" 
                    placeholder="Search for photos..." 
                    className="search-input" 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>
            {error && <div className='error-message'>{error}</div>}
            {loading ? (
                <div className='loading'>Loading...</div>
            ) : (
                <div className="photos-grid">
                    {photos.map(
                        (photo) => 
                            photo.title.toLowerCase().startsWith(searchQuery.toLocaleLowerCase()) && (
                                <PhotoCard key={photo.id} photo={photo} />
                            )
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;

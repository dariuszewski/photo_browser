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

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery || loading) {
            return;
        }
        setLoading(true);
        try {
            const data = await searchPhotos(searchQuery);
            setPhotos(data);
            setError(null);
            console.log(data);
        } catch (error) {
            console.log(error);
            setError("Failed to search photos...");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    id="search-input"
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
                            <PhotoCard key={photo.id} photo={photo} />
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;

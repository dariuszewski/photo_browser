import '../css/Home.css';
import { useState } from "react";
import PhotoCard from "../components/PhotoCard";

function Home() {
    const [searchQuery, setSearchQuery] = useState('');

    const photos = [
        { id: 1, url: 'https://media.krakow.travel/photos/20627/xxl.jpg', title: 'Florianska', upload_date: '2025-01-21' },
        { id: 2, url: 'https://media.krakow.travel/photos/20627/xxl.jpg', title: 'Florenska', upload_date: '2025-01-21' },
        { id: 3, url: 'https://media.krakow.travel/photos/20627/xxl.jpg', title: 'Brancka', upload_date: '2025-01-21' },
        { id: 4, url: 'https://media.krakow.travel/photos/20627/xxl.jpg', title: 'Warszawska', upload_date: '2025-01-21' },
        { id: 5, url: 'https://media.krakow.travel/photos/20627/xxl.jpg', title: 'Wawelska', upload_date: '2025-01-21' }
    ];

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
            <div className="photos-grid">
                {photos.map(
                    (photo) => 
                        photo.title.toLowerCase().startsWith(searchQuery.toLocaleLowerCase()) && (
                            <PhotoCard key={photo.id} photo={photo} />
                        )
                )}
            </div>
        </div>
    );
}

export default Home;

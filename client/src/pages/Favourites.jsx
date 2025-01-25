import '../css/Favourites.css';
import { usePhotoContext } from '../contexts/PhotoContext';
import PhotoCard from '../components/PhotoCard';

function Favourites() {
    const { favourites } = usePhotoContext();

    if (favourites.length > 0) {
        return (
            <div className="favourites">
                <h2>Your favourites</h2>
                <div className="photos-grid">
                    {favourites.map(photo => (
                        <PhotoCard key={photo.id} photo={photo} />
                    ))}
                </div>
            </div>
        )
    } else {
        return (
            <div className="favourites-empty">
                <h2>No favourite movies yet</h2>
                <p>Start adding favourites and they will appear here...</p>
            </div>
        );
    }
}

export default Favourites;
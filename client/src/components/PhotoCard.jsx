import '../css/PhotoCard.css';
import { usePhotoContext } from '../contexts/PhotoContext';

function PhotoCard({ photo }) {
    const {isFavourite, addFavourite, removeFavourite} = usePhotoContext();
    const favourite = isFavourite(photo.id);

    function onFavouriteClick(e) {
        e.preventDefault();
        if (favourite) {
            removeFavourite(photo.id);
        } else {
            addFavourite(photo);
        }
    }

    return (
        <div className="photo-card">
            <div className="photo-poster">
                <img src={photo.url} alt={photo.title} />
                <div className="photo-overlay">
                    <button 
                        className={`favourite-btn ${favourite ? "active" : ""}`}
                        onClick={onFavouriteClick}
                    >
                        ♥
                    </button>
                </div>
            </div>
            <div className="photo-info">
                <h3>{photo.title}</h3>
                <p>{photo.upload_date}</p>
            </div>
        </div>
    )
}

export default PhotoCard;
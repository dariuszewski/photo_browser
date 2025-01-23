import '../css/PhotoCard.css';


function PhotoCard({ photo }) {

    function onFavouriteClick() {
        alert('Favourite button clicked');
    }

    return (
        <div className="photo-card">
            <div className="photo-poster">
                <img src={photo.url} alt={photo.title} />
                <div className="photo-overlay">
                    <button className="favourite-btn" onClick={onFavouriteClick}>
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
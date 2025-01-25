import { createContext, useState, useContext, useEffect } from "react";

const PhotoContext = createContext();

export const usePhotoContext = () => useContext(PhotoContext);

export const PhotoProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const storedFavs = localStorage.getItem('favourites');
        if (storedFavs) {
            setFavourites(JSON.parse(storedFavs));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }, [favourites]);

    const addFavourite = (photo) => {
        setFavourites(prev => [...prev, photo]);
    };

    const removeFavourite = (photoId) => {
        setFavourites(prev => prev.filter(photo => photo.id !== photoId));
    };

    const isFavourite = (photoId) => {
        return favourites.some(photo => photo.id === photoId);
    };

    const value = {
        favourites,
        addFavourite,
        removeFavourite,
        isFavourite 
    };

    return (
        <PhotoContext.Provider value={value}>
            {children}
        </PhotoContext.Provider>
    );
};
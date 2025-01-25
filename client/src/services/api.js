const LIST_PHOTOS_URL = 'https://list-photos-mtrbtntfeq-uc.a.run.app';
const SEARCH_PHOTOS_URL = 'https://search-photos-mtrbtntfeq-uc.a.run.app';


export const listPhotos = async () => {
    const response = await fetch(LIST_PHOTOS_URL, { mode: 'no-cors' });
    const data = await response.json();
    return data;
}

export const searchPhotos = async (query) => {
    const response = await fetch(`${SEARCH_PHOTOS_URL}?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data;
}

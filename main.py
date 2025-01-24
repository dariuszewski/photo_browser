"""
upload, list, download files from firebase storage
"""
from datetime import datetime
import firebase_admin
from firebase_admin import credentials, storage, firestore


credentials = credentials.Certificate('firebaseKey.json')
firebase_admin.initialize_app(credentials, {
    'storageBucket': 'photobrowser-85780.firebasestorage.app'
})
bucket = storage.bucket()


def upload_photo(filename: str, blob_name: str ) -> None:
    blob = bucket.blob(blob_name)
    blob.upload_from_filename(filename)
    print(f'File uploaded to Cloud Storage: {filename}')
    url = f"https://storage.googleapis.com/v0/b/photobrowser-85780.appspot.com/o/{blob_name}?alt=media"
    return url

def add_metadata(title: str, url: str) -> None:
    db = firestore.client()
    doc_ref = db.collection('photoMetadata').document()
    doc_ref.set({
        'title': title,
        'upload_date': datetime.now().strftime('%Y-%m-%d'),
        'url': url
    })
    print('Metadata added to Firestore')

def list_photo_metadata() -> list:
    db = firestore.client()
    docs = db.collection('photoMetadata').stream()
    photos_metadata = [
        {'id': doc.id, **doc.to_dict()}
        for doc in docs
    ]
    return photos_metadata

def search_photos(query: str) -> list:
    db = firestore.client()
    docs = db.collection('photoMetadata').stream()
    photos_metadata = [
        {'id': doc.id, **doc.to_dict()}
        for doc in docs
        if query in doc.to_dict().get("title", "").lower()
    ]
    return photos_metadata


if __name__ == '__main__':
    import os
    photo_list = os.listdir('photos')
    for photo in photo_list:
        url = upload_photo(f'photos/{photo}', photo)
        add_metadata(photo.split('.')[0], url)
    photos = list_photo_metadata() 
    print(photos)
    filtered_photos = search_photos('wa')
    print(filtered_photos)


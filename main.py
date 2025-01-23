"""
upload, list, download files from firebase storage
"""
import uuid
import firebase_admin
from firebase_admin import credentials, storage


credentials = credentials.Certificate('firebaseKey.json')
firebase_admin.initialize_app(credentials, {
    'storageBucket': 'photobrowser-85780.firebasestorage.app'
})
bucket = storage.bucket()


def upload_photo(filename: str, blob_name: str ) -> None:
    blob = bucket.blob(blob_name)
    blob.upload_from_filename(filename)
    print(f'File uploaded to Cloud Storage: {filename}')

def list_files() -> None:
    blobs = bucket.list_blobs()
    for blob in blobs:
        print(blob.name)

def download_photo(blob_name: str, destination_filename: str) -> None:
    blob = bucket.blob(blob_name)
    blob.download_to_filename(destination_filename)
    print('File downloaded from Cloud Storage')


if __name__ == '__main__':
    import os
    photo_list = os.listdir('photos')
    for photo in photo_list:
        upload_photo(f'photos/{photo}', photo)
    list_files()
    download_photo('florianska.jpg', 'downloaded.jpg')

# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from flask import jsonify
from firebase_functions import https_fn
from firebase_admin import initialize_app, firestore

initialize_app()

@https_fn.on_request()
def list_photos(req: https_fn.Request) -> https_fn.Response:
    db = firestore.client()
    docs = db.collection('photoMetadata').stream()
    photos_metadata = [
        {'id': doc.id, **doc.to_dict()} 
        for doc in docs
    ]
    return jsonify(photos_metadata)

@https_fn.on_request()
def search_photos(req: https_fn.Request) -> https_fn.Response:
    query = req.args.get('query', '').lower()
    db = firestore.client()
    docs = db.collection('photoMetadata').stream()
    photos_metadata = [
        {'id': doc.id, **doc.to_dict()}
        for doc in docs
        if query in doc.to_dict().get("title", "").lower()
    ]
    return jsonify(photos_metadata)


import cv2
from PIL import Image
import os
from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
from datetime import date
from datetime import datetime
import numpy as np
from sklearn.neighbors import KNeighborsClassifier
import pandas as pd
import joblib
import threading
import base64
import io
app = Flask(__name__)
CORS(app)


def totalreg():
    return len(os.listdir('static/faces'))

def extract_faces(img):
        face_detector = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        face_points = face_detector.detectMultiScale(gray, 1.2, 5, minSize=(20, 20))
        return face_points
    

def identify_face(facearray):
    model = joblib.load('static/face_recognition_model.pkl')
    return model.predict(facearray)


def train_model():
    faces = []
    labels = []
    userlist = os.listdir('static/faces')
    for user in userlist:
        for imgname in os.listdir(f'static/faces/{user}'):
            print(f"Gathering {imgname} from {user} ")
            img = cv2.imread(f'static/faces/{user}/{imgname}')
            resized_face = cv2.resize(img, (50, 50))
            faces.append(resized_face.ravel())
            labels.append(user)
    faces = np.array(faces)
    knn = KNeighborsClassifier(n_neighbors=5)
    knn.fit(faces, labels)
    joblib.dump(knn, 'static/face_recognition_model.pkl')
    print("model saved")


@app.route('/mark', methods=['POST'])
def mark_attendance():
    if not os.path.isdir("temp"):
        os.mkdir("temp")

    res = request.json
    image = res['image']
    with open("temp/image.jpg", 'wb') as img_file:
        img_file.write(base64.b64decode(image))
        
    image = cv2.imread("temp/image.jpg")

    face = cv2.resize(image, (50, 50))
    identified_person = identify_face(face.reshape(1, -1))[0]
    return  jsonify({"name":identified_person})


@app.route('/register', methods=['POST'])
def register():
    res = request.json
    image = res['images'][0]
    name = res['name']
    if not name:
        return jsonify({"status":"missing args"}), 401
    
    userimagefolder = 'static/faces/'+name
    if not os.path.isdir(userimagefolder):
        os.makedirs(userimagefolder)

    for index in range(10):
        b64_decode = base64.b64decode(image)

        with open(os.path.join(f"static/faces/{name}",f"{index}.jpg"),'wb') as wrtie_image:
            wrtie_image.write(b64_decode)
        


    threading.Thread(target=train_model).start()

    return jsonify({"status":"register completed!"})


if __name__ == '__main__':
    app.run(debug=True)

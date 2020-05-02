import os
from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
from flask_pymongo import PyMongo
import numpy as np
import tensorflow.compat.v1 as tf
import cv2
import pdb


app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/covid_net"
app.config['UPLOAD_FOLDER'] = 'uploads'

mongo = PyMongo(app)
IMAGE_FOLDER = 'images'

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    mongo.db.chat.insert_one(data)
    return jsonify({'message':'Inserted Response'}), 200


@app.route("/api/upload_and_predict", methods=["POST"])
def upload_and_predict():
    if 'file' not in request.files:
        return jsonify({'message': 'No file uploaded'}), 422
    f = request.files['file']
    if f:
        os.makedirs(os.path.join(app.config['UPLOAD_FOLDER'], IMAGE_FOLDER),
                    exist_ok=True)
        fname = secure_filename(f.filename)
        f.save(os.path.join(app.config['UPLOAD_FOLDER'], IMAGE_FOLDER, fname))
        result = predict(os.path.join(app.config['UPLOAD_FOLDER'], IMAGE_FOLDER, fname))
        return jsonify({
            'message': 'File uploaded successfully',
            'result': result
        }), 200
    return jsonify({'message': 'An error occurred'}), 422


def predict(filename):
    metaname = "model.meta"
    ckptname = "model-8485"
    tf.disable_eager_execution()

    mapping = {'normal': 0, 'pneumonia': 1, 'COVID-19': 2}
    inv_mapping = {0: 'normal', 1: 'pneumonia', 2: 'COVID-19'}

    sess = tf.Session()
    tf.get_default_graph()
    saver = tf.train.import_meta_graph(metaname)
    saver.restore(sess, ckptname)

    graph = tf.get_default_graph()

    image_tensor = graph.get_tensor_by_name("input_1:0")
    pred_tensor = graph.get_tensor_by_name("dense_3/Softmax:0")
    # forward to processing page
    x = cv2.imread(filename)
    h, w, c = x.shape
    x = x[int(h/6):, :]
    x = cv2.resize(x, (224, 224))
    x = x.astype('float32') / 255.0
    pred = sess.run(pred_tensor,
                    feed_dict={image_tensor: np.expand_dims(x, axis=0)})

    return str(pred[:, 2][0])

@app.route('/')
@app.route('/xray')
@app.route('/questionnare')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run()

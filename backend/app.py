from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin
from analyser import analyse

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/analyse',methods=['POST'])
@cross_origin()
def predict_api():
    query = request.get_json(force=True)
    result = analyse(query['stock'])
    positive = result["Percentage"]["positive"]
    neutral = result["Percentage"]["neutral"]
    negative = result["Percentage"]["negative"]
    sentiment = {'positive': positive, 'neutral': neutral, 'negative': negative}
    return jsonify(sentiment)

if __name__ == "__main__":
    app.run(debug=True)
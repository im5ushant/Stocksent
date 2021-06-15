from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin
from analyser import analyse
from news import getNews
from tweepy_streamer_tweets import get_related_tweets

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/get-news',methods=['POST'])
@cross_origin()
def get_news_api():
    query = request.get_json(force=True)
    news = getNews(query['stock'])
    return {"content": news}

@app.route('/get-tweets',methods=['POST'])
@cross_origin()
def get_tweets_api():
    query = request.get_json(force=True)
    tweets = get_related_tweets(query['stock'])
    return {"content": tweets}

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
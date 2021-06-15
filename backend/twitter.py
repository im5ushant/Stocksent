import tweepy
import twitter_credentials
from textblob import TextBlob
from nltk.sentiment.vader import SentimentIntensityAnalyzer

# import twitter_credentials
auth = tweepy.OAuthHandler(twitter_credentials.CONSUMER_KEY, twitter_credentials.CONSUMER_SECRET)
auth.set_access_token(twitter_credentials.ACCESS_TOKEN,
                      twitter_credentials.ACCESS_TOKEN_SECRET)
api = tweepy.API(auth, wait_on_rate_limit=True)


def percentage(part, whole):
    return 100 * float(part)/float(whole)

# Extracting Tweets
def get_related_tweets(text_query): 
    keyword = text_query
    noOfTweet = 50
    print("Connecting to Twitter...")
    tweets = tweepy.Cursor(api.search, q=keyword).items(noOfTweet)
    print("Connected to Tweepy...")
    print("Fetching Tweets...")
    # positive = 0
    # negative = 0
    # neutral = 0
    # polarity = 0
    tweet_list = []
    # neutral_list = []
    # negative_list = []
    # positive_list = []
    for tweet in tweets:
        tweet_list.append(tweet.text)
        # analysis = TextBlob(tweet.text)
        # score = SentimentIntensityAnalyzer().polarity_scores(tweet.text)
        # neg = score['neg']
        # neu = score['neu']
        # pos = score['pos']
        # comp = score["compound"]
        # polarity += analysis.sentiment.polarity

        # if neg > pos:
        #     negative_list.append(tweet.text)
        #     negative += 1
        # elif pos > neg:
        #     positive_list.append(tweet.text)
        #     positive += 1

        # elif pos == neg:
        #     neutral_list.append(tweet.text)
        #     neutral += 1

    # positive = percentage(positive, noOfTweet)
    # negative = percentage(negative, noOfTweet)
    # neutral = percentage(neutral, noOfTweet)
    # polarity = percentage(polarity, noOfTweet)
    # positive = format(positive, ".1f")
    # negative = format(negative, ".1f")
    # neutral = format(neutral, ".1f")
    print(tweet_list)
    return tweet_list
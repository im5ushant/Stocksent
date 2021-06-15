import tweepy
import pandas as pd
import numpy as np
import nltk
import re
import string
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
    # print("Connecting to Twitter...")
    tweets = tweepy.Cursor(api.search, q=keyword).items(noOfTweet)
    # print("Connected to Tweepy...")
    # print("Fetching Tweets...")
    tweet_list = []
    for tweet in tweets:
        tweet_list.append(tweet.text)
    print(tweet_list)

    # tw_list = pd.DataFrame(tweet_list)
    # tw_list.append(news_df, ignore_index=True)

    # tw_list.drop_duplicates(inplace = True)

    #Cleaning Text (RT, Punctuation etc)
    #Creating new dataframe and new features
    # tw_list["text"] = tw_list[0]
    # print(tw_list)
    # tw_res = tw_list[0].to-numpy()
    # print(tw_res)
    return tweet_list
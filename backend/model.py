# Import Libraries
import twitter_credentials
from IPython.core.interactiveshell import InteractiveShell
from textblob import TextBlob
import tweepy
import pandas as pd
import numpy as np
import nltk
import re
import string
from GoogleNews import GoogleNews
from bs4 import BeautifulSoup
import matplotlib.pyplot as plt
from nltk.sentiment.vader import SentimentIntensityAnalyzer
nltk.download('vader_lexicon')

auth = tweepy.OAuthHandler(twitter_credentials.CONSUMER_KEY, twitter_credentials.CONSUMER_SECRET)
auth.set_access_token(twitter_credentials.ACCESS_TOKEN,twitter_credentials.ACCESS_TOKEN_SECRET)
api = tweepy.API(auth, wait_on_rate_limit=True)


def percentage(part, whole):
    return 100 * float(part)/float(whole)


keyword = input("Please enter keyword or hashtag to search: ")
noOfTweet = 50
print('28')
tweets = tweepy.Cursor(api.search, q=keyword).items(noOfTweet)
positive = 0
negative = 0
neutral = 0
polarity = 0
tweet_list = []
neutral_list = []
negative_list = []
positive_list = []
for tweet in tweets:
    tweet_list.append(tweet.text)
    analysis = TextBlob(tweet.text)
    score = SentimentIntensityAnalyzer().polarity_scores(tweet.text)
    neg = score['neg']
    neu = score['neu']
    pos = score['pos']
    comp = score["compound"]
    polarity += analysis.sentiment.polarity

    if neg > pos:
        negative_list.append(tweet.text)
        negative += 1
    elif pos > neg:
        positive_list.append(tweet.text)
        positive += 1

    elif pos == neg:
        neutral_list.append(tweet.text)
        neutral += 1
print(38)

# Fetching google news data

googlenews = GoogleNews(start='02/01/2021', end='04/30/2021')
googlenews.search(keyword)
result = googlenews.result()
news_df = pd.DataFrame(result)
for i in range(2, 20):
    googlenews.getpage(i)
    result = googlenews.result()
    news_df = pd.DataFrame(result)
list = []
print(news_df.head(20))

print(news_df.head(20))

news_df.drop('img', inplace=True, axis=1)
news_df.drop('link', inplace=True, axis=1)
news_df.drop('desc', inplace=True, axis=1)
news_df.drop('datetime', inplace=True, axis=1)
news_df.drop('date', inplace=True, axis=1)
news_df.drop('media', inplace=True, axis=1)
news_df.rename(columns={"title": 0}, inplace=True)
news_df.head(200)

tw_list = pd.DataFrame(tweet_list)
print(tw_list.head(20))
tw_list.append(news_df, ignore_index=True)

tw_list.drop_duplicates(inplace=True)

# Cleaning Text (RT, Punctuation etc)
# Creating new dataframe and new features
tw_list["text"] = tw_list[0]
# Removing RT, Punctuation etc
def remove_rt(x): return re.sub('RT @\w+: ', " ", x)
def rt(x): return re.sub("[^a-zA-Z]", " ", x)


tw_list["text"] = tw_list.text.map(remove_rt).map(rt)
tw_list["text"] = tw_list.text.str.lower()
print(tw_list.head(20))

# Calculating Negative, Positive, Neutral and Compound values
tw_list[['polarity', 'subjectivity']] = tw_list['text'].apply(lambda Text: pd.Series(TextBlob(Text).sentiment))
for index, row in tw_list['text'].iteritems():
    score = SentimentIntensityAnalyzer().polarity_scores(row)
    neg = score['neg']
    neu = score['neu']
    pos = score['pos']
    comp = score['compound']
    if neg > pos:
        tw_list.loc[index, 'sentiment'] = "negative"
    elif pos > neg:
        tw_list.loc[index, 'sentiment'] = "positive"
    else:
        tw_list.loc[index, 'sentiment'] = "neutral"
        tw_list.loc[index, 'neg'] = neg
        tw_list.loc[index, 'neu'] = neu
        tw_list.loc[index, 'pos'] = pos
        tw_list.loc[index, 'compound'] = comp
tw_list.head(20)

# Creating new data frames for all sentiments (positive, negative and neutral)
tw_list_negative = tw_list[tw_list["sentiment"] == "negative"]
tw_list_positive = tw_list[tw_list["sentiment"] == "positive"]
tw_list_neutral = tw_list[tw_list["sentiment"] == "neutral"]


def count_values_in_column(data, feature):
    total = data.loc[:, feature].value_counts(dropna=False)
    percentage = round(data.loc[:, feature].value_counts(
        dropna=False, normalize=True)*100, 2)
    return pd.concat([total, percentage], axis=1, keys=['Total', 'Percentage'])


# Count_values for sentiment
count_values_in_column(tw_list, "sentiment")

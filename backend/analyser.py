

# Import Libraries
from textblob import TextBlob
from twitter import get_related_tweets
import pandas as pd
import numpy as np
import nltk
import re
import string
import pickle
from GoogleNews import GoogleNews
from bs4 import BeautifulSoup
import matplotlib.pyplot as plt
from nltk.sentiment.vader import SentimentIntensityAnalyzer

# nltk.download('vader_lexicon')
from IPython.core.interactiveshell import InteractiveShell

# Fetching google news data
def analyse(text_query):
    googlenews=GoogleNews(start='02/01/2021',end='05/12/2021')
    googlenews.search(text_query)
    result=googlenews.result()
    news_df=pd.DataFrame(result)
    for i in range(2,5):
        googlenews.getpage(i)
        result=googlenews.result()
        news_df=pd.DataFrame(result)
    list=[]

    news_df.drop('img', inplace=True, axis=1)
    news_df.drop('link', inplace=True, axis=1)
    news_df.drop('desc', inplace=True, axis=1)
    news_df.drop('datetime', inplace=True, axis=1)
    news_df.drop('date', inplace=True, axis=1)
    news_df.drop('media', inplace=True, axis=1)
    news_df.rename(columns={"title": 0}, inplace= True)


    tweet_list = get_related_tweets(text_query)

    tw_list = pd.DataFrame(tweet_list)
    tw_list.append(news_df, ignore_index=True)

    tw_list.drop_duplicates(inplace = True)

    #Cleaning Text (RT, Punctuation etc)
    #Creating new dataframe and new features
    tw_list["text"] = tw_list[0]

    #Removing RT, Punctuation etc
    remove_rt = lambda x: re.sub('RT @\w+: '," ",x)
    rt = lambda x: re.sub("[^a-zA-Z]", " ",x)
    tw_list["text"] = tw_list.text.map(remove_rt).map(rt)
    tw_list["text"] = tw_list.text.str.lower()
    # print(tw_list.head(50))

    #Calculating Negative, Positive, Neutral and Compound values
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

    #Creating new data frames for all sentiments (positive, negative and neutral)
    tw_list_negative = tw_list[tw_list["sentiment"]=="negative"]
    tw_list_positive = tw_list[tw_list["sentiment"]=="positive"]
    tw_list_neutral = tw_list[tw_list["sentiment"]=="neutral"]

    def count_values_in_column(data,feature):
        total=data.loc[:,feature].value_counts(dropna=False)
        percentage=round(data.loc[:,feature].value_counts(dropna=False,normalize=True)*100,2)
        return pd.concat([total,percentage],axis=1,keys=['Total','Percentage'])
    #Count_values for sentiment
    final_result = count_values_in_column(tw_list,"sentiment")
    # print(count_values_in_column(tw_list,"sentiment"))
    return final_result
    # print(final_result["Percentage"]["positive"])


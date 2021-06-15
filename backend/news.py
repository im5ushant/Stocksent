from GoogleNews import GoogleNews
import pandas as pd

def getNews(text_query):
    print("Starting analyser...")
    googlenews=GoogleNews(start='02/01/2021',end='06/12/2021')
    print("Connecting to Google news...")
    googlenews.search(text_query)
    print("Fetching News...")
    result=googlenews.result()
    news_df=pd.DataFrame(result)
    for i in range(2,5):
        googlenews.getpage(i)
        result=googlenews.result()
        news_df=pd.DataFrame(result)
    list=[]

    # print(news_df)
    print("Removing Unwanted Content...")

    # news_df.drop('img', inplace=True, axis=1)
    # news_df.drop('link', inplace=True, axis=1)
    # news_df.drop('desc', inplace=True, axis=1)
    # news_df.drop('datetime', inplace=True, axis=1)
    # news_df.drop('date', inplace=True, axis=1)
    # news_df.drop('media', inplace=True, axis=1)
    # news_df.rename(columns={"title": 0}, inplace= True)

    print(news_df["title"])
    news_list = []
    for i in news_df["title"]:
        news_list.append(i)
    print(news_list)
    return news_list
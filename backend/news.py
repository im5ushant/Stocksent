# from GoogleNews import GoogleNews

# Fetching google news data

# googlenews=GoogleNews(start='02/01/2021',end='05/12/2021')
# googlenews.search(keyword)
# result=googlenews.result()
# news_df=pd.DataFrame(result)
# for i in range(2,10):
#     googlenews.getpage(i)
#     result=googlenews.result()
#     news_df=pd.DataFrame(result)
# list=[]

# news_df.drop('img', inplace=True, axis=1)
# news_df.drop('link', inplace=True, axis=1)
# news_df.drop('desc', inplace=True, axis=1)
# news_df.drop('datetime', inplace=True, axis=1)
# news_df.drop('date', inplace=True, axis=1)
# news_df.drop('media', inplace=True, axis=1)
# news_df.rename(columns={"title": 0}, inplace= True)

# return news_dfd
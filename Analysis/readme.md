# Description of Files 

The project is split into three main notebooks, each comprising a single step of the process. 

## Scraper

This notebook includes code to scrape the Pushshift API for Reddit posts for a given subreddit, asynchonrology scrape comments given a set of post IDs using the reddit API, as well as a small script to get a list of patches and their descriptions from the Fortnite website. This file expects a `env.sh` file in order to access the Reddit API. The file should haves keys `USER` and `PSWD`, where the values are the log in for a Reddit account with API access. Lastly, the scraping script saves its state in a local JSON file so that the script can stop and start when there is much data to scrape. 

## Cleaning

Standard cleaning methods were applied such as dropping unnecesarry columns, changing data types, and dropping rows with null values (also posts that were marked as delete). nltk was used to tokenize and lemmatize the words. Gensim was used to extract bi-grams and tri-grams. 

## Topic Modeling 

Gensim's LDAModel is used to extract topics in this notebook. The notebook first finds which form of Reddit data results in the best topic models. For example, I compared treating a reddit post's title, selftext, and comments as a single document against just the title. Ultimately, I used the title and selftext of each post. Next, I used the elbow method to choose the number of topics resulting in the highest coherence score. Lastly, the data was filtered by patch and subreddit to create topic models for each subset of the data. Once models were created, the resulting json files were saved for the web app visualization. 
# Understanding Fortnite's Reddit Community 
After subscribing to both r/FortNiteBR and r/FortniteCompetitive for a better part of a year, I wanted to explore quantifying the differences I and many other subreddit members noticed. This repo covers the entire lifecycle of the data project including gathering, cleaning, and modeling the data (found in /Analysis). The repo also include the source for a [React app](http://jeromecohen.github.io/fortnite) that presents Latent Dirichlet Allocation visualizations depeneding on the subreddit and Fortnite patch the user specifies. 

To read more about my process - check out my [Medium blog post](https://medium.com/@JCohen998/understanding-fortnites-reddit-community-using-unsupervised-topic-modeling-30f984f58129?sk=80f12a3caec291f37c8dcaa0c95bacfa)!

# Future Exploration
The next step for this project is to analyze the sentiment of user's posts in both subreddits over time. As I used to be a casual player, I expect to see certain dips and spikes as a result of controversial or well-received patches. The casual and competitive communities also respond differently to patches. I've already seen this phenomenon from the topic models and expect it to continue with sentiment. I plan on calculating and graphing a handful of key metrics for each subreddit such as number of posts per day, top contributors, average sentiment per day, polarity per day. 

Finally, if one wanted to implement a machine learning approach, the post ids could be used to scrape the score (upvotes - downvotes) of each post and frame a regression problem. How large of an effect do title / selftext have on vote count? Can we gain a better understanding of the community on the whole based on what factors effect the number of upvotes? 

## Data 
All data for this project was scraped from Pushshift, Reddit, and the Fortnite website with original scripts. The data can be found in a S3 bucket which I link to below: 

[Posts](https://fortnite-lda-vis.s3.amazonaws.com/posts.csv) 
[Comments](https://fortnite-lda-vis.s3.amazonaws.com/comments.csv) 
[Patches](https://fortnite-lda-vis.s3.amazonaws.com/patches.csv)


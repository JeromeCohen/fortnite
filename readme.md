# Understanding Fortnite's Reddit Community 
After subscribing to both r/FortNiteBR and r/FortniteCompetitive for a better part of a year, I wanted to explore quantifying the differences I and many other subreddit members noticed. This repo covers the entire lifecycle of the data project including gathering, cleaning, and modeling the data (found in /Analysis). The repo also include the source for a [React app](http://jeromecohen.github.io/fortnite) that presents Latent Dirichlet Allocation visualizations depeneding on the subreddit and Fortnite patch the user specifies. 

# Future Exploration
The next step for this project is to analyze the sentiment of user's posts in both subreddits over time. As I used to be a casual player, I expect to see certain dips and spikes as a result of controversial or well-received patches. The casual and competitive communities also respond differently to patches. I've already seen this phenomenon from the topic models and expect it to continue with sentiment. Finally, I plan on calculating and graphing a handful of key metrics for each subreddit such as number of posts per day, top contributors, average sentiment per day, polarity per day 

## Data 
All data for this project was scraped from Pushshift, Reddit, and the Fortnite website with original scripts. The data can be found in a S3 bucket which I link to below: 

[Posts](https://fortnite-lda-vis.s3.amazonaws.com/posts.csv) 
[Comments](https://fortnite-lda-vis.s3.amazonaws.com/comments.csv) 
[Patches](https://fortnite-lda-vis.s3.amazonaws.com/patches.csv)



const patches = require('./data/patches.json');
const subreddit = ['r/FortNiteBR', 'r/FortniteCompetitive']

const getJsonURL = (subreddit, patch) => {
    //all json files are hosted in a s3 bucket 
    const baseURL = 'https://fortnite-lda-vis.s3.amazonaws.com/'

    //remove r/ from subreddit
    subreddit = subreddit.replace('r/', '');

    console.log(patch); 
    //append strings to form final url
    return baseURL + subreddit + '_' + patch + '.json';
}


export const test404 = () => {
    subreddit.map(sr => {
        Object.values(patches).map(patch => {
            let url = getJsonURL(sr, patch);
            fetch(url)
                .then(response => response.json())
                .then((jsonData) => {
                    console.log('');
                })
                .catch((error) => {
                    console.log(subreddit + ' ' +   patch );
                })

        })
    });
}

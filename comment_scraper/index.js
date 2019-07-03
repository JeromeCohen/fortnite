'use strict';
const snoowrap = require('snoowrap');
const fs = require('fs');
const csv = require('csv-parser');


const BATCH_SIZE = 50;

const r = new snoowrap({
  userAgent: 'ChangeMeClient/0.1 by YourUsername',
  clientId: 'NELdoctFZ_tqVw',
  clientSecret: 'JgSF4SwJdrCsnuOSggxFoMIbzsA',
  username: 'jeromeco',
  password: 'Skicat12'
});

const batchComments = async articles => {
  let promises = articles.map(async id => {
    return r.getSubmission(id).comments.map(comment => {
      console.log(id);
      return comment;
    });
  })
  const results =  await Promise.all(promises);

  //should refactor
  let comments = []
  results.map(posts => {
    posts.map(comment => {
      comments.push(comment);
    })
  })
  return comments;
}

const getAllComments = ids => {
  let rawdata = fs.readFileSync('checkpoint.json');
  let checkpoint = JSON.parse(rawdata);

  fs.readFile('fortniteCompComments.json', (err, data) => {
    if (err) throw err;
    let comments = JSON.parse(data);
    console.log(checkpoint)


    let x = checkpoint.batch_no;
    let y = Math.ceil(ids.length / BATCH_SIZE)

    for (let i = x; i < y; i++) {
      let lo = i * BATCH_SIZE
      let hi = Math.min(ids.length, BATCH_SIZE * (i + 1))
      let batch = ids.slice(lo, hi);

      let results = batchComments(batch).then(result => {
        console.log(result);
        commentData = JSON.stringify(comments)
        fs.writeFile('fortniteCompComments.json', commentData, (err) => {
          if (err) throw err;
          console.log('Data written to file');

          checkpoint.batch_no++;
          let data = JSON.stringify(checkpoint);
          fs.writeFileSync('checkpoint.json', data);
         });
      });
    }
  });
}

// const main = (file) => {
//   let ids = []
//   fs.createReadStream(file)
//     .pipe(csv())
//     .on('data', (row) => {
//       ids.push(row['c5vyi4'])
//     })
//     .on('end', () => {
//       console.log('CSV file successfully processed');
//       console.log('Length is ' + ids.length);
//       getAllComments(ids);
//     });
// }

getAllComments('9jb0y4')

main('comp_ids.csv');

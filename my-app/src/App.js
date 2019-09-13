import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Select } from '@material-ui/core';
import MenuItems from './items'
import PyLDAvis from './lda'
const startingVis = require('./data/FortNiteBR_163');
const patches = require('./data/patches.json');


function App() {
  const classes = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(3),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    button: {
      marginLeft: 200000
    }
  }));

  const [values, setValues] = React.useState({
    subreddit: 'r/FortNiteBR',
    patch: '1.1',
    newSubreddit: 'r/FortNiteBR',
    newPatch: '1.6.3',
    data: startingVis
  });


  function getJsonURL(subreddit, patch) {
    //all json files are hosted in a s3 bucket 
    const baseURL = 'https://fortnite-lda-vis.s3.amazonaws.com/'

    //reformat patch string to how it will look in the url (remove '.' and whitespace)
    patch = patch.replace(' ', '');
    patch = patch.replace('.', '');

    //remove r/ from subreddit
    subreddit = subreddit.replace('r/', '');

    //append strings to form final url
    return baseURL + subreddit + '_' + patch + '.json';
  }

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  function addVis(event) {
    let url = getJsonURL(values.subreddit, values.patch);

    fetch(url)
      .then(response => response.json())
      .then((jsonData) => {
        // jsonData is parsed json object received from url
        setValues(oldValues => ({
          ...oldValues,
          newSubreddit: values.subreddit,
          newPatch: values.patch,
          data: jsonData,
        }));
        console.log(values.data)
      })
      .catch((error) => {
        // handle your errors here
        console.error(error)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>LDA Visualizations</h1>
      </header>
      <div className="container">
        <form className='form' autoComplete="off">
          <div className="labels">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="subreddit-auto-width">Subreddit</InputLabel>
              <Select
                value={values.subreddit}
                onChange={handleChange}
                inputProps={{
                  name: 'subreddit',
                  id: 'subreddit-auto-width',
                }}
                autoWidth
              >
                <MenuItem value={'r/FortNiteBR'}>r/FortNiteBR</MenuItem>
                <MenuItem value={'r/FortniteCompetitive'}>r/FortniteCompetitive</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="patch-auto-width">Patch</InputLabel>
              <MenuItems
                patchValues={patches}
                onChange={handleChange}
                patch={values.patch}>
              </MenuItems>
            </FormControl>
            </div>
            <Button variant="contained" color="primary" className={classes.button} onClick={addVis}>
              Change
        </Button>
        </form>
          <PyLDAvis
            id='LDAvis1'
            subreddit={values.newSubreddit}
            patch={values.newPatch}
            data={values.data}>
          </PyLDAvis>
      </div>
      </div>
      );
    }
    export default App;
    
    

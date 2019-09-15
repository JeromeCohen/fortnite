import React from 'react';

//Styles
import './App.css';
import { makeStyles } from '@material-ui/core/styles';

//Material UI Componets 
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Select } from '@material-ui/core';

//Custom Components
import MenuItems from './items'
import PyLDAvis from './lda'

//json files for setting 
const startingVis = require('./data/FortNiteBR_');
const patches = require('./data/patches');


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
    patch: 'All',
    newSubreddit: 'r/FortNiteBR',
    newPatch: 'All',
    data: startingVis,
  });

  const [patchLabels, setPatchLabels] = React.useState(patches['r/FortNiteBR']);

  function getJsonURL(subreddit, patch) {
    //all json files are hosted in a s3 bucket 
    const baseURL = 'https://fortnite-lda-vis.s3.amazonaws.com/'

    //remove r/ from subreddit
    subreddit = subreddit.replace('r/', '');

    // //remove whitespace and . 
    patch = patch.replace(/\s+/g, '');
    patch = patch.replace(/\.+/g, '');

    //append strings to form final url
    return baseURL + subreddit + '_' + patch + '.json';
  }

  function handleChange(event) {

    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));

    if (event.target.name === 'subreddit') {
      setPatchLabels(patches[event.target.value]);
    }
  }

  //
  function addVis(event) {
    let url = getJsonURL(values.subreddit, values.patch);
    console.log(url);

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
        alert('Oops! The file for this patch does not exist');
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Topic Model (LDA) Visualizations on Fortnite Discussions by Subreddit and Patch</h1>
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
                subreddit={values.newSubreddit}
                patchValues={patchLabels}
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



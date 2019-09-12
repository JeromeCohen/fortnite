
import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Select } from '@material-ui/core';
import Test from './data/FortNiteBR_1.6.3.json'
import PyLDAvis from './lda.js'

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
      margin: theme.spacing(3),
    }
  }));

  const [values, setValues] = React.useState({
    subreddit: 'r/FortNiteBR',
    patch: '1.1',
    name: 'subreddit',
  });

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  function addVis(event) {
    console.log('TODO: Add Vis');
    console.log(Test);
  }

  function removeVis(event) {
    console.log('TODO: remove Vis');
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>LDA Visualizations</h1>
      </header>
        <form className={classes.root} autoComplete="off">
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
            <Select
              value={values.patch}
              onChange={handleChange}
              inputProps={{
                name: 'patch',
                id: 'patch-auto-width',
              }}
              autoWidth
            >
              <MenuItem value={'1.1'}>1.1</MenuItem>
              <MenuItem value={'1.2'}>1.2</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" className={classes.button} onClick={addVis}>
            Add
      </Button>
          <Button variant="outlined" color="secondary" className={classes.button} onClick={removeVis}>
            Remove
      </Button>
        </form>
        <PyLDAvis data={Test}></PyLDAvis>
    </div>
  );
}

export default App;



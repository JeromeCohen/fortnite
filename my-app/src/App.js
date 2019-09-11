
import React from 'react';
import logo from './logo.svg';
// import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Select } from '@material-ui/core';

function App() {
  const classes = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>LDA Visualizations</h1>
      </header>
      <body>
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
        </form>
      </body>
    </div>
  );
}

export default App;



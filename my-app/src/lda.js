import React from 'react';
import PropTypes from 'prop-types';
import { LDAvis } from './ldavisv1';


// global LDAvis - https://github.com/antisrdy/pyldavis_dash/blob/master/src/components/pyLDAvis.react.js
class LDA extends React.Component {
  constructor (props) {
    super(props);
    this.load = this.load.bind(this);
    this.update = this.update.bind(this);
    this.onRef = this.onRef.bind(this);
  
  }

  load (url, callback) {
    var s = document.createElement('script');
    s.src = url;
    s.async = true;
    s.onreadystatechange = s.onload = callback;
    // s.onerror = function(){console.warn('failed to load library ' + url);};
    document.getElementsByTagName('head')[0].appendChild(s);
  }

  componentWillMount () {
    this.id = `ldavis_elt_${Math.round(Math.random() * 1e20)}`;
    this.update()
  }

  update (props = this.props) {
    // Make sure the div is present
    if (document.getElementById(this.id) && typeof(LDAvis) !== 'undefined') {
      new LDAvis('#' + this.id, props.data);
    }

  }

  componentWillUpdateProps (nextProps) {
    this.update(nextProps);
  }

  onRef () {
    this.update();
  }

  render () {
    return <div id={this.id} ref={this.onRef} />
  }
}

export default class PyLDAvis extends React.Component {
  render() {
    const {id, data, subreddit, patch} = this.props
    return (
      <div>
        <h1>{subreddit}</h1>

        <h2>{patch}</h2>
        <div id={id}>
          <LDA data={data} />
        </div>
      </div>
    );
  }
}

PyLDAvis.propTypes = {
  id: PropTypes.string,
  data: PropTypes.object
}

// ReactDOM.render(
//   <Hello name="World" />,
//   document.getElementById('container')
// );
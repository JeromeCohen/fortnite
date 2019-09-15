// global LDAvis - https://github.com/antisrdy/pyldavis_dash/blob/master/src/components/pyLDAvis.react.js
// List of changes: 
// Imported d3 and ldavis.js into project, so removed loading libraries from CDNs 
// Added props for subreedit and patch 

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { LDAvis } from './ldavis';

class LDA extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.onRef = this.onRef.bind(this);
  }

  
  UNSAFE_componentWillMount() {
    this.id = `ldavis_elt_${Math.round(Math.random() * 1e20)}`;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data !== this.props.data
  }

  update(props = this.props) {
    // Make sure the div is present
    if (document.getElementById(this.id) && typeof (LDAvis) !== 'undefined') {
      const parent = document.getElementById(this.id);

      //HACKY - IDEALLY refactor ldavis.js into components
      if (true) {
        while (parent.hasChildNodes()) {
          parent.removeChild(parent.lastChild);
        }
        new LDAvis('#' + this.id, props.data);
      }
    }
  }

  onRef() {
    this.update();
  }

  render() {
    this.update();
    return <div id={this.id} ref={this.onRef} />
  }
}

export default function PyLDAvis(props) {
  const { id, data, subreddit, patch } = props;
  const [vis, setVis] = useState(data);

  if (vis !== data) {
    setVis(data);
  }

  return (
    <div>
      <h1>{subreddit}</h1>
      <h2>{patch}</h2>
      <div id={id}>
        <LDA data={vis} />
      </div>
    </div>
  );
}


PyLDAvis.propTypes = {
  id: PropTypes.string,
  data: PropTypes.object
}
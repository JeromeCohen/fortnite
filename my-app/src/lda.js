// global LDAvis - https://github.com/antisrdy/pyldavis_dash/blob/master/src/components/pyLDAvis.react.js
// List of changes: 
// Imported d3 and ldavis.js into project, so removed loading libraries from CDNs 
// Added props for subreedit and patch 

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { LDAvis } from './ldavis';

// function LDA(props) {
//   function componentWillMount() {
//     this.id = `ldavis_elt_${Math.round(Math.random() * 1e20)}`;
//     this.update()
//   }

//   const [core, setCore] = React.useState(props.data); 
//   console.log('pussy', props.data);

//   function update(props = this.props) {
//     // Make sure the div is present
//     if (document.getElementById(this.id) && typeof (LDAvis) !== 'undefined') {
//       new LDAvis('#' + this.id, props.data);
//     }
//   }

//   static getDerivedStateFromProps(props, state) {
//       return {
//         isScrollingDown: props.currentRow > state.lastRow,
//         lastRow: props.currentRow,
//       };

//   function onRef() {
//     this.update();
//   }

//   return (
//     <div>
//       {`${props.data['mdsDat']['x']}`}
//     </div>
//   )
// }

//-------------------------

// class LDA extends React.Component {
//   constructor(props) {
//     super(props);
//     this.update = this.update.bind(this);
//     this.onRef = this.onRef.bind(this);
//     // this.getDerivedStateFromProps = this.getDerivedStateFromProps.bind(this); 
//     this.state = {
//       data: this.props.data,
//       id: 'test'
//     }
//   }

//   componentWillMount() {
//     console.log('mounting');
//     return this.update();

//   }

//   // static getDerivedStateFromProps(props, state) {
//   //   new LDAvis('#' + state.id, props.data);
//   //   return {
//   //     data: this.props.data,
//   //     id: state.id
//   //   };
//   // }

//   update(props = this.props) {
//     // Make sure the div is present
//     if (document.getElementById(this.id) && typeof (LDAvis) !== 'undefined') {
//       new LDAvis('#' + this.state.id, props.data);
//     } else {
//       console.log('where is this shit');
//     }
//   }

//   onRef() {
//     this.update();
//   }

//   render() {
//     return <div id={this.state.id} ref={this.onRef} />
//   }
// }

class LDA extends React.Component {
  constructor (props) {
    super(props);
    this.update = this.update.bind(this);
    this.onRef = this.onRef.bind(this);
  }

  componentWillMount () {
    this.id = `ldavis_elt_${Math.round(Math.random() * 1e20)}`;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data !== this.props.data
  }

  update (props = this.props) {
    // Make sure the div is present
    if (document.getElementById(this.id) && typeof(LDAvis) !== 'undefined') {
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

  onRef () {
    this.update();
  }

  render () {
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
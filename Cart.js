import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
        addedItems: []
    };
  }

//   componentDidUpdate (prevProps, prevState) {
//     if (prevProps.data !== this.props.data) {
//         if (this.state.addedItems !== this.props.data) {
//             this.setState({addedItems: this.props.data});
//         }
//     }
//   }

  getInfo (element) {
      console.log("reached here", element);
      return "hi";
  }

  render() {
    return (
        this.props.display
    )
  }
  
}

export default Cart;
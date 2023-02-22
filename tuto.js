import React, { Component } from "https://cdn.skypack.dev/react@17.0.1";

class MonComposant extends Component {
  constructor(props) {
    super(props);
    this.state = { compteur: 0 };
    console.log('MonComposant est construit.');
  }

  componentDidMount() {
    console.log('MonComposant est monté.');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('MonComposant a été mis à jour.');
  }

  componentWillUnmount() {
    console.log('MonComposant est démonté.');
  }

  handleClick = () => {
    this.setState({ compteur: this.state.compteur + 1 });
  }

  render() {
    console.log('MonComposant est rendu.');
    return (
      <div>
        <p>Compteur : {this.state.compteur}</p>
        <button onClick={this.handleClick}>Incrémenter</button>
      </div>
    );
  }
}

export default MonComposant;

import axios from "axios";
import React, { Component } from "react";
import Table from "./Table";
import Form from "./Form";

class App extends Component {
  state = {
    characters: [],
  };

  removeCharacter = (index) => {
    const { characters } = this.state;

    this.setState({
      characters: characters.filter((character, i) => {
        return i !== index;
      }),
    });
  };

  handleSubmit = (character) => {
    this.makePostCall(character).then(callResult => {
      if (callResult === true) {
        this.setState({
          characters: [...this.state.characters, character],
        });
      }
    });
  };

  makePostCall(character) {
    return axios.post('http://localhost:5000/users', character)
      .then(response => {
        console.log(response);
        return (response.status === 200);
      })
      .catch(error => {
        console.log(error);
        return false;
      });
  }

  componentDidMount() {
    axios.get("http://localhost:5000/users").then((res) => {
      const characters = res.data.users_list;
      this.setState({ characters });
    }).catch((error) => {
      // Not handling the error. Just logging into the console.
      console.log(error);
    });
  }

  render() {
    const { characters } = this.state;

    return (
      <div className="container">
        <Table
          characterData={characters}
          removeCharacter={this.removeCharacter}
        />
        <Form handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default App;

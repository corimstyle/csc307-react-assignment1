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

    this.makeDeleteCall(characters[index]).then(callResult => {
      if (callResult !== false) {
        this.setState({
          characters: characters.filter((character, i) => {
            return i !== index;
          }),
        });
      }
    });
  };

  makeDeleteCall(character) {
    return axios.delete('http://localhost:5000/users', { data: {
        id: character.id,
        name: character.name,
        job: character.job
      }})
      .then(response => {
        console.log(response);
        return (response.status === 204);
      })
      .catch(error => {
        console.log(error);
        return false;
      });
  }

  handleSubmit = (character) => {
    this.makePostCall(character).then(callResult => {
      if (callResult !== false) {
        this.setState({
          characters: [...this.state.characters, callResult.data],
        });
      }
    });
  };

  makePostCall(character) {
    return axios.post('http://localhost:5000/users', character)
      .then(response => {
        console.log(response);
        return response;
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

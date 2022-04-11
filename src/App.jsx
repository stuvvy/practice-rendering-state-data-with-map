import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading';

class App extends Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      users: [],
      loading: false
    };
    // bind
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getUsers() {
    this.setState({
      loading: true
    })
    axios('https://api.randomuser.me/?nat=US&results=5')
    .then(response => this.setState({
      users: [...this.state.users, ...response.data.results],
      loading: false
    })
  );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getUsers();
    console.log('More users loaded');
  }


  UNSAFE_componentWillMount() {
    this.getUsers();
}

  render() {

    const {loading, users} = this.state

    return (
      <div className="App" 
      style={{textAlign : 'center', justifyContent : 'center'}}>
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="Load New Users" 
          style={{padding: '6px', backgroundColor : 'lightcyan'}} />
        </form>
          <hr />
        
        {!loading ?
            users.map(user => (
              <div key={user.id.value}>
                <h3 style={{ marginBottom: '0', color: 'green', fontSize: '2rem'}}>{user.name.first}</h3>
                <p>Email : {user.email}</p>
                <p>Location : {user.location.state}</p>
                <img src={user.picture.large} />
                <hr />
              </div>
            )) 
          : <Loading message="Loading..."/>}
        </div>
      );
    }
}

export default App;
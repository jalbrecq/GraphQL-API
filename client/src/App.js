import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// components
import BikeList from './components/BikeList';
import AddBike from './components/AddBike';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render(){
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1 className="text-center">Just A Bike List</h1>
          <AddBike />
          <BikeList />
        </div>
      </ApolloProvider>
    );
  };
};

export default App;

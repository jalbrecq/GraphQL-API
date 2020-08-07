import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// components
import BikeList from './components/BikeList';
import AddBike from './components/AddBike';

// apollo client setup
const client = new ApolloClient({
  uri: 'https://the-bike-list.herokuapp.com/graphql'
});

class App extends Component {
  render(){
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1 className="text-center p-2" >Just A Bike List</h1>
          <AddBike />
          <BikeList />
        </div>
      </ApolloProvider>
    );
  };
};

export default App;

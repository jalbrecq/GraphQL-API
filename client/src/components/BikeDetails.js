import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {getBikeQuery} from '../queries/queries';

import Spinner from 'react-bootstrap/Spinner'

class BikeDetails extends Component {

    displayBikeDetails(){
      var { bike, loading, error } = this.props.data
      if(loading && !error){
        return (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading bike details...</span>
          </Spinner>
        )
      }
      else if(error){
        return(<div>Error while loading the bike details...</div>)
      }
      if(bike){
        return(
          <div>
            <h2>{ bike.title }</h2>
            <p>Type: { bike.type }</p>
            <p>Creator: { bike.creator.name }</p>
            <p>All bikes by this creator:</p>
            <ul className="other-bikes">
              { bike.creator.bikes.map(item => {
                return(<li key={item.id}>{ item.title }</li>)
              })}
            </ul>
          </div>
        );
      }
    }

    render() {
      return (
        <div id="bike-details">
          {this.displayBikeDetails()}
        </div>
      );
    };
};

export default graphql(getBikeQuery, {
    options: (props)=>{
        return {
            variables: {
               id: props.bikeId
            }
        }
    }
})(BikeDetails);
  
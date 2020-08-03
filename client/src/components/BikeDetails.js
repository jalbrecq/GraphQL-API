import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {getBikeQuery} from '../queries/queries';

class BikeDetails extends Component {

    displayBikeDetails(){
        
    }

    render() {
      return (
        <div id="bike-details">
          
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
  
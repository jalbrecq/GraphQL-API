import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {getBikeQuery} from '../queries/queries';

class BikeDetails extends Component {

    displayBikeDetails(){
      var { bike, loading, error } = this.props.data
      if(loading && !error){
        return(<div>Loading bike details...</div>)
      }
      else if(error){
        return(<div>Error while loading the bike details...</div>)
      }
      if(bike){
        return(
          <div>
            <h2>{ bike.title }</h2>
            <p>{ bike.type }</p>
            <p>{ bike.creator.name }</p>
            <p>All bikes by this creator:</p>
            <ul className="other-bikes">
              { bike.creator.bikes.map(item => {
                return <li key={item.id}>{ item.title }</li>
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
  
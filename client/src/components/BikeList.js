import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {getBikesQuery} from '../queries/queries';
import BikeDetails from './BikeDetails';

class BikeList extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: null
    };
  };

  displayBikes(){
    var data = this.props.data
    if(data.loading){
      return(<div>Loading bikes...</div>);
    }
    else{
      return data.bikes.map(bike => {
        return <li
          key={bike.id}
          onClick={(e) => {this.setState({selected: bike.id})}}>
            {bike.title}
          </li>
      });
    }
  }

  render() {
    return (
      <div id="bike-list">
        <ul id="bike-list">
          { this.displayBikes() }
        </ul>
        <BikeDetails bikeId={this.state.selected}/>
      </div>
    );
  };
};

export default graphql(getBikesQuery)(BikeList);

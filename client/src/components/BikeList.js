import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// queries
import {getBikesQuery} from '../queries/queries';

// components
import BikeDetails from './BikeDetails';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

class BikeList extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: null,
      error: false
    };
  };

  displayBikes(){
    var data = this.props.data
    if(data.loading && !data.error){
      return(
        <div>Loading bikes...</div>
      );
    }
    else if(data.error){
      if(!this.state.error){
        this.setState({error: true});
      }
      return(
        <div>Error while loading bikes...</div>
      );
    }
    else{
      return data.bikes.map((bike, index) => {
        return(
          <Card key={bike.id} onClick={(e) => {this.setState({selected: bike.id})}}>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                {bike.title}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={index}>
              <Card.Body>
                <BikeDetails bikeId={this.state.selected}/>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        )
      });
    }
  }

  render() {
    return (
      <div id="bike-list">
        <h2>All the bike we have got</h2>
        <Accordion id="bike-list">
          { this.displayBikes() }
        </Accordion>
      </div>
    );
  };
};

export default graphql(getBikesQuery)(BikeList);

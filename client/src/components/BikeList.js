import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// queries
import {getBikesQuery} from '../queries/queries';

// components
import RemoveBike from './RemoveBike';
import BikeDetails from './BikeDetails';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';

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
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading bikes...</span>
        </Spinner>
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
      if(data.bikes.length > 0){
        return data.bikes.map((bike, index) => {
          return(
            <Card key={index}>
              <Card.Header>
                <div className="row justify-content-between">
                  <Accordion.Toggle className="col-2" as={Button} variant="light" eventKey={bike.id} onClick={(e) => {this.setState({selected: bike.id});}}>
                    {bike.title}
                  </Accordion.Toggle>
                  <RemoveBike className="col-2" bikeId={bike.id}/>
                </div>
              </Card.Header>
              <Accordion.Collapse eventKey={bike.id}>
                <Card.Body>
                  <BikeDetails bikeId={this.state.selected}/>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          )
        });
      }
      else{
        return (
        <Card>
          <Card.Header>We don't have any bike yet. Feel free to add one!</Card.Header>
        </Card>
        )
      }
    }
  }

  render() {
    return (
      <Container id="bike-list" className="p-2">
        <h2>All the bikes we have</h2>
        <Accordion id="bike-list">
          { this.displayBikes() }
        </Accordion>
      </Container>
    );
  };
};

export default graphql(getBikesQuery)(BikeList);

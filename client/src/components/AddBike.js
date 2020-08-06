import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {flowRight} from 'lodash';

// queries
import {getCreatorsQuery, addBikeMutation, getBikesQuery} from '../queries/queries';

// components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

class AddBike extends Component {
  constructor(props){
    super(props);
    this.state={
      title: '',
      type: '',
      creatorId: '',
      error: false,
      validated: false
    };
  };

  displayCreators(){
    var data = this.props.getCreatorsQuery;
    if (data.loading && !data.error){
      return(<option>Loading creators...</option>);
    }
    else if(data.error) {
      if(!this.state.error){
        this.setState({error: true});
      }
      return null;
    }
    else {
      return data.creators.map(creator => {
        return(
          <option key={creator.id} value={creator.id}>
            {creator.name}
          </option>
        );
      });
    }
  };

  submitForm(e){
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    else{
      e.preventDefault();
      this.props.addBikeMutation({
        variables: {
          title: this.state.title,
          type: this.state.type,
          creatorId: this.state.creatorId
        },
        refetchQueries: [{query: getBikesQuery}]
      });
    }
    this.setState({validated: true});
    form.reset();
  };

  render() {
    return (
      <Container id="addBike" className="p-2">
        <h2>Add a bike</h2>
        <Form noValidate validated={this.state.validated} id="add-bike-form" onSubmit={this.submitForm.bind(this)}>
          <Form.Group>
            <Form.Label htmlFor="formTitle">Bike title:</Form.Label>
            <Form.Control
              value={this.state.title}
              onChange={(e) => this.setState({title: e.target.value})}
              required
              id="formTitle"
              type="text"
              placeholder="Enter the bike's title"
            />
            <Form.Control.Feedback>Good choice!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Please provide a title.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="formType">Type:</Form.Label>
            <Form.Control
              value={this.state.type}
              onChange={(e) => this.setState({type: e.target.value})}
              required
              id="formType"
              type="text"
              placeholder="Enter the bike's type"
            />
            <Form.Control.Feedback>My favourite type of bike</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">I think you forgot the type.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="formCreator" >Select a creator:</Form.Label>
            <Form.Control
              value={this.state.creatorId}
              onChange={(e) => this.setState({creatorId: e.target.value})}
              required
              id="formCreator"
              as="select"
            >
              <option value=''>--- Choose a creator --- </option>
              {this.displayCreators()}
            </Form.Control>
            <Form.Control.Feedback>Nice choice!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Each bike has a creator, please choose one</Form.Control.Feedback>
          </Form.Group>
          <Button className="mr-1" variant="dark" type="submit">Add bike</Button>
        </Form>
      </Container>
    );
  };
};

export default flowRight([
  graphql(getCreatorsQuery, {name: "getCreatorsQuery"}),
  graphql(addBikeMutation, {name: "addBikeMutation"})
])(AddBike);

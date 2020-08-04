import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {flowRight} from 'lodash';
import {getCreatorsQuery, addBikeMutation, getBikesQuery} from '../queries/queries';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class AddBike extends Component {
  constructor(props){
    super(props);
    this.state={
      title: '',
      type: '',
      creatorId: '',
      error: false
    };
  };

  displayCreators(){
    var data = this.props.getCreatorsQuery;
    if (data.loading && !data.error){
      return(<option>Loading creators...</option>)
    }
    else if(data.error) {
      if(!this.state.error){
        this.setState({error: true});
      }
      return(<option>Error while loading creators</option>)
    }
    else {
      return data.creators.map(creator => {
        return(
          <option key={creator.id} value={creator.id}>
            {creator.name}
          </option>
        )
      });
    }
  };

  submitForm(e){
    e.preventDefault();
    this.props.addBikeMutation({
      variables: {
        title: this.state.title,
        type: this.state.type,
        creatorId: this.state.creatorId
      },
      refetchQueries: [{query: getBikesQuery}]
    });
  };

  render() {
    return (
      <div id="addBike">
        <h2>Add a bike</h2>
        <Form inline id="add-bike" onSubmit={this.submitForm.bind(this)}>
          <Form.Group onChange={(e) => this.setState({title: e.target.value})}>
            <Form.Label className="my-1 mr-1" htmlFor="formTitle">Bike title:</Form.Label>
            <Form.Control className="my-1 mr-sm-3" id="formTitle" type="text" placeholder="Enter the bike's title" />
          </Form.Group>

          <Form.Group onChange={(e) => this.setState({type: e.target.value})}>
            <Form.Label className="my-1 mr-1" htmlFor="formType">Type:</Form.Label>
            <Form.Control className="my-1 mr-sm-3" id="formType" type="text" placeholder="Enter the bike's type" />
          </Form.Group>

          <Form.Group onChange={(e) => this.setState({creatorId: e.target.value})}>
            <Form.Label className="my-1 mr-1" htmlFor="formCreator" >Select a creator:</Form.Label>
            <Form.Control className="my-1 mr-sm-3 " id="formCreator" as="select">
              {this.displayCreators()}
            </Form.Control>
            {this.state.error ? <Form.Control.Feedback type="error">Error while loading the creators</Form.Control.Feedback> : null}
          </Form.Group>
          <Button className="my-1" variant="dark" type="submit">+</Button>
        </Form>
      </div>
    );
  };
};

export default flowRight([
  graphql(getCreatorsQuery, {name: "getCreatorsQuery"}),
  graphql(addBikeMutation, {name: "addBikeMutation"})
])(AddBike);

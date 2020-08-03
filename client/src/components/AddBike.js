import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {flowRight} from 'lodash';
import {getCreatorsQuery, addBikeMutation, getBikesQuery} from '../queries/queries';

class AddBike extends Component {
  constructor(props){
    super(props);
    this.state={
      title: '',
      type: '',
      creatorId: ''
    };
  };

  displayCreators(){
    var data = this.props.getCreatorsQuery;
    if (data.loading){
      return(<option>Loading creators...</option>)
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
      <form id="add-bike" onSubmit={this.submitForm.bind(this)}>

        <div className="field">
          <label>Bike title:</label>
          <input type="text" onChange={(e) => this.setState({title: e.target.value})}/>
        </div>

        <div className="field">
          <label>Type:</label>
          <input type="text" onChange={(e) => this.setState({type: e.target.value})}/>
        </div>

        <div className="field">
          <label>Creator:</label>
          <select onChange={(e) => this.setState({creatorId: e.target.value})}>
            <option value="">Select creator</option>
            {this.displayCreators()}
          </select>
        </div>

        <button>+</button>

      </form>
    );
  };
};

export default flowRight([
  graphql(getCreatorsQuery, {name: "getCreatorsQuery"}),
  graphql(addBikeMutation, {name: "addBikeMutation"})
])(AddBike);

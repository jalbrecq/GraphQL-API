import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import {removeBikeMutation, getBikesQuery} from '../queries/queries';

import Button from 'react-bootstrap/Button';

export class RemoveBike extends Component {

    removeBike(e){
        e.preventDefault();
        this.props.removeBikeMutation({
          variables: {
            id: this.props.bikeId
          },
          refetchQueries: [{query: getBikesQuery}]
        });
    }

    render() {
        return (
            <Button type="button" variant="danger" onClick={this.removeBike.bind(this)}>Remove</Button>
        );
    };
};

export default graphql(removeBikeMutation, {name: "removeBikeMutation"})(RemoveBike);
  
import { gql } from 'apollo-boost';

const getBikesQuery = gql`
{
  bikes{
    id
    title
  }
}
`;

const getCreatorsQuery = gql`
  {
    creators{
      id
      name
    }
  }
`;

const addBikeMutation = gql`
  mutation($title: String!, $type: String!, $creatorId: ID!) {
    addBike(title: $title, type: $type, creatorId: $creatorId) {
      id
      title
    }
  }
`;

const getBikeQuery = gql`
 query($id: ID){
   bike(id: $id){
     id
     title
     type
     creator{
       id
       name
       age
       bikes{
         id
         title
       }
     }
   }
 }`

export {getBikesQuery, getCreatorsQuery, addBikeMutation, getBikeQuery};
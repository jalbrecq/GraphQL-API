const { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } = require('graphql');
const _ = require('lodash');

// dummy data
var bikes = [
    {title: 'The unbelievable bike', type: 'VTT', id: '1', creatorId:'1'},
    {title: 'The first real vtt', type: 'VTT', id: '2', creatorId:'2'},
    {title: 'The very big bike', type: 'ROUTE', id: '3', creatorId:'3'},
    {title: 'The third real vtt', type: 'VTT', id: '4', creatorId:'2'},
    {title: 'The very small bike', type: 'ROUTE', id: '5', creatorId:'2'},
    {title: 'The second real vtt', type: 'VTT', id: '6', creatorId:'3'},
    {title: 'The believable bike', type: 'ROUTE', id: '7', creatorId:'3'}
]

var creators = [
    {name: 'Patrick Rothfuss', age: '44', id: '1'},
    {name: 'Brandon Sanderson', age: '42', id: '2'},
    {name: 'Terry Pratchett', age: '66', id: '3'}
]

const BikeType = new GraphQLObjectType({
    name: 'Bike',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        type: { type: GraphQLString },
        creator: {
            type: CreatorType,
            resolve(parent, args){
                // Code to get data from db/other source
                return _.find(creators, {id: parent.creatorId});
            }
        }
    })
});

const CreatorType = new GraphQLObjectType({
    name: 'Creator',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        bikes: {
            type: GraphQLList(BikeType),
            resolve(parent, args){
                // Code to get data from db/other source
                return _.filter(bikes, {creatorId: parent.id})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        bike: {
            type: BikeType,
            args: {id : {type: GraphQLID}},
            resolve(parent, args){
                // Code to get data from db/other source
                return _.find(bikes, {id:args.id});
            }
        },
        creator: {
            type: CreatorType,
            args: {id : {type: GraphQLID}},
            resolve(parent, args){
                // Code to get data from db/other source
                return _.find(creators, {id:args.id});
            }
        },
        bikes: {
            type: GraphQLList(BikeType),
            resolve(parent, args){
                // Code to get data from db/other source
                return bikes
            }
        },
        creators: {
            type: GraphQLList(CreatorType),
            resolve(parent, args){
                // Code to get data from db/other source
                return creators
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

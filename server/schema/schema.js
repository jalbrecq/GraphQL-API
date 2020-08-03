const { 
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
 } = require('graphql');

const _ = require('lodash');
const Bike = require('../models/bike');
const Creator = require('../models/creator');

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
                return Creator.findById(parent.creatorId)
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
                return Bike.find({creatorId: parent.id})
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
                return Bike.findById(args.id)
            }
        },
        creator: {
            type: CreatorType,
            args: {id : {type: GraphQLID}},
            resolve(parent, args){
                // Code to get data from db/other source
                return Creator.findById(args.id)
            }
        },
        bikes: {
            type: GraphQLList(BikeType),
            resolve(parent, args){
                // Code to get data from db/other source
                return Bike.find({})
            }
        },
        creators: {
            type: GraphQLList(CreatorType),
            resolve(parent, args){
                // Code to get data from db/other source
                return Creator.find({})
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCreator: {
            type: CreatorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                let creator = new Creator({
                    name: args.name,
                    age: args.age
                });
                return creator.save()
            }
        },
        addBike: {
            type: BikeType,
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)},
                type: {type:new GraphQLNonNull(GraphQLString)},
                creatorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let bike = new Bike({
                    title: args.title,
                    type: args.type,
                    creatorId: args.creatorId
                });
                return bike.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

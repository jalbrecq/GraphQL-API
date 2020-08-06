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
            description: 'Return a bike by id',
            args: {id : {type: GraphQLID}},
            resolve(parent, args){
                // Code to get data from db/other source
                return Bike.findById(args.id)
            }
        },
        creator: {
            type: CreatorType,
            description: 'Return a creator by id',
            args: {id : {type: GraphQLID}},
            resolve(parent, args){
                // Code to get data from db/other source
                return Creator.findById(args.id)
            }
        },
        bikes: {
            type: GraphQLList(BikeType),
            description: 'Return all the bikes',
            resolve(parent, args){
                // Code to get data from db/other source
                return Bike.find({})
            }
        },
        creators: {
            type: GraphQLList(CreatorType),
            description: 'Return all the creators',
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
            description: 'Add a creator to the data base',
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
            description: 'Add a bike to the data base',
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
        },
        removeBike: {
            type: BikeType,
            description: "Remove a bike by id",
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, { id }){
                return Bike.findByIdAndRemove(id);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

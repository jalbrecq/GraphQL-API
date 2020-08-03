const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { graphql } = require('graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose')

const app = express();

// connect to mango atlas database
// user name: atlasAdmin
// password: WQ7RGrJbkIz0FDpt
mongoose.connect('mongodb+srv://atlasAdmin:WQ7RGrJbkIz0FDpt@graphql-api.yj1ay.mongodb.net/GraphQL-API?retryWrites=true&w=majority',
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
mongoose.connection.once('connected', ()=>{
    console.log("Connected to the database");
})

app.use('/graphql', graphqlHTTP({
    schema, // same as: schema: schema
    graphiql: true
}));

app.listen(4000, ()=>{
    console.log("Now listening for requests on port 4000 ...");
})

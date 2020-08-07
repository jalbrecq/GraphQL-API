const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { graphql } = require('graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

app.use(express.static("client/build"))

// allow cross-origin requests
app.use(cors());

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

app.listen(process.env.PORT || 4000, ()=>{
    console.log("Now listening for requests ...");
})

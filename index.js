// CODE FROM https://dev.to/augani/how-to-build-a-graphql-api-from-scratch-19c0

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const bodyparser = require("body-parser");
const { buildSchema, graphql } = require("graphql");

const app = express();

app.use(bodyparser.json())

app.use(
    "/graphql",
    graphqlHTTP({
        // here will be the options thath will be used to setup the graphql
        schema: defineSchema(),
        rootValue: {
            library: getLibrary()
        },
        graphiql: true
    })
);

app.listen(3232, () => {
    console.log("Server running");
})

function defineSchema() {
    var schema = null;
    schema = buildSchema(`
    type MainQuery {
        library: [String!]!
    }
    type MainMutation {
        recordBook(title: String): String
    }
    schema {
        query: MainQuery
        mutation: MainMutation
    }
    `);

    return schema
}

function getLibrary() {
    return [
        "A tale of two cities",
        "In the chest of a woman",
        "things fall apart"
    ]
}
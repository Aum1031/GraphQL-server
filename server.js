var graphql = require ('graphql');
var graphql = require ('graphql').graphql;
var express = require('express');
var graphQLHTTP = require('express-graphql');
// var Schema = require('./schema');
var query = 'query { todo {id, title, completed } }'; 

let TODOs = [
    {
        "id": 123344455,
        "title": "read",
        "completed": false
    },
    {
        "id": 23434343,
        "title": "buy",
        "completed": true
    }
];

let TodoType = new graphql.GraphQLObjectType ({
    name: 'todo',
    fields: function() {
        return {
            id: {
                type: graphql.GraphQLInt
            },
            title: {
                type: graphql.GraphQLString
            },
            completed : {
                type: graphql.GraphQLBoolean
            }
        }
    }
});

let queryType= new graphql.GraphQLObjectType ({
    name: 'Query',
    fields: function() {
        return {
            todos: {
                type: new graphql.GraphQLList(TodoType),
                resolve: function () {
                    return TODOs;
                }
            }
        }
    }
});
// app.use('/graphql', graphqlHTTP({
//     schema: schema,
//     rootValue: root,
//     graphiql: true,
// }));

// app.listen(4000);

// console.log('Running a graphQL server at localhost:4000/graphql');


// graphql(schema, '{hello}', root).then((response)=> {
//     console.log(response);
// })
graphql(Schema, query).then (function (result) {
    console.log(JSON.stringify(result));
});

let app = express()
    .use('/', graphqlHTTP({schema: Schema, pretty: true}))
        .listen(8080, function(err) {
            console.log('GraphQL is now running on localhost:8080');
        });
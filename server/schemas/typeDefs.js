const typeDefs = `

type User {
    _id: ID!
    username: String
    email: String
    password: String
    savedBooks: [Book]

}

type Book {
    _id: ID!
    authors: [String]!
    bookId: String
    description: String
    image: String
    title: String
    link: String

}

type Auth {
    token: ID!
    user: User
}

type Query {
    users: [User]
    me: User    
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors: [String], bookId: String,  description: String,  image: String, title: String): User
    removeBook(bookId: ID!): User
}


`;

module.exports = typeDefs;
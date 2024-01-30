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
    description: String
    bookId: String
    image: String
    link: String
    title: String

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
    saveBook(author: String, description: String, bookId: String, title: String, image: String, link: String): User
    removeBook(bookId: ID!): User
}


`;

module.exports = typeDefs;
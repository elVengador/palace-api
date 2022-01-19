const userSchema = `#graphql
    type User {
        name: String!
        nick: String!
    }

    type UserSetting{
        theme:String!
    }

    type UserInput{
        nick:String!
        phone:String!
        email:String!
        password:String!
        name:String!
        paternalLastName:String!
        maternalLastName:String!
        dni:String!
        birthday:String!
        photo:String!
        group:String!
        state:String!
        setting:UserSetting!
    }

    type Query {
        getUser: User
    }
`

export { userSchema }
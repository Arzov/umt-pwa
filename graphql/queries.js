export const getMessages = `
  query getMessages(
    $hashKey: String!
    $nextToken: String
  ) {
    getMessages(
      hashKey: $hashKey
      nextToken: $nextToken
    ) {
      items {
        hashKey
        rangeKey
        author
        authorName
        content
      }
      nextToken
    }
  }
`

export const getMatches = `
  query getMatches(
    $hashKey: String!
    $nextToken: String
  ) {
    getMatches(
      hashKey: $hashKey
      nextToken: $nextToken
    ) {
      items {
        hashKey
        rangeKey
        invitedName
        matchId
        createdAt
        expireAt
        isCanceled
      }
      nextToken
    }
  }
`

export const getUser = `
  query getUser(
    $hashKey: String!
  ) {
    getUser(
      hashKey: $hashKey
    ) {
      hashKey
      firstName
      lastName
      birthdate
      gender
      picture
    }
  }
`

export const getUmatchUser = `
  query getUser(
    $rangeKey: String!
    $nextToken: String
  ) {
    getUser(
      rangeKey: $rangeKey
      nextToken: $nextToken
    ) {
      items {
        hashKey
        rangeKey
        genderFilter
        matchFilter
        ageMinFilter
        ageMaxFilter
      }
      nextToken
    }
  }
`

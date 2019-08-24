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
        content
      }
      nextToken
    }
  }
`

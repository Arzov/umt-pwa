export const addMessage = `
  mutation addMessage(
    $hashKey: String!
    $rangeKey: String!
    $author: String!
    $content: String!
  ) {
    addMessage(
      hashKey: $hashKey
      rangeKey: $rangeKey
      author: $author
      content: $content
    ) {
      hashKey
      rangeKey
      author
      content
    }
  }
`

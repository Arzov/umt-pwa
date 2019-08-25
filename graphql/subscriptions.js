export const onAddMessage = `
  subscription onAddMessage($hashKey: String!) {
    onAddMessage(hashKey: $hashKey) {
      hashKey
      rangeKey
      author
      authorName
      content
    }
  }
`

export const onAddMatch = `
  subscription onAddMatch($hashKey: String!) {
    onAddMatch(hashKey: $hashKey) {
      hashKey
      rangeKey
      members
      createdAt
      expireAt
      status
    }
  }
`

export const onAddMessage = `
  subscription onAddMessage($hashKey: String!) {
    onAddMessage(hashKey: $hashKey) {
      hashKey
      rangeKey
      author
      content
    }
  }
`

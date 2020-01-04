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

export const onUpdateMatch = `
  subscription onUpdateMatch($rangeKey: String!) {
    onUpdateMatch(rangeKey: $rangeKey) {
      rangeKey
    }
  }
`

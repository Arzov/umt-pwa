export const addMessage = `
  mutation addMessage(
    $hashKey: String!
    $author: String!
    $authorName: String!
    $content: String!
  ) {
    addMessage(
      hashKey: $hashKey
      author: $author
      authorName: $authorName
      content: $content
    ) {
      hashKey
      rangeKey
      author
      authorName
      content
    }
  }
`

export const updateUser = `
  mutation updateUser(
    $hashKey: String!
    $firstName: String,
    $lastName: String,
    $picture: String,
    $birthdate: String,
    $gender: String
  ) {
    updateUser(
      hashKey: $hashKey
      firstName: $firstName,
      lastName: $lastName,
      picture: $picture,
      birthdate: $birthdate,
      gender: $gender
    ) {
      hashKey
    }
  }
`

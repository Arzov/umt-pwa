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
    $firstName: String
    $lastName: String
    $picture: String
    $birthdate: String
    $gender: String
  ) {
    updateUser(
      hashKey: $hashKey
      firstName: $firstName
      lastName: $lastName
      picture: $picture
      birthdate: $birthdate
      gender: $gender
    ) {
      hashKey
    }
  }
`

export const addUserLocation = `
  mutation addUserLocation(
    $latitude: Float!
    $longitude: Float!
    $userId: String!
    $genderFilter: String!
    $ageMinFilter: Int!
    $ageMaxFilter: Int!
    $matchFilter: String!
  ) {
    addUserLocation(
      latitude: $latitude
      longitude: $longitude
      userId: $userId
      genderFilter: $genderFilter
      ageMinFilter: $ageMinFilter
      ageMaxFilter: $ageMaxFilter
      matchFilter: $matchFilter
    ) {
      hashKey
      rangeKey
      geoJson
      ageMinFilter
      ageMaxFilter
      matchFilter
      genderFilter
    }
  }
`

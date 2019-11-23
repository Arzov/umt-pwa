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

export const addMatch = `
  mutation addMatch(
    $hashKey: String!
    $rangeKey: String!
    $geohash: Int!
    $creatorName: String!
    $creatorPicture: String!
    $adversaryName: String!
    $adversaryPicture: String!
    $matchFilter: String!
    $genderFilter: String!
    $ageMinFilter: Int!
    $ageMaxFilter: Int!
  ) {
    addMatch(
      hashKey: $hashKey
      rangeKey: $rangeKey
      geohash: $geohash
      creatorName: $creatorName
      creatorPicture: $creatorPicture
      adversaryName: $adversaryName
      adversaryPicture: $adversaryPicture
      matchFilter: $matchFilter
      genderFilter: $genderFilter
      ageMinFilter: $ageMinFilter
      ageMaxFilter: $ageMaxFilter
    ) {
      matchId
    }
  }
`

export const updateMatch = `
  mutation updateMatch(
    $hashKey: String!
    $rangeKey: String!
    $matchId: String!
    $userStatus: String!
  ) {
    updateMatch(
      hashKey: $hashKey
      rangeKey: $rangeKey
      matchId: $matchId
      userStatus: $userStatus
    ) {
      matchStatus
    }
  }
`
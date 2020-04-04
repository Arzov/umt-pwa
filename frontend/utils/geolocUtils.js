exports.getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // Radius of the earth in km
    const p = Math.PI / 180
    const dLat = (lat2 - lat1) * p
    const dLon = (lon2 - lon1) * p
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * p) * Math.cos(lat2 * p) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c // Distance in km
    return d
}

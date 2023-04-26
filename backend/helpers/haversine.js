// Haversine algorithm

haversine = ([lng1, lat1],[lng2, lat2]) => {
  lat1 = (lat1 * Math.PI) / 180
  lng1 =(lng1 * Math.PI) / 180
  lat2 =(lat2 * Math.PI) / 180
  lng2 = (lng2 * Math.PI) / 180
  let r= 6371;
  let distance = 2 * r * Math.asin(Math.sqrt(
    hav(lat2, lat1) + (1 - hav(lat1, lat2) - hav(lat2, lat1, "+")) * hav(lng2, lng1)
  ))
  return distance
}

const hav = (l1, l2, op="-") => {
  if(op==="+"){
    return Math.pow((Math.sin((l2+l1)/2)), 2)
  }
  return Math.pow((Math.sin((l2-l1)/2)),2)
}

module.exports = {
  haversine,
}

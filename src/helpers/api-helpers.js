export const fetchArtistProfile = async ( token, artistId ) => {
  const url = `https://api.spotify.com/v1/artists/${ artistId }`
  const options = {
    headers: { Authorization: `Bearer ${ token }` }
  }

  const res = await fetch( url, options )

  return await res.json()
}
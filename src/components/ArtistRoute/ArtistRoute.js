import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchArtistProfile } from '../../helpers/api-helpers'
import { useEffect } from 'react'
import { requestArtistProfile, receiveArtistProfile, receiveArtistProfileError } from '../../actions'

const ArtistRoute = () => {
  const currentArtist = useSelector( state => state.artist.currentArtist )
  const accessToken = useSelector( state => state.auth.token )
  const { id: artistId } = useParams()
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch( requestArtistProfile() )

    if ( accessToken ) {
      fetchArtistProfile( accessToken, artistId )
        .then( data => {
          dispatch( receiveArtistProfile( data ) )
        } )
        .catch( err => {
          console.error( err )
          dispatch( receiveArtistProfileError() )
        } )
    }
  }, [ accessToken ] )

  const calculateFollowers = ( total ) => {
    if ( total >= 1000000 ) {
      return `${ Math.round( total / 1000000 ) }M`
    } else if ( total >= 1000 ) {
      return `${ Math.round( total / 1000 ) }K`
    } else {
      return total
    }
  }


  if ( currentArtist ) {
    console.log( 'currentArtist.profile', currentArtist.profile )
    console.log( 'currentArtist.profile.images', currentArtist.profile.images )
    console.log( 'currentArtist.profile.name', currentArtist.profile.name )
    console.log( 'currentArtist.profile.followers.total', currentArtist.profile.followers.total ) // short
    console.log( 'currentArtist.profile.genres', currentArtist.profile.genres ) // 2 max
  }

  return (
    <Main>
      { !currentArtist
        ? <p>Loading...</p>
        : (
          <Content>
            <Section>
              <ArtistImage src={ currentArtist.profile.images[ 0 ].url } />

              <ArtistInfo>
                <ArtistName>{ currentArtist.profile.name }</ArtistName>
                <Followers><Fuchsia>{ calculateFollowers( currentArtist.profile.followers.total ) }</Fuchsia> followers</Followers>
              </ArtistInfo>
            </Section>

            <Section>
              <Player>
                <Title>top tracks</Title>
                <Row>
                  <Button>Play</Button>
                  <Button>Play</Button>
                  <Button>Play</Button>
                </Row>
              </Player>
            </Section>

            <Section>
              <Genres>
                <Title>tags</Title>
                <Row>
                  <Genre>{ currentArtist.profile.genres[ 0 ] }</Genre>
                  <Genre>{ currentArtist.profile.genres[ 1 ] }</Genre>
                </Row>
              </Genres>
            </Section>
          </Content>
        )
      }
    </Main>
  )
}

export default ArtistRoute

const Main = styled.div`
  min-height: 100vh;
  padding: 5% 0;
  background: black;
  color: white;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  padding: 10% 0;
`

const ArtistImage = styled.img`
  border-radius: 50%;
  width: 50%;
`

const ArtistInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: -45px;
  width: 100%;
`

const ArtistName = styled.span`
  font-size: 40px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
`

const Followers = styled.span``

const Fuchsia = styled.span`
  color: fuchsia;
  font-weight: 600;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`

const Player = styled(Section)``

const Genres = styled(Section)``

const Title = styled.span`
  font-size: 24px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px;
`

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 50%;
  background: #333;
`

const Genre = styled.div`
  padding: 8px;
  margin-right: 10px;
  border-radius: 5px;
  background: #333;
`
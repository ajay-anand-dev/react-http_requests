import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

// const places = localStorage.getItem();

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false)
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => { // dont add async here
    async function fetchPlaces() {
      setIsFetching(true)
      try {
        const places = await fetchAvailablePlaces()
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces)
          setIsFetching(false)
        });
      } catch (error) {
        setError({ message: error.message || 'Could not fetch places, please try again later.' })
        setIsFetching(false)
      }


    }

    fetchPlaces();
    // fetch('https://hzf4j9-3000.csb.app/places')
    //   .then(response => {
    //     return response.json()
    //   })
    //   .then(resData => {
    //     setAvailablePlaces(resData.places)
    //   })
  }, [])

  if (error) {
    return <Error title="An error occured!" message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching places data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

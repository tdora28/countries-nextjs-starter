import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const CountryMap = ({ latitude, longitude }) => {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_MAP_API}>
      <GoogleMap mapContainerStyle={{ height: '400px', width: '100%' }} zoom={5} center={{ lat: latitude, lng: longitude }}>
        <Marker position={{ lat: latitude, lng: longitude }} />
      </GoogleMap>
    </LoadScript>
  );
};

export default CountryMap;

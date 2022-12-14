import React,{ ChangeEvent } from 'react';
import usePlacesAutocomplete,{ getGeocode,getLatLng,} from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import '@reach/combobox/styles.css';
import '../css/autocomplete.css';
import markersStore from '../stores/markersStore'
import mapStore from '../stores/mapStore';
import { observer } from 'mobx-react';

 const Autocomplete = () => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue
  } = usePlacesAutocomplete();

  const marker = markersStore.marker;
  const map = mapStore.currentMap;

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log('handleInput');
    setValue(e.target.value);
    mapStore.setCenter(marker.lat, marker.lng);
  };

  const handleSelect = (val: string): void => {
     setValue(val, false);
     convertfromAdressToLocation();
  };

  const renderSuggestions = (): JSX.Element => {
    const suggestions = data.map(({ place_id, description }: any) => (
      <ComboboxOption key={place_id} value={description} />
    ));
        console.log(suggestions);
    return (
      <>
        {suggestions}
      </>
    );
  };

      const convertfromAdressToLocation = () => {
       getGeocode({ address: value })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          console.log('Coordinates: ', { lat, lng });
          marker.lat = lat;
          marker.lng = lng;
          map.center = { lat: marker.lat, lng: marker.lng };
        })
        .catch((error) => {
          console.log('Error: ', error);
        });
      }

  return (
    <div className='container'>
      <h1 className='title'>search</h1>
      <Combobox onSelect={handleSelect} aria-labelledby='demo'>
        <ComboboxInput
          style={{ width: 300, maxWidth: '90%' }}
          value={value}
          onChange={handleInput}
          disabled={!ready}
        />
        <ComboboxPopover>
          <ComboboxList>{status === 'OK' && renderSuggestions()}</ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

export default observer(Autocomplete);
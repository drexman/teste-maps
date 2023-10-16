import { MapComponent } from './MapComponent';
import './App.css'

import { Wrapper, Status } from "@googlemaps/react-wrapper";

const apiKey: string = 'AIzaSyDuYDZv0xtkJNmTevlANbpfAcPp8xQKizg';

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

function GoogleMapsReactWrapper() {
  return (
    <Wrapper apiKey={apiKey} render={render}>
      <MapComponent />
    </Wrapper>
  )
}

export default GoogleMapsReactWrapper

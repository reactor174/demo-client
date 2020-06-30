import React, { useRef, useCallback } from 'react';
import { Map, TileLayer, FeatureGroup } from 'react-leaflet';
import L from 'leaflet';

import EditControl from 'react-leaflet-draw/dist/esm/EditControl';
import 'leaflet-draw/dist/leaflet.draw.css';

import 'react-leaflet-fullscreen/dist/styles.css'
import FullscreenControl from 'react-leaflet-fullscreen';
// import './maps.css'

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png',
});

function MapDrawer (props) {

  const onChangeZoom = e => {
    const zoom = e.target._zoom;
    props.onChangeZoom(zoom);
  }

  const onChangeCenter = e => {
    const center = e.target.getCenter();
    props.onChangeCenter([ center.lat, center.lng, ]);
  }

  const _featureGroupRef = useRef(null);
  const featureGroupRef = useCallback(ref => {
    if (ref === null) return;
    _featureGroupRef.current = ref;
    const featureGroup = ref.leafletElement;
    props.mapObjects.eachLayer(layer => {
      featureGroup.addLayer(layer);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  const saveMapObjects = () => {
    const mapObjectsData = _featureGroupRef.current.leafletElement.toGeoJSON();
    props.onChangeMapObjects(mapObjectsData);
  }
  
  const onMapObjCreated = e => saveMapObjects();
  const onMapObjEdited = e => saveMapObjects();
  const onMapObjDeleted = e => saveMapObjects();
  
  return (
      <Map
        style={{ height : '50vh', }}
        center={ props.center }
        zoom={ props.zoom }
        editable={ true }
        onzoomend={ onChangeZoom }
        onmoveend={ onChangeCenter }
      >
        <FullscreenControl position="topleft" />
        
        <FeatureGroup ref={ featureGroupRef }>
          <EditControl
            position="topright"
            onCreated={ onMapObjCreated }
            onEdited={ onMapObjEdited }
            onDeleted={ onMapObjDeleted }
            draw={{
              rectangle : false,
              circle : false,
              circlemarker : false,
            }}
            edit={{
              edit : true,
              remove : true,
            }}
          />
        </FeatureGroup>

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        
        

      </Map>
  );
}

export default MapDrawer;


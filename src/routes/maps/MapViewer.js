import React from 'react';
import { Map, TileLayer, Marker, Popup, Polyline, Polygon } from 'react-leaflet';
import L from 'leaflet';

import 'react-leaflet-fullscreen/dist/styles.css'
import FullscreenControl from 'react-leaflet-fullscreen';
// import './maps.css'

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png',
});

/*
// fix marker default icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// fix marker default icon
let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow });
L.Marker.prototype.options.icon = DefaultIcon;
*/

function MapViewer (props) {
  
  const changeZoom = e => {
      const zoom = e.target._zoom;
      props.onChangeZoom(zoom);
  }

  const changeCenter = e => {
      const center = e.target.getCenter();
      props.onChangeCenter([ center.lat, center.lng, ]);
  }

    const layers = [];
    props.mapObjects.eachLayer(layer => {
        layers.push(layer);
    });

  return (

    <Map
        style={{ height : '50vh', }}
        center={ props.center }
        zoom={ props.zoom }
        onzoomend={ changeZoom }
        onmoveend={ changeCenter }
    >
        <FullscreenControl position="topleft" />
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        
        {   props.mapObjects
            &&
            layers.map((layer, i) => {
                switch ( layer.feature.geometry.type ) {
                case 'Point' :
                    return (
                        <Marker key={ i } position={ layer._latlng }>
                            <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                        </Marker>
                    )
                case 'LineString' :
                    return (
                        <Polyline 
                            key={ i } 
                            positions={ layer._latlngs }
                        />
                    )
                case 'Polygon' :
                    return (
                        <Polygon 
                            key={ i } 
                            positions={ layer._latlngs }
                        />
                    )
                default : return '';
                }
            })
        }
        

    </Map>
  );
}

export default MapViewer;
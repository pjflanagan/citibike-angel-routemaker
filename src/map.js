/**
 * @class Layers
 */

const Features = {
  map: function ({ lng, lat, zoom }) {
    return {
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [lng, lat],
      zoom: zoom
    };
  },

  geolocateControl: function () {
    return {
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserLocation: true
    };
  },

  point: function (lngLat, i) {
    return {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [
          lngLat.lng,
          lngLat.lat
        ]
      },
      'properties': {
        'id': i
      }
    }
  },
}

class MapDirector {
  constructor(lng, lat, zoom) {
    const self = this;

    mapboxgl.accessToken = 'pk.eyJ1IjoicGpmbGFuYWdhbiIsImEiOiJjampldWRtMDQ0YWc1M3ByNXhwemNqa25kIn0.UGCAQuunCGs-9X9q5b1PZg';
    this.map = new mapboxgl.Map(Features.map({ lng, lat, zoom }));

    // gelocate
    this.geolocateControl = new mapboxgl.GeolocateControl(Features.geolocateControl());
    this.map.addControl(this.geolocateControl);

    $.ajax({
      url: 'https://layer.bicyclesharing.net/map/v1/nyc/stations',
      type: 'GET',
      xhrFields: {
          withCredentials: true
      },
      success: function (response) {
          console.log({response});
      },
      error: function (xhr, status) {
          console.log({xhr, status});
      }
  });

    // this.map.on('load', function () { self.init(); });
  }

  getPosition() {
    let mapBounds = this.map.getBounds();
    let bounds = {
      'min': mapBounds._sw,
      'max': mapBounds._ne
    };
    let center = this.map.getCenter();
    let zoom = this.map.getZoom();
    return { bounds, center, zoom };
  }

  locate() {
    this.geolocateControl.trigger();
  }

}

window.onload = function () {
  const map = new MapDirector(-73.9821905, 40.7349932, 12);
}
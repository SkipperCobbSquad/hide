// react
import React, { useState, useEffect, useRef } from "react";

// openlayers
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
import { transform } from "ol/proj";
import { Feature } from "ol";
// import { toStringXY } from "ol/coordinate"; //value to string
import Overlay from "ol/Overlay.js";
import Geolocation from "ol/Geolocation.js";
import LineString from "ol/geom/LineString.js";
import OSM from "ol/source/OSM";

import styled from "styled-components";
import GeometryLayout from "ol/geom/GeometryLayout";
import OverlayPositioning from "ol/OverlayPositioning";

const MapWrapperHolder = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
//#region components
const MapContainer = styled.div`
  flex: 1;
`;

//#endregion

export interface MapWrapperInt {
  features: Feature[];
}

function MapWrapper({ features }: MapWrapperInt) {
  const [map, setMap] = useState<Map>();
  const [featuresLayer, setFeaturesLayer] = useState<VectorLayer>();

  const marekRef = useRef<any>()
  const mapElement = useRef<any>();
  const mapRef = useRef<Map>();
  mapRef.current = map;
  useEffect(() => {
    // const pos=navigator.geolocation
    // pos.getCurrentPosition((e)=>alert(e))

    //#region map setup
    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource(),
    });

    const view = new View({
      projection: "EPSG:3857",
      center: [2061784.4845776786, 7267893.9667788055],
      zoom: 10,
    });
    // const titleLayer=new TileLayer({ //not working on many devices
    //   source: new XYZ({
    //     url: "http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}",
    //   }),})

    const titleLayer = new TileLayer({
      source: new OSM(),
    });
    const initialMap = new Map({
      target: mapElement.current,
      layers: [titleLayer, initalFeaturesLayer],
      view: view,
      controls: [],
    });

    // initialMap.on("click", handleMapClick);
    const positions = new LineString([], GeometryLayout.XYZM);
    let deltaMean = 500;
    const markerE1: HTMLElement | null = document.getElementById("marker");
    const marker = new Overlay({
      positioning: OverlayPositioning.CENTER_CENTER,
      element: marekRef!.current,
      stopEvent: false,
    });
    initialMap.addOverlay(marker);
    //#endregion
    //#region geoSetup
    const geolocation = new Geolocation({
      projection: view.getProjection(),
      trackingOptions: {
        maximumAge: 10000,
        enableHighAccuracy: true,
        timeout: 600000,
      },
    });

    geolocation.on("change", function () {
      const position = geolocation.getPosition();
      const accuracy = geolocation.getAccuracy();
      const heading = geolocation.getHeading() || 0;
      const speed = geolocation.getSpeed() || 0;
      const m = Date.now();
      addPosition(position, heading, m, speed);

      const coords = positions.getCoordinates();
      const len = coords.length;
      if (len >= 2) {
        deltaMean = (coords[len - 1][3] - coords[0][3]) / (len - 1);
      }

      const data = [
        "Position: " + position![0].toFixed(2) + ", " + position![1].toFixed(2),
        "Accuracy: " + accuracy,
        "Heading: " + Math.round(radToDeg(heading)) + "&deg;",
        "Speed: " + (speed * 3.6).toFixed(1) + " km/h",
        "Delta: " + Math.round(deltaMean) + "ms",
      ];

      // console.log(data);
    });

    geolocation.on("error", function (e) {
      alert("GPS error \n please give us permision and reload");
      // alert(e.toString())
      // FIXME we should remove the coordinates in positions
    });
    //#endregion
    //#region geoRender
    // convert radians to degrees
    function radToDeg(rad: number) {
      return (rad * 360) / (Math.PI * 2);
    }
    // convert degrees to radians
    function degToRad(deg: number) {
      return (deg * Math.PI * 2) / 360;
    }
    // modulo for negative values
    function mod(n: number) {
      return ((n % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    }

    function addPosition(position: any, heading: any, m: any, speed: any) {
      //this is tracking last pos
      const x = position[0];
      const y = position[1];
      const fCoords = positions.getCoordinates();
      const previous = fCoords[fCoords.length - 1];
      const prevHeading = previous && previous[2];
      if (prevHeading) {
        let headingDiff = heading - mod(prevHeading);

        // force the rotation change to be less than 180°
        if (Math.abs(headingDiff) > Math.PI) {
          const sign = headingDiff >= 0 ? 1 : -1;
          headingDiff = -sign * (2 * Math.PI - Math.abs(headingDiff));
        }
        heading = prevHeading + headingDiff;
      }
      positions.appendCoordinate([x, y, heading, m]);

      // only keep the 20 last coordinates
      positions.setCoordinates(positions.getCoordinates().slice(-20));

      // FIXME use speed instead
      // if (heading && speed) {
      //   markerE1!.classList.add("fa fa-location-arrow"); // w ruchu
      // } else {
      //   markerE1!.classList.remove("fa-location-arrow");
      //   markerE1!.classList.add("fa-dot-circle-o"); //stoi
      // }
      //TODO change this for ico
    }

    // recenters the view by putting the given coordinates at 3/4 from the top or
    // the screen
    function getCenterWithHeading(
      position: any,
      rotation: any,
      resolution: any
    ) {
      const size = initialMap.getSize();
      const height = size![1];

      return [
        position[0] - (Math.sin(rotation) * height * resolution * 1) / 4,
        position[1] + (Math.cos(rotation) * height * resolution * 1) / 4,
      ];
    }

    let previousM = 0;
    function updateView() {
      // use sampling period to get a smooth transition
      let m = Date.now() - deltaMean * 1.5;
      m = Math.max(m, previousM);
      previousM = m;
      // interpolate position along positions LineString
      const c = positions.getCoordinateAtM(m, true);
      if (c) {
        // view.setCenter(getCenterWithHeading(c, -c[2], view.getResolution()));
        // view.setRotation(-c[2]);
        marker.setPosition(c);
        initialMap.render();
      }
    }
    geolocation.setTracking(true); // Start position tracking

    titleLayer.on("postrender", updateView);
    initialMap.on('click', ()=>{
      let m = Date.now() - deltaMean * 1.5;
      m = Math.max(m, previousM);
      previousM = m;
      // interpolate position along positions LineString
      const c = positions.getCoordinateAtM(m, true);
      if (c) {
        view.setCenter(getCenterWithHeading(c, -c[2], view.getResolution()));
        // view.setRotation(-c[2]);
        // marker.setPosition(c);
        initialMap.render();
      }
    })
    initialMap.render();
    //#endregion

    setMap(initialMap);
    setFeaturesLayer(initalFeaturesLayer);
    return ()=>{map?.dispose(); geolocation.setTracking(false); geolocation.unset(geolocation.getKeys()[0])}
  }, []);

  useEffect(() => {
    if (features.length) {
      // may be null on first render

      // set features to map
      console.log("Kurwa 2")
      featuresLayer!.setSource(
        new VectorSource({
          features: features, // make sure features is an array
        })
      );

      // fit map to feature extent (with 100px of padding)
      map!.getView().fit(featuresLayer!.getSource().getExtent(), {
        padding: [100, 100, 100, 100],
      });
    }
    return ()=>{console.log("Kurwa 1")}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [features]);

  // map click handler
  // const handleMapClick = (event: any) => {
  //   const clickedCoord: any = mapRef.current!.getCoordinateFromPixel(
  //     event.pixel
  //   );

  //   // const transormedCoord = transform(clickedCoord, "EPSG:3857", "EPSG:4326"); //standard lat
  //   const transormedCoord = transform(clickedCoord, "EPSG:3857", "EPSG:3857"); //standart mapy
  //   console.log(transormedCoord);
  // };

  return (
    <MapWrapperHolder>
      <i style={{position: 'fixed'}} className="fa fa-location-arrow" id="marker" ref={marekRef}></i>
      <MapContainer ref={mapElement}></MapContainer>
    </MapWrapperHolder>
  );
}

export default MapWrapper;

// Implement of plusating dot on the map
import React from "react";
import ReactDOM from "react-dom";
import PostDataPopup from "./components/PostPopup";

function createPulsingDot(size, mapInstance, colors) {
  var pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),
    onAdd: function () {
      var canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext("2d");
    },
    render: function () {
      var duration = 1000;
      var t = (performance.now() % duration) / duration;
      var radius = (size / 2) * 0.3;
      var outerRadius = (size / 2) * 0.7 * t + radius;
      var context = this.context;

      // Draw outer circle
      context.clearRect(0, 0, this.width, this.height);
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
      context.fillStyle = colors.pulseColor;
      context.fill();

      //Draw inner circle
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
      context.fillStyle = colors.innerColor;
      context.strokeStyle = colors.borderColor;
      context.lineWidth = 2 + 4 * (1 - t);
      context.fill();
      context.stroke();

      // update the image's data with data from canvas
      this.data = context.getImageData(0, 0, this.width, this.height).data;

      mapInstance.triggerRepaint();
      return true;
    },
  };
  return pulsingDot;
}

const mouseEnterAndLeave = (mapInstance, id, popup) => {
  mapInstance.on("mouseenter", id, function (e) {
    mapInstance.getCanvas().style.cursor = "pointer";
    const cardPopupNode = document.createElement("div");
    ReactDOM.render(
      <PostDataPopup userPostData={e.features[0].properties} />,
      cardPopupNode
    );
    popup.setLngLat(e.lngLat);
    popup.setDOMContent(cardPopupNode).addTo(mapInstance);
  });
  mapInstance.on("mouseleave", id, function () {
    mapInstance.getCanvas().style.cursor = "";
    popup.remove();
  });
};

const addLayer = (mapInstance, id, source, iconImage) => {
  mapInstance.addLayer({
    id: id,
    type: "symbol",
    source: source,
    layout: {
      "icon-image": iconImage,
    },
  });
};

const makeGeojson = () => {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [],
        },
        properties: {},
      },
    ],
  };
};
export { createPulsingDot, mouseEnterAndLeave, addLayer, makeGeojson };

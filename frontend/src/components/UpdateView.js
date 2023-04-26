import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { getAPI } from "../axios-api";
import InteractiveMap, {
    Marker,
    GeolocateControl,
} from "react-map-gl";

let accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;


const UpdateView = () => {
    const [chooseLngLat, setChooseLngLat] = useState([0, 0]);
    const [zoom, setZoom] = useState(9);
    const [marked, setMarked] = useState(false);
    const [messages, setMessages] = useState({
	status: false,
	message: "",
	redirect: false,
    });
    const handleMapClick = (e) => {
	const lng  = e.lngLat.lng,
	      lat = e.lngLat.lat;
	setMarked(true)
	setChooseLngLat([lng,lat])
    }
    const submitLocation = (e) => {
	e.preventDefault();
	let userData = JSON.parse(localStorage.getItem("jwt"));
	getAPI
	    .put(
		`user/update/${userData.user._id}`,
		{ coordinates: chooseLngLat },
		{ headers: { Authorization: `BEARER ${userData.token}` } }
	    )
	    .then((response) => {
		if (response.status === 200) {
		    userData.user.coordinates = chooseLngLat;
		    localStorage.setItem("jwt", JSON.stringify(userData));
		    setMessages({
			status: true,
			message: "Successfully updated, redirecting to Home",
		    });
		    setTimeout(function () {
			setMessages({ ...messages, redirect: true });
		    }, 1000);
		}
	    });
    };
    const showMessage = () => {
	if (messages.status) {
	    return (
		<div
		    className="animate__animated animate__fadeInDown container sticky-top mt-5 alert alert-success alert-dismissible fade show"
		    role="alert"
		    aria-hidden="true"
		>
		    {messages.message}
		</div>
	    );
	}
    };

    const checkMarkerZoom = (m, z) => {
	if (z >= 17 && m) {
	    return true;
	}
	return false;
    };

    const redirectUser = () => {
	if (messages.redirect) {
	    return <Navigate to="/" />;
	}
    };
    return (
	<>
	    {showMessage()}
	    <h1 className="row justify-content-center" style={{paddingTop: "40px"}}>Please choose your location</h1>
	    <div className="position-absolute justify-content-center  bg-body rounded bg-white" style={{top: "17%", left:"9%", right: "9%"}}>
		<InteractiveMap
		    initialViewState={{
			longitude: 85.30014,
			latitude: 27.700769,
			zoom: 7
		    }}
		    style={{height: "590px"}}
		    mapboxAccessToken={accessToken}		    
		    mapStyle="mapbox://styles/rajan-blackboxes/ckvdimlt01weg14nzak3der01"
		    onContextMenu={handleMapClick}
		    onZoomEnd={(e) => {setZoom(e.viewState.zoom)}}
		>
		    <GeolocateControl style={{position: "relative", top:"250px"}} showUserLocation={false} fitBoundsOptions={{maxZoom: 20}}/>
		    {marked && (
			<Marker
			    longitude={chooseLngLat[0]}
			    latitude={chooseLngLat[1]}
			    closeOnClick={false}
			>
			    
			</Marker>
		    )}
		</InteractiveMap>
		<form onSubmit={submitLocation} className="row justify-content-between">
		    <button
			type="submit"
			className="btn btn-lg btn-outline-primary submit-btn"
			disabled={checkMarkerZoom(marked, zoom) ? false : true}
		    >
			Submit
		    </button>
		</form>
	    </div>
	    {redirectUser()}
	</>
    );
};

export default UpdateView;

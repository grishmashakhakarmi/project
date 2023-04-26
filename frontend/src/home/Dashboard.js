import React, { useEffect, useState } from "react";
import InteractiveMap, {
    Popup,
    Marker,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl,
} from "react-map-gl";
import "./Dashboard.css";

import PinMark from "./PinMark";
import Post from "../components/Post";
import PostPopup from "../components/PostPopup";
import useLocalStorage from "../useLocalStorage";
import { getAPI } from "../axios-api";
import socket from "../socket/socket"
import ControlPanel from './ControlPanel';

let accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Dashboard = () => {
    let userViewCoordinate = JSON.parse(localStorage.getItem("jwt")).user.coordinates;
    if (userViewCoordinate[0] === 0 && userViewCoordinate[1] === 0) {
	userViewCoordinate = [85.30014, 27.700769];
    } // if not [0,0] then default location is choosen
    const [postSuccess, setPostSuccess] = useLocalStorage("postSuccess", false);
    const [markers, setMarkers] = React.useState([]);
    const [initializePostMarker, setInitializePostMarker] = useState(null);
    const [popupInfo, setPopupInfo] = useState(null);
    const [posts, setPosts] = useState(null);
    const [liveData, setLiveData] = useState([])

    
    const getPosts = async () => {
	const userPostData = await getAPI.get("/post");
	setPosts(userPostData.data.posts);
    };
    useEffect(() => {
	socket.on("post.read", (data) => {
	    setLiveData([...liveData, data])
	})	
    }, [liveData, setLiveData])

    const success = () => {
	if (postSuccess) {
	    return (
		<div
		    className="position-absolute post-success-message animate__animated animate__fadeInDown container sticky-top mt-5 alert alert-success alert-dismissible fade show"
		    role="alert"
		>
		    Get well soon.
		</div>
	    );
	}
    };
    useEffect(() => {
	getPosts();
    }, []);

    const handleMapClick = (e) => {
	const lng = e.lngLat.lng,
	      lat = e.lngLat.lat;
	setMarkers((markers) => [{ longitude: lng, latitude: lat }]);
    };
    
    // timeout for success message for post
    useEffect(() => {
	if (postSuccess) {
	    setTimeout(() => setPostSuccess(false), 2000);
	}
    }, [postSuccess, setPostSuccess]);
    return (
	<>
	    <div>
		<InteractiveMap
		    initialViewState={{
			longitude: userViewCoordinate[0],
			latitude: userViewCoordinate[1],
			zoom: 20,
		    }}
		    style={{ width: "100%", height: "100vh" }}
		    mapStyle="mapbox://styles/rajan-blackboxes/ckvdimlt01weg14nzak3der01"
		    mapboxAccessToken={accessToken}
		    onContextMenu={handleMapClick}
		>
		    <GeolocateControl position="top-left" />
		    <FullscreenControl position="top-left" />
		    <NavigationControl position="top-left" />
		    <ScaleControl />
		    {success()}
		    {posts && posts.map(
			({
			    blood_group,
			    condition,
			    contact_number,
			    coordinates,
			    occur_date,
			    problem_description,
			    problem_name,
			    problem_status,
			}, index) => (
			    <Marker
				key={`marker-${index}`}
				longitude={coordinates[0]}
				latitude={coordinates[1]}
				anchor="top"
			    >
				<PinMark
				    type={condition}
				    onMouseOver={() =>
					setPopupInfo({
					    blood_group,
					    coordinates,
					    condition,
					    contact_number,
					    occur_date,
					    problem_description,
					    problem_name,
					    problem_status,
					})
				    }
				/>
			    </Marker>
			)
		    )}
		    {popupInfo && (
			<Popup
			    anchor="top"
			    longitude={popupInfo.coordinates[0]}
			    latitude={popupInfo.coordinates[1]}
			    closeOnClick={false}
			    closeButton={false}
			>
			    <div>
				<PostPopup userPostData={popupInfo} />
			    </div>
			</Popup>
		    )}
		    
		    {markers.map((m, i) => (
			<Marker
			    {...m}
			    key={i}
			    onClick={(e) => setInitializePostMarker(e.target._lngLat)}
			></Marker>
		    ))}
		    
		    {initializePostMarker && (
			<Popup
			    anchor="top"
			    longitude={initializePostMarker.lng}
			    latitude={initializePostMarker.lat}
			    closeOnClick={false}
			    onClose={() => setPopupInfo(null)}
			>
			    <div>
				<Post setPostSuccess={setPostSuccess} setLngLat={initializePostMarker} />
			    </div>
			</Popup>
		    )}

		    {
			// iterate to liveData through socket.io and return with marker and their data 
			liveData.map(({_id, blood_group, coordinates, condition, contact_number, occur_date, problem_description, problem_name,problem_status}, index) => {
			    return (<Marker
					longitude={coordinates[0]}
					latitude={coordinates[1]}		
					key={_id}
				    >
					<PinMark
					    type={condition}
					    onMouseOver={() =>
						setPopupInfo({
						    blood_group,
						    coordinates,
						    condition,
						    contact_number,
						    occur_date,
						    problem_description,
						    problem_name,
						    problem_status,
						})
					    }
					/>
			     </Marker>)
			})
		    }
		</InteractiveMap>
		<ControlPanel />
	    </div>

	</>
    );
};

export default Dashboard;

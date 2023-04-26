import React, {useState, useEffect} from 'react';
import { getAPI } from "../axios-api";

const  ControlPanel = () => {
    const [nearByUsers,setNearByUsers] = useState(null)
    const getData = async () => {
	let userData = JSON.parse(localStorage.getItem("jwt"));
	let userId = userData.user._id
	const userPostData = await getAPI.get(`/user/near/${userId}`, {headers: {Authorization: `BEARER ${userData.token}`}});
	setNearByUsers(userPostData.data)
    }
    useEffect(() => {
	getData()
    }, [])
    return (
	<div className="control-panel">
	    <h3>Donor Nearby your location</h3>
	    <hr/>
	    <div>
		{nearByUsers && nearByUsers.map(({fullName, distance, email, bloodGroup}, index) => (
		    <div key={index}>
			<h3>Name: {fullName}</h3>
			<h3>Distance: {distance.toFixed(2)} KM</h3>
			<h3>Contact: {email}</h3>
			<h3>blood group: {bloodGroup}</h3>
			<hr/>
		    </div>
		    
		))}
		

	    </div>
	</div>
    );
}

export default React.memo(ControlPanel);

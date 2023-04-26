import React, {useState, useContext, useEffect} from 'react';
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { getAPI } from "../axios-api";
import { AuthContext } from "../App";
import moment from 'moment';
import Modal from './Modal';

const Table =  () => {
  //get user id and get all post list for that user
  const {authContext} = useContext(AuthContext)
  const userData  = JSON.parse(authContext).user
  const [userPostData, setUserPostData] = useState(null)
  let geocoder = new MapboxGeocoder({
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  });

  useEffect(() => {
  const getUserPostData = async () => {
    let {data: {posts: posts}} = await getAPI.get(`/post/list/${userData._id}`)
    setUserPostData(posts)
  }
    getUserPostData()
  }, [userData._id])
 return (
        <>
          <Modal/>
        <h2 className="pr-2">Posts</h2>
        <div className='text-center table-responsive-xxl'>
            <table className="table table-striped">
                <thead className="table-dark">
                  <tr>
                  <th>blood_group</th>
                  <th>condition</th>
                  <th>problem</th>
                  <th>occur date</th>
                  <th>problem status</th>
                  <th>problem description</th>
                  <th>contact number</th>
                  <th>coordinates</th>
                  </tr>
                </thead>
                <tbody>
                    {userPostData && (
                      userPostData.map(item => {
                        let Tablecolor = "table-info"
                        if(item.condition === "emergency"){
                          Tablecolor = "table-danger"

                        }else if(item.condition === "urgent"){
                          Tablecolor = "table-warning"

                        }else if(item.condition === "anytime"){
                          Tablecolor = "table-secondary"
                        }
                        return(
                          <tr className={Tablecolor} data-bs-toggle="modal" data-bs-target="#staticTableBackdrop" key={item._id}>
                              <td>{item.blood_group}</td>
                              <td>{item.condition}</td>
                              <td>{item.problem_name}</td>
                              <td>{moment(item.occur_date).fromNow()}</td>
                              <td>{item.problem_status ? "True" : "False"}</td>
                              <td>{item.problem_description.substring(0,10)}...</td>
                              <td>{item.contact_number}</td>
                          <td>{String(item.coordinates).substring(0,2)}</td>
                            </tr>
                        )
                      })
                    )}
                </tbody>
            </table>
        </div>
      </>
 )
}

export default Table;

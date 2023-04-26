import React, {useState, useRef} from "react";
import Table from "./Table";
import PostEdit from "./PostEdit";
import Notification from "./Notification";
import './Profile.css'

const Profile = () => { 
    const postComponentRef = useRef(null);
    const profileComponentRef = useRef(null);
    const notificationComponentRef = useRef(null);
    const [activeComponent, setActiveComponent] = useState(null);

  const set = (name) => () => {
      setActiveComponent(name);
      if(name =="post-component"){
	  postComponentRef.current.classList.add("active")
	  profileComponentRef.current.classList.remove("active")
	  notificationComponentRef.current.classList.remove("active")

      } else if(name === "profile-component")
      {
	  profileComponentRef.current.classList.add("active")
	  postComponentRef.current.classList.remove("active")
	  notificationComponentRef.current.classList.remove("active")
      }
      else{
	  notificationComponentRef.current.classList.add("active")
	  postComponentRef.current.classList.remove("active")
	  profileComponentRef.current.classList.remove("active")
      }
  }
      return (
    <div className="profile-container">
          <div className="profile-div-sidebar ">
              <ul className="nav  nav-pills pt-2 flex-column mb-auto">
                  <li onClick={set("post-component")}>
                      <span ref={postComponentRef} className="post-component pointer nav-link active">
                         Posts
                      </span>
                    </li>
                  <li onClick={set("profile-component")}>
                      <span ref={profileComponentRef} className="profile-component pointer nav-link">
                        Profile
                      </span>
                    </li>
                  <li  onClick={set("notification-component")}>
                      <span ref={notificationComponentRef} className="notification-component pointer nav-link">
                        Notifications
                      </span>
                    </li>
                  </ul>
          </div>
            <div className="profile-div-content">
            {((activeComponent  === null || activeComponent === "post-component") && <Table/>)
             || ((activeComponent === "profile-component") && <PostEdit/>)
             ||((activeComponent === "notification-component") && <Notification/>)
            }
          </div>

      </div>
  )
};

export default Profile;

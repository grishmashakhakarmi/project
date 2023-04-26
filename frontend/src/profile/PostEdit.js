import React, {useState, useContext, useRef } from "react";
import { getAPI } from "../axios-api";
import { AuthContext } from "../App";


const PostEdit = () => {
  const {authContext} = useContext(AuthContext)
  const userData  = JSON.parse(authContext).user
  const eye = useRef(null);
  const inputPassword = useRef(null);
  const inputFullName = useRef();
  const inputEmail = useRef(null);
  const inputBloodGroup = useRef(null);
  const [values, setValues] = useState({
    full_name: userData.full_name,
    email: userData.email,
    blood_group: userData.blood_group,
    password: "",
    errorsMessage: {
      full_name: new Set(),
      email: new Set(),
      blood_group: new Set(),
      password: new Set(),
    }
  });
  const { full_name, email, blood_group, password, errorsMessage} = values;
  const handleChange = (name) => (e) => {
    inputFullName.current.classList.remove("is-invalid");
    inputEmail.current.classList.remove("is-invalid");
    inputBloodGroup.current.classList.remove("is-invalid");
    inputPassword.current.classList.remove("is-invalid");
    setValues({ ...values, [name]: e.target.value });
  };
  const showPassword = (e) => {
    if (eye.current.className.includes("far fa-eye-slash")) {
      inputPassword.current.type = "text";
      eye.current.className = "far fa-eye";
    } else {
      inputPassword.current.type = "password";
      eye.current.className = "far fa-eye-slash";
    }
  };
  const updateUser = (e) => {
    e.preventDefault();
    //get user data from localStorage
    const userData = JSON.parse(localStorage.getItem("jwt"))
    // update user data
    getAPI
      .put(`/user/update/${userData.user._id}`, {
        full_name,
        email,
        blood_group,
        password,
      }, { headers: { Authorization: `BEARER ${userData.token}` }})
      .then(() => {
        setValues({
          ...values,
          errorsMessage: {
            full_name: new Set(),
            email: new Set(),
            blood_group: new Set(),
            password: new Set(),
          }
        });

        // when successfully update, update localStorage also
        userData.user.blood_group = blood_group
        userData.user.email = email
        userData.user.full_name = full_name
        localStorage.setItem("jwt", JSON.stringify(userData))

      })
      .catch((err) => {
        const errors = err.response.data.errors;
        for (const error in errors) {
          switch (errors[error].param) {
            case "full_name":
              errorsMessage.full_name.add(errors[error].msg);
              inputFullName.current.classList.add("is-invalid");
              break;
            case "email":
              errorsMessage.email.add(errors[error].msg);
              inputEmail.current.classList.add("is-invalid");
              break;
            case "password":
              errorsMessage.password.add(errors[error].msg);
              inputPassword.current.classList.add("is-invalid");
              break;
            case "blood_group":
              inputBloodGroup.current.classList.add("is-invalid");
              errorsMessage.blood_group.add(errors[error].msg);
              break;
            default:
              break;
          }
        }
      });
  };
  return (
      <>
            <h2>Edit your profile</h2>
            <form className="card-body" method="POST" onSubmit={updateUser}>
            <div className=" mb-3 form-floating">
              <input
                ref={inputFullName}
                name="fullName"
                type="text"
                className="form-control input-field "
                onChange={handleChange("full_name")}
                value={full_name}
                id="fullName"
                placeholder="full Name"
              />
              <label htmlFor="fullName">Full Name</label>
            </div>
            <div className=" mb-3 form-floating">
              <input
                ref={inputEmail}
                name="email"
                type="email"
                className="form-control input-field"
                onChange={handleChange("email")}
                value={email}
                id="email"
                placeholder="name@example.com"
              />
              <label htmlFor="email">Email address</label>
            </div>
            <div className=" mb-3 form-floating">
              <select
                ref={inputBloodGroup}
                name="bloodGroup"
                className="form-select input-field"
                onChange={handleChange("blood_group")}
                value={blood_group}
                aria-label="Default select example"
              >
                <option disabled defaultValue="default">
                  Select your blood group
                </option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className=" mb-3 form-floating input-group">
              <input
                name="password"
                type="password"
                className="form-control input-field password-field mb-2"
                id="floatingPassword"
                onChange={handleChange("password")}
                value={password}
                placeholder="Password"
                aria-describedby="passwordHelpBlock"
                ref={inputPassword}
              />
              <button
                className="input-group-text password-show-hide"
                type="button"
                onClick={showPassword}
              >
                <i className="far fa-eye-slash" ref={eye}></i>
              </button>
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button
              className="w-100 btn btn-lg btn-outline-success submit-btn"
              type="submit"
            >
             Update
            </button>
          </form>
          </>
  );

}

export default PostEdit;

import React, { useState, useRef } from "react";
import "./Post.css";
import { getAPI } from "../axios-api";

const Post = ({ setPostSuccess, setLngLat }) => {
  const problem_nameRef = useRef(null);
  const conditionRef = useRef(null);
  const occur_dateRef = useRef(null);
  const contact_numberRef = useRef(null);
  const blood_groupRef = useRef(null);
  const problem_descriptionRef = useRef(null);
  const [values, setValues] = useState({
    problem_name: "",
    condition: "",
    occur_date: "",
    problem_status: false,
    contact_number: "",
    blood_group: "",
    problem_description:"",
    errorsMessage: {
      problem_name: new Set(),
      condition: new Set(),
      occur_date: new Set(),
      problem_status: new Set(),
      contact_number: new Set(),
      blood_group: new Set(),
      problem_description: new Set(),
    },
  });

  const {
    problem_name,
    condition,
    occur_date,
    contact_number,
    problem_status,
    blood_group,
    problem_description,
    errorsMessage,
  } = values;
  const handleChange = (name) => (e) => {
    problem_nameRef.current.classList.remove("is-invalid");
    conditionRef.current.classList.remove("is-invalid");
    occur_dateRef.current.classList.remove("is-invalid");
    contact_numberRef.current.classList.remove("is-invalid");
    blood_groupRef.current.classList.remove("is-invalid");
    problem_descriptionRef.current.classList.remove("is-invalid");
    e.target.type === "checkbox"
      ? setValues({ ...values, [name]: e.target.checked })
      : setValues({ ...values, [name]: e.target.value });
  };

  const postSubmit = (e) => {
    e.preventDefault();
    var userData = JSON.parse(localStorage.getItem("jwt"));
    getAPI
      .post(
        `post/create/${userData.user._id}`,
        {
          problem_name,
          condition,
          occur_date,
          problem_status,
          contact_number,
          blood_group,
          problem_description,
          coordinates: [setLngLat.lng, setLngLat.lat],
        },
        { headers: { Authorization: `BEARER ${userData.token}` } }
      )
      .then((response) => {
        setPostSuccess(true);
        setValues({
          ...values,
          problem_name: "",
          condition: "",
          occur_date: "",
          problem_status: false,
          contact_number: "",
          blood_group: "",
          problem_description: "",
          errorsMessage: {
            problem_name: new Set(),
            condition: new Set(),
            occur_date: new Set(),
            problem_status: new Set(),
            contact_number: new Set(),
            blood_group: new Set(),
            problem_description: new Set(),
          },
        });
      })
      .catch((err) => {
        setPostSuccess(false);
        const errors = err.response.data.errors;
        for (const error in errors) {
          switch (errors[error].param) {
            case "problem_name":
              errorsMessage.problem_name.add(errors[error].msg);
              problem_nameRef.current.classList.add("is-invalid");
              break;
            case "condition":
              errorsMessage.condition.add(errors[error].msg);
              conditionRef.current.classList.add("is-invalid");
              break;
            case "occur_date":
              errorsMessage.occur_date.add(errors[error].msg);
              occur_dateRef.current.classList.add("is-invalid");
              break;
            case "contact_number":
              errorsMessage.contact_number.add(errors[error].msg);
              contact_numberRef.current.classList.add("is-invalid");
              break;
            case "blood_group":
              errorsMessage.blood_group.add(errors[error].msg);
              blood_groupRef.current.classList.add("is-invalid");
              break;
            case "problem_description":
              errorsMessage.problem_description.add(errors[error].msg);
              problem_descriptionRef.current.classList.add("is-invalid");
              break;
            default:
              break;
          }
        }
      });
  };
  return (
    <>
      <div className="d-flex flex-row justify-content-between mb-2">
        <h5 className="text-center">
          Ask <span className="text-danger">Help?</span>
        </h5>
        {/* <button type="button" class="btn-close" aria-label="Close"></button> */}
      </div>
      <div className="post-form">
        <form method="POST" onSubmit={postSubmit}>
          <div className="form-group mb-2">
            <select
              ref={problem_nameRef}
              name="problemName"
              className="form-control input-field"
              value={problem_name}
              onChange={handleChange("problem_name")}
            >
              <option disabled value="">
                Select Problem Type
              </option>
              <option value="Blood">Blood</option>
              <option value="Kidney">Kidney</option>
              <option value="Eyes">Eyes</option>
              <option value="Liver">Liver</option>
              <option value="Pancreas">Pancreas</option>
              <option value="heart">Heart</option>
              <option value="Lung">Lung</option>
            </select>
          </div>

          <div className="form-group mb-2">
            <select
              ref={conditionRef}
              name="condition"
              className="form-control input-field"
              value={condition}
              onChange={handleChange("condition")}
            >
              <option disabled value="">
                Select your Condition
              </option>
              <option value="Emergency">Emergency</option>
              <option value="Urgent">Urgent</option>
              <option value="Anytime">Anytime</option>
            </select>
          </div>

          <div className="form-group mb-2">
            <input
              ref={occur_dateRef}
              name="occurDate"
              className="form-control input-field"
              type="datetime-local"
              value={occur_date}
              onChange={handleChange("occur_date")}
            />
          </div>

          <div className="form-group form-check mb-2">
            <label className="form-check-label" htmlFor="status-check">
              on going problem?
            </label>
            <input
              name="status"
              type="checkbox"
              className="form-check-input"
              checked={problem_status}
              onChange={handleChange("problem_status")}
            />
          </div>

          <div className="form-group mb-2">
            <input
              ref={contact_numberRef}
              name="contactNumber"
              type="number"
              placeholder="Contact Number"
              className="form-control input-field"
              value={contact_number}
              onChange={handleChange("contact_number")}
            />
          </div>

          <div className="form-group mb-2">
            <select
              ref={blood_groupRef}
              name="bloodGroup"
              className="form-control input-field"
              value={blood_group}
              onChange={handleChange("blood_group")}
            >
              <option disabled value="">
                {" "}
                Blood group Type{" "}
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

          <div className="form-group mb-2">
            <textarea
              ref={problem_descriptionRef}
              name="problemDescription"
              className="form-control input-field"
              rows="2"
              value={problem_description}
              onChange={handleChange("problem_description")}
            ></textarea>
          </div>

          <button className="btn btn-danger text-center" type="submit">
            Help!
          </button>
        </form>
      </div>
    </>
  );
};

export default Post;

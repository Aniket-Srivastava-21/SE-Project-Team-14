import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function NewPost() {
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");

  // handle submit form
  function handleSubmit(e) {
    // prevent the default action
    e.preventDefault();
    let req = {
      author: "unknown",
      title: title ,
      discription: discription 
    };
    console.log(req);

    // post request to the server
    axios
      .post("http://localhost:5000/discussion/addPost", req)
      .then((res) => {
        console.log(res);
        console.log("comment added");
      })
      .catch((err) => console.error(err));

    //   clear the title and discription valur
    setTitle("");
    setDiscription("");
  }

  // handle Change
  function handletitleChange(e) {
    setTitle(e.target.value);
  }

  //   function to change the discription
  function handleDiscriptionChange(e) {
    setDiscription(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="m-5 ">
        <div className="fs-4 text-center pb-3">New Post</div>
        <div className="row border border-dark p-3 rounded">
          <div className="form-group mb-3">
            <label for="formGroupExampleInput" className="form-label">
              Title of Post
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeHolder="I Want A Bycycle"
              value={title}
              onChange={handletitleChange}
            />
          </div>
          <div classNames="mb-3">
            <div className="form-group">
              <label for="exampleInputPassword1">Post Discription</label>
              <textarea
                className="form-control"
                placeHolder="Post Body goes here"
                id="floatingTextarea2"
                style={{ height: "100px" }}
                value={discription}
                onChange={handleDiscriptionChange}
              ></textarea>
            </div>
          </div>
          <div>
            {/* <Link to="/discuss"> */}
            <button type="submit" className="btn btn-success my-3">
              Post
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </form>
  );
}
export default NewPost;
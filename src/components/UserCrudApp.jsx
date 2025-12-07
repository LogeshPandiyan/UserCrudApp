



import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserCurdApp.css"; 

export default function UserCRUD() {

  // Step :1  Get the user details using hooks   
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({

    
  // Step :2 set the initial values for user details  
    username: "",
    userrole: "",
    socialprofile: "",
    promote: false,
    rating: "",
    lastlogin: "",
    status: false,
  });

//  Step :3 Then use another state to track if we are editing an existing user or adding a new one
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Step :4 Input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // Step :5 Add or Update user
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { ...form, status: form.promote };

    // Step :6  using if condtion to check edit or add new user
    if (editIndex !== null) {
      const updated = [...users];
      updated[editIndex] = newUser;
      setUsers(updated);
      setEditIndex(null);
    } 
    
    else {
      setUsers([...users, newUser]);
    }

    setForm({
      username: "",
      userrole: "",
      socialprofile: "",
      promote: false,
      rating: "",
      lastlogin: "",
      status: false,
    });
    setShowForm(false);
  };

  // Step :7 Edit user details
  const handleEdit = (i) => {
    setForm(users[i]);
    setEditIndex(i);
    setShowForm(true);
  };

//   Step :8 Delete user details
  const handleDelete = (i) => {
    setUsers(users.filter((_, idx) => idx !== i));
  };

  const handleDeleteAll = () => setUsers([]);

  // Step :9 Toggle Promote switch
  const togglePromote = (i) => {
    const updated = [...users];
    updated[i].promote = !updated[i].promote;
    updated[i].status = updated[i].promote;
    setUsers(updated);
  };

//   Write the JSX code  for rendering the component
  return (
     
     <>
     {/* Headings */}
     <h2
     className="ms-5  text-center m-5 bg-light p-3 border rounded-3"
     >User Management System using React.js + Bootstrap
     </h2>

    <div className="my-user-details container py-4 border border-1 rounded-2 mt-5">
      {/* Header */}

      <div className="d-flex justify-content-between mb-1">
        <h5> 
          <span className="text-secondary">Users: </span>{users.length} 
          <span className="text-secondary ms-3">Project :</span> {users.length}
       </h5>
        <button className="btn btn-sm border-secondary">
          <i class="fa-solid fa-gear me-2"></i>
          Table Settings</button>
      </div><br /><hr />

      {/* Controls */}
      <div className="d-flex justify-content-between mb-2">

          <div className="btn1">
        <button className="btn btn-primary btn-sm p-2" onClick={() => setShowForm(true)}>
          <i class="fa-solid fa-plus me-2"></i>
          Add New User
        </button>
        </div>
        
        {/*  Adding suspend,archive and delete buttons */}
        <div className="btn2">
         <button className="btn border-1 border-secondary  rounded-0">
          Suspend all
        </button>
         <button className="btn border-1 border-secondary  rounded-0">
          Archive all
        </button>
         <button className="btn border-1 border-secondary  rounded-0" 
           onClick={handleDeleteAll}>
          Delete All
        </button>
        </div>
      </div>

      {/* Table */}
      <table className="table mt-3 ">
        <thead className="table">
          <tr>
            <th className="text-uppercase text-secondary">Username</th>
            <th className="text-uppercase text-secondary">User Role</th>
            <th className="text-uppercase text-secondary">Status</th>
            <th className="text-uppercase text-secondary">Social Profile</th>
            <th className="text-uppercase text-secondary">Promote</th>
            <th className="text-uppercase text-secondary">Rating</th>
            <th className="text-uppercase text-secondary">Last Login</th>
            <th className="text-uppercase text-secondary">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((u, i) => (
              <tr key={i}>

                <td><i class="user-profile fa-solid fa-user me-2 "></i> {u.username}</td>
                <td>
                    <i class="fa-solid fa-computer me-1"></i>
                    <span className="user-role text-primary">{u.userrole}</span>
                </td>
                <td>
                  <span className={`badge ${u.status ? "bg-success" : "bg-danger"}`}>
                    {u.status ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                    <i class="fa-brands fa-facebook-f"></i>
                    <i class="fa-brands fa-github"></i>
                    <i class="fa-brands fa-twitter"></i>
                    <i class="fa-brands fa-google"></i>
                    {u.socialprofile ? <a href={u.socialprofile}>Profile</a> : "-"}</td>
                <td>
                  {/* Toggle Switch */}
                  <div
                    className={` mt-2 toggle-switch ${u.promote ? "active" : ""}`}
                    onClick={() => togglePromote(i)}
                  >
                    <div className="switch-handle"></div>
                  </div>
                </td>
                <td>{u.rating}</td>
                <td>{u.lastlogin}</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary" 
                          onClick={() => handleEdit(i)}>
                              <i class="fa-solid fa-pen me-1"></i>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-outline-danger ms-2" 
                   onClick={() => handleDelete(i)}>
                    <i class="fa-solid fa-trash me-1"></i>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No Users Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Popup Form */}
      {showForm && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center">
          <div className="card p-3" style={{ width: "400px" }}>
            <h5>{editIndex !== null ? "Edit User" : "Add User"}</h5>
            <form onSubmit={handleSubmit}>
              <input
                className="form-control mb-2"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
              />
              <input
                className="form-control mb-2"
                name="userrole"
                placeholder="User Role"
                value={form.userrole}
                onChange={handleChange}
                required
              />
              <input
                className="form-control mb-2"
                name="socialprofile"
                placeholder="Social Profile URL"
                value={form.socialprofile}
                onChange={handleChange}
              />
              <input
                className="form-control mb-2"
                name="rating"
                type="number"
                placeholder="Rating"
                value={form.rating}
                onChange={handleChange}
              />
              <input
                className="form-control mb-2"
                name="lastlogin"
                type="date"
                value={form.lastlogin}
                onChange={handleChange}
              />

              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  {editIndex !== null ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
     </>
  );
}

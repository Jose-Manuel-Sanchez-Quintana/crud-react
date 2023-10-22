import './App.css';
import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'


function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [years, setYears] = useState(0);
  const [id, setId] = useState(0);
  const [users, setUsers] = useState([]);

  const [edit, setEdit] = useState(false);


  const addUsers = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      years: years
    }).then(() => {
      getUsers();
      cleanInputs();
      Swal.fire({
        title: '<strong>User added</strong>',
        html: '<i>The user ' + name + ' has been registered successfuly</i>',
        icon: 'success',
        timer: 3000
      }).catch(function(error){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Couldn't delete the user",
          footer: JSON.parse(JSON.stringify(error)).message === "Network Error"?"Try again later":JSON.parse(JSON.stringify(error)).message
        })
      });
    });
  }

  const cleanInputs = () => {
    setName("");
    setAge("");
    setCountry("");
    setPosition("");
    setYears("");
    setId("");

    setEdit(false);

  }

  const updateUser = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      name: name,
      age: age,
      country: country,
      position: position,
      years: years
    }).then(() => {
      getUsers();
      cleanInputs();
      Swal.fire({
        title: '<strong>User updated</strong>',
        html: '<i>The user ' + name + ' has been updated successfuly</i>',
        icon: 'success',
        timer: 3000
      }).catch(function(error){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Couldn't delete the user",
          footer: JSON.parse(JSON.stringify(error)).message === "Network Error"?"Try again later":JSON.parse(JSON.stringify(error)).message
        })
      });
    });
  }
  const deleteUser = (val) => {

    Swal.fire({
      title: 'Are you sure?',
      html: '<i>The user <strong>' + val.name + '</strong> will be deleted, proceed?</i>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`, {}).then(() => {
          getUsers();
          cleanInputs();
          Swal.fire({
            title: '<strong>' + val.name + '</strong> has been deleted.',
            icon: 'success',
            timer: 3000,
          });
        }).catch(function(error){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Couldn't delete the user",
            footer: JSON.parse(JSON.stringify(error)).message === "Network Error"?"Try again later":JSON.parse(JSON.stringify(error)).message
          })
        });
      }
    })
  }
  const editUser = (val) => {
    setEdit(true);

    setName(val.name);
    setAge(val.age);
    setCountry(val.country);
    setPosition(val.position);
    setYears(val.years);
    setId(val.id);

  }


  const getUsers = () => {
    Axios.get("http://localhost:3001/users").then((response) => {
      setUsers(response.data);
    });
  }


  getUsers();



  return (
    <div className='container'>
      <div className="card text-center">
        <div className="card-header">
          User administration
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1" style={{ width: 120 }}>Name: </span>
            <input type="text" onChange={(event) => { setName(event.target.value) }} value={name} className="form-control" placeholder="Enter name" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1" style={{ width: 120 }}>Age: </span>
            <input type="number" onChange={(event) => { setAge(event.target.value) }} value={age} className="form-control" placeholder="Enter Age" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1" style={{ width: 120 }}>Country: </span>
            <input type="text" onChange={(event) => { setCountry(event.target.value) }} value={country} className="form-control" placeholder="Enter Country" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1" style={{ width: 120 }}>Position: </span>
            <input type="text" onChange={(event) => { setPosition(event.target.value) }} value={position} className="form-control" placeholder="Enter Position" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1" style={{ width: 120 }}>Years working: </span>
            <input type="number" onChange={(event) => { setYears(event.target.value) }} value={years} className="form-control" placeholder="Enter Years working" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          {
            edit ?
              <div>
                <button className='btn btn-warning m-4' onClick={updateUser}>Update</button>
                <button className='btn btn-info' onClick={cleanInputs}>Cancel</button>
              </div>
              : <button className='btn btn-success' onClick={addUsers}>Register</button>
          }
        </div>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Country</th>
            <th scope="col">Position</th>
            <th scope="col">Years working</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((val, key) => {
              return <tr key={val.id}>
                <th scope='row'>{val.id}</th>
                <td>{val.name}</td>
                <td>{val.age}</td>
                <td>{val.country}</td>
                <td>{val.position}</td>
                <td>{val.years}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" onClick={() => { editUser(val); }} className="btn btn-info">Edit</button>
                    <button type="button" onClick={() => { deleteUser(val); }} className="btn btn-danger">Delete</button>
                  </div>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;

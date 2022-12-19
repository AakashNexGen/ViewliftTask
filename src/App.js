import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    salary: "",
    age: "",
    image: '',
  });
  const [searchData, setSearchData] = useState('');
  const [localDataUser, setLocalDataUser] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const { name, salary, age, image } = userInfo;
  const handleAddUserAction = () => {
    (name && salary && age && image) === ""
      ? alert("Please fill all details")
      : usersData.push(userInfo);
    window.localStorage.setItem("local", JSON.stringify(usersData));

    setUserInfo({
      name: "",
      salary: "",
      age: "",
      image: '',
    });
  };
  const updateuser = (id) => {
    let data = usersData.filter((item, index) => {
      if (index === id) {
        return false;
      }
      return true;
    });
    setUsersData(data);
  };
  useEffect(() => {
    const localData = window.localStorage.getItem("local");
    const fullData = JSON.parse(localData);
    setLocalDataUser(fullData);
  }, []);
  return (
    <div className="App">
      <h1>Enter Your Employee Informations</h1>
      <div className="App dataInput">
        <div className="input-div">
          <p className="input-text">Employee Name</p>
          <input
            value={name}
            onChange={(e) => {
              setUserInfo({
                ...userInfo,
                name: e.target.value,
              });
            }}
          />
        </div>
        <div className="input-div">
          <p className="input-text">Employee Salary</p>
          <input
            type="number"
            value={salary}
            onChange={(e) => {
              setUserInfo({
                ...userInfo,
                salary: e.target.value,
              });
            }}
          />
        </div>
        <div className="input-div">
          <p className="input-text">Employee Age</p>
          <input
            type="number"
            value={age}
            onChange={(e) => {
              setUserInfo({
                ...userInfo,
                age: e.target.value,
              });
            }}
          />
        </div>
        <div className="input-div">
          <p className="input-text">Employee Image</p>
          {userInfo.image && (
            <div>
              <img
                alt="not fount"
                width={"250px"}
                
              />
              <button
                onClick={(e) => {
                  setUserInfo({
                    ...userInfo({
                      image: e.target.files[0].name,
                    }),
                  });
                }}
              >
                Remove
              </button>
            </div>
          )}
          <input
            type="file"
            name="myImage"
            accept="image/*"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setUserInfo({
                ...userInfo,
                image: event.target.files[0].name,
              });
            }}
          />
        </div>
        <div>
          <p className="btn-text">
            Click below button to add more Employees Information
          </p>
          <button onClick={handleAddUserAction} className="addInfo-btn">
            Add Info
          </button>
        </div>
      </div>
      <div>
        {localDataUser.length === 0 ? (
          <></>
        ) : (
          <div className="dataOutput">
            <div className="searchTable">
              <input
                placeholder="Search "
                onChange={(e) => setSearchData(e.target.value)}
              />
            </div>
            <div className="dataOutput-table">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Salary</th>
                    <th>Age</th>
                    <th>Image</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {localDataUser.filter((item)=>item.name.includes(searchData)).map((ele, i) => (
                    <tr>
                      <td>{i + 1}</td>

                      <td>{ele.name}</td>
                      <td>{ele.salary}</td>
                      <td>{ele.age}</td>
                      <td>{ele.image}</td>
                      <td>
                        <div onClick={() => updateuser(i)}>
                          <button className="delete-btn">X</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                 
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";

const GardensPosted = () => {
  const [myGardens, setMyGardens] = useState([]);
  const { getToken, loginStatus } = useContext(AuthContext);

  const getMyGardens = async () => {
    const token = getToken();
    const myHeader = new Headers({
      Authorization: `Bearer ${token}`,
    });
    var requestOptions = {
      method: "GET",
      headers: myHeader,
    };
    try {
      const response = await fetch(
        "http://localhost:5001/api/user/getpostedgardens",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      setMyGardens(result.user.gardens);
    } catch (err) {
      console.log("error getting gardens", err);
    }
  };

  useEffect(() => {
    getMyGardens();
  }, [loginStatus]);

  return (
    <div>
      <h3>Gardens posted:</h3>
      {myGardens &&
        myGardens.map((g) => {
          return (
            <div>
              <p>{g.farmName}</p>
              <img src={g.image} style={{ maxHeight: "200px" }} />;
            </div>
          );
        })}
    </div>
  );
};

export default GardensPosted;

import React, { useEffect, useState } from "react";

function AlertList() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/alerts")
      .then((response) => response.json())
      .then((data) => setAlerts(data))
      .catch((error) => console.error("Error:", error));
  }, []);


  // async function fetch() {
  //   const response = await  fetch("http://localhost:8080/alerts");
  //   const data = await response.json();
  //               setAlerts(data);
    
  // }


  // useEffect(() => {
  //   let timerId = setInterval(()=>{
  //     fetch();
  //   },5000);
  //   return () =>{
  //     clearInterval(timerId);
  //   };
  // }, []);





  return (
    <div>
      <h2>Existing Alerts</h2>
      <ul>
        {alerts.map((alert) => (
          <li key={alert.id}>
            <strong>ID:</strong> {alert.id} -<strong> Alert Value:</strong>{" "}
            {alert.alertValue} -<strong> Direction:</strong> {alert.direction} -
            <strong> Indicator:</strong> {alert.indicator} -
            <strong> Status:</strong> {alert.status} -
            <strong>Triggered Time:</strong> {alert.triggeredAt}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlertList;

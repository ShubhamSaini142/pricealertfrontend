import React, { useEffect, useState } from "react";
import addNotification from "react-push-notification";

function AlertList() {
  const [alerts, setAlerts] = useState([]);
  const [prevAlerts, setPrevAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch("http://localhost:8080/alerts");
        const data = await response.json();
        setAlerts(data);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };

    fetchAlerts();

    const intervalId = setInterval(fetchAlerts, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    alerts.forEach((alert) => {
      const prevAlert = prevAlerts.find((prev) => prev.id === alert.id);
      if (
        alert.status === "COMPLETED" &&
        (!prevAlert || prevAlert.status !== "COMPLETED")
      ) {
        addNotification({
          title: "Alert",
          message: `Price has been hit for alert with ID: ${alert.id} Index is ${alert.alertValue}`,
          duration: 5000,
          native: true,
        });
      }
    });

    setPrevAlerts(alerts);
  }, [alerts]);

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

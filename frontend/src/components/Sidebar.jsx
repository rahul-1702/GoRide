import React, { useState, useEffect } from "react";

import Loader from "../components/Loader";

const Sidebar = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Driver");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [activeTab]);

  const HOST = import.meta.env.VITE_HOST;
  const PORT = import.meta.env.VITE_PORT;

  const fetchData = async () => {
    try {
      setLoading(true);
      const urls = {
        Drivers: `http://${HOST}:${PORT}/api/driver/show`,
        Customers: `http://${HOST}:${PORT}/api/customer/show`,
        Team: `http://${HOST}:${PORT}/admin/show`,
      };

      const response = await fetch(urls[activeTab]);
      const result = await response.json();

      const formattedData = result.data.map((user, index) => ({
        id: index + 1,
        name: user.name || user.first_name,
        email: user.email,
        ride_type: user?.ride_type,
        auto_number: user?.auto_number,
        status: user?.status,
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="d-flex pt-5">
      {loading ? <Loader /> : ""}
      <div
        className="d-flex flex-column p-3 pt-0 bg-dark text-white"
        style={{
          width: "300px",
          height: "80vh",
          borderRight: "1px solid #666",
        }}
      >
        <ul className="nav flex-column">
          {["Drivers", "Customers", "Team"].map((tab) => (
            <li className="nav-item" key={tab}>
              <button
                className={`nav-link text-start w-100 ${
                  activeTab === tab
                    ? "active bg-info text-dark rounded"
                    : " text-white"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "Team" ? "Team Members" : tab}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="pb-4 px-5 w-100" style={{ height: "80vh" }}>
        <h3 className="text-info mb-4">
          {activeTab === "Team" ? "Team Members" : activeTab}
        </h3>
        <table className="table table-dark table-striped text-white">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Name</th>
              <th>Email</th>
              {activeTab === "Drivers" ? <th>Ride Type</th> : ""}
              {activeTab === "Drivers" ? <th>Ride no.</th> : ""}
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  {item?.ride_type && <td>{item.ride_type}</td>}
                  {item?.auto_number && <td>{item.auto_number}</td>}
                  <td>
                    <span
                      className={`badge ${
                        item.status === "Active"
                          ? "bg-success"
                          : item.status === "Inactive"
                          ? "bg-danger"
                          : "bg-secondary"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sidebar;

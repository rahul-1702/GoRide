// CustomerProfile.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { themeContext } from "../context/ThemeProvider";
import Swal from "sweetalert2";

import Loader from "./Loader";
import Header from "./Header";
import Footer from "./Footer";

function CustomerProfile() {
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState(null);
  const [text, setText] = useState("text-white");
  const [bg, setBg] = useState("bg-dark");
  
  const { theme } = useContext(themeContext);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    fetchCustomerData();
  }, [id]);

  useEffect(() => {
    if (theme === "dark") {
      setBg("bg-dark");
      setText("text-white");
    } else {
      setBg("bg-light");
      setText("text-dark");
    }
  }, [theme]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchCustomerData = async () => {
    try {
      setLoading(true);
      setError(null);

      let response = await fetch(`${backendUrl}/admin/customer-profile/${id}`);

      const result = await response.json();

      if (result.data && result.code === 1) {
        setCustomer(result.data[0]);
      } else {
        setError("No customer data found");
      }
    } catch (error) {
      setError(error.message || "Failed to load customer data");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSaveClick = () => {
    Swal.fire({
      title: "Do you really want to update this customer ?",
      text: "You cannot revert this",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      allowOutsideClick: false,
    }).then((btn) => {
      if (btn.isConfirmed) {
        setLoading(true);
        fetch(`${backendUrl}/admin/customer-profile/update`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(customer),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data && data.code === 1) {
              setTimeout(() => {
                setIsEditable(false);
                fetchCustomerData();
                setLoading(false);

                Swal.fire({
                  title: data.message,
                  icon: "success",
                  showConfirmButton: true,
                  allowOutsideClick: false,
                });
              }, 500);
            }
          })
          .catch((error) => {
            console.error("Error saving customer data:", error);
          });
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`${bg} ${text} min-vh-100 d-flex flex-column pt-5`}>
      {loading ? <Loader /> : ""}

      <Header />

      <main className="flex-grow-1">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {error ? (
                <div className="alert alert-danger">{error}</div>
              ) : !customer ? (
                // <div className="alert alert-warning">
                //   No customer data available
                // </div>
                <div></div>
              ) : (
                <div className="d-flex flex-column gap-3 align-items-start">
                  <button
                    className={`btn btn-sm ${ theme === "dark" ? "btn-outline-light" : "btn-outline-dark" } pt-1`}
                    onClick={() => navigate("/dashboard")}
                  >
                    <span
                      style={{
                        fontSize: 25,
                        lineHeight: "10px",
                        marginLeft: -3,
                      }}
                    >
                      &larr;
                    </span>{" "}
                    Back to Dashboard
                  </button>
                  <div className={`card ${bg} border border-info w-100`}>
                    <div className={`card-header bg-info ${text} d-flex justify-content-between align-items-center`}>
                      <h4 className="m-0 text-dark">Customer Profile</h4>
                      <div>
                        <button
                          className={`btn btn-sm ${
                            isEditable ? "btn-success" : "btn-light"
                          }`}
                          onClick={
                            isEditable ? handleSaveClick : handleEditClick
                          }
                        >
                          {isEditable ? "Save Profile" : "Edit Profile"}
                        </button>
                      </div>
                    </div>

                    <div className="card-body">
                      <form>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group mb-3">
                              <label className={`form-label fw-bold ${text}`}>
                                Name:
                              </label>
                              <input
                                type="text"
                                className={`form-control ${bg} ${text}`}
                                name="name"
                                value={customer.name || ""}
                                onChange={handleChange}
                                disabled={!isEditable}
                              />
                            </div>

                            <div className="form-group mb-3">
                              <label className={`form-label fw-bold ${text}`}>
                                Mobile:
                              </label>
                              <input
                                type="text"
                                className={`form-control ${bg} ${text}`}
                                name="mobile"
                                value={customer.mobile || ""}
                                onChange={handleChange}
                                disabled={!isEditable}
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group mb-3">
                              <label className={`form-label fw-bold ${text}`}>
                                Email:
                              </label>
                              <input
                                type="email"
                                className={`form-control ${bg} ${text}`}
                                name="email"
                                value={customer.email || ""}
                                onChange={handleChange}
                                disabled={!isEditable}
                              />
                            </div>

                            <div className="form-group mb-3">
                              <label className={`form-label fw-bold ${text}`}>
                                Status:
                              </label>
                              <select
                                className={`form-control ${bg} ${text}`}
                                name="status"
                                value={customer.status || ""}
                                onChange={handleChange}
                                disabled={!isEditable}
                              >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Deleted">Deleted</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>

                    <div
                      className={`card-footer ${bg} border-top border-info`}
                      style={{ height: 80 }}
                    >
                      <div className="row align-items-center justify-content-between h-100">
                        <div className="col-md-6">
                          <span className={`${text}`}>
                            Customer ID: {customer.id}
                          </span>
                          <div className="col-md-4 text-center d-flex gap-2 mt-1">
                            <span className={`${text}`}>Status</span>{" "}
                            {customer.status === "Active" ? (
                              <span
                                className="badge bg-success"
                                style={{ paddingTop: 6 }}
                              >
                                Active
                              </span>
                            ) : customer.status === "Inactive" ? (
                              <span
                                className={`badge bg-warning ${text}`}
                                style={{ paddingTop: 6 }}
                              >
                                Inactive
                              </span>
                            ) : (
                              <span
                                className="badge bg-danger"
                                style={{ paddingTop: 6 }}
                              >
                                Blocked
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="text-md-end">
                            <div className={`small ${text}`}>
                              Registered at:{" "}
                              {customer.created_at
                                ? new Date(customer.created_at).toLocaleString()
                                : "N/A"}
                            </div>
                            <div className={`small ${text}`}>
                              Last modified at:{" "}
                              {customer.updated_at
                                ? new Date(customer.updated_at).toLocaleString()
                                : "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CustomerProfile;

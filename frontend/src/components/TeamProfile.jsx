// TeamProfile.jsx
import React from "react";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Swal from "sweetalert2";

function TeamProfile() {
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    fetchTeamData();
  }, [id]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchTeamData = async () => {
    try {
      setLoading(true);
      setError(null);

      let response = await fetch(`${backendUrl}/admin/team-profile/${id}`);

      const result = await response.json();

      if (result.data && result.code === 1) {
        setTeam(result.data[0]);
      } else {
        setError("No team member data found");
      }
    } catch (error) {
      setError(error.message || "Failed to load team member data");
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
      title: "Do you really want to update this team member ?",
      text: "You cannot revert this",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      allowOutsideClick: false,
    }).then((btn) => {
      if (btn.isConfirmed) {
        setLoading(true);
        fetch(`${backendUrl}/admin/team-profile/update`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(team),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data && data.code === 1) {
              setTimeout(() => {
                setIsEditable(false);
                fetchTeamData();
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
            console.error("Error saving team member data:", error);
          });
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeam((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="bg-dark text-white min-vh-100 d-flex flex-column pt-5">
      {loading ? <Loader /> : ""}

      <Header />

      <main className="flex-grow-1">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {error ? (
                <div className="alert alert-danger">{error}</div>
              ) : !team ? (
                // <div className="alert alert-warning">
                //   No team data available
                // </div>
                <div></div>
              ) : (
                <div className="d-flex flex-column gap-3 align-items-start">
                  <button
                    className="btn btn-sm btn-outline-light pt-1"
                    onClick={handleBack}
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
                  <div className="card bg-dark border border-info w-100">
                    <div className="card-header bg-info text-dark d-flex justify-content-between align-items-center">
                      <h4 className="m-0">Team Member Profile</h4>
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
                              <label className="form-label text-info">
                                Name:
                              </label>
                              <input
                                type="text"
                                className="form-control bg-dark text-white"
                                name="name"
                                value={team.name || ""}
                                onChange={handleChange}
                                disabled={!isEditable}
                              />
                            </div>

                            <div className="form-group mb-3">
                              <label className="form-label text-info">
                                Mobile:
                              </label>
                              <input
                                type="text"
                                className="form-control bg-dark text-white"
                                name="mobile"
                                value={team.mobile || ""}
                                onChange={handleChange}
                                disabled={!isEditable}
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group mb-3">
                              <label className="form-label text-info">
                                Email:
                              </label>
                              <input
                                type="email"
                                className="form-control bg-dark text-white"
                                name="email"
                                value={team.email || ""}
                                onChange={handleChange}
                                disabled={!isEditable}
                              />
                            </div>

                            <div className="form-group mb-3">
                              <label className="form-label text-info">
                                Status:
                              </label>
                              <select
                                className="form-select bg-dark text-white"
                                name="status"
                                value={team.status || ""}
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
                      className="card-footer bg-dark border-top border-info"
                      style={{ height: 80 }}
                    >
                      <div className="row align-items-center justify-content-between h-100">
                        <div className="col-md-6">
                          <span className="text-light">
                          Team Member ID: {team.id}
                          </span>
                          <div className="col-md-4 text-center d-flex gap-2 mt-1">
                            <span className="text-light">Status</span>{" "}
                            {team.status === "Active" ? (
                              <span
                                className="badge bg-success"
                                style={{ paddingTop: 6 }}
                              >
                                Active
                              </span>
                            ) : team.status === "Inactive" ? (
                              <span
                                className="badge bg-warning text-dark"
                                style={{ paddingTop: 6 }}
                              >
                                Inactive
                              </span>
                            ) : (
                              <span
                                className="badge bg-danger"
                                style={{ paddingTop: 6 }}
                              >
                                Deleted
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="text-md-end">
                            <div className="small text-light">
                              Registered at:{" "}
                              {team.created_at
                                ? new Date(team.created_at).toLocaleString()
                                : "N/A"}
                            </div>
                            <div className="small text-light">
                              Last modified at:{" "}
                              {team.updated_at
                                ? new Date(team.updated_at).toLocaleString()
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

export default TeamProfile;

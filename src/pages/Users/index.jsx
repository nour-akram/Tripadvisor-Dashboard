import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/features/users/UserSlice"; 
import "./UsersPage.css"; 

const UsersPage = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.users);
  const users = data?.users || [];

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-center text-danger py-5">{error}</div>;

  
  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold ">PROFILES ({users.length})</h2>
      <div className="row g-4">
        {users.map((user) => (
          <div key={user._id} className="col-md-6 col-lg-4 col-xl-3">
            <div className="profile-card shadow-sm bg-white rounded-4 p-4 text-center position-relative">
              <div className="d-flex justify-content-between position-absolute top-0 start-0 w-100 px-3 pt-2">
                <span
                  className={`badge bg-${
                    user.status === "active" ? "success" : "secondary"
                  }`}
                >
                  {user.status}
                </span>
                <span className="badge bg text-uppercase">
                  {user.role}
                </span>
              </div>

              <img
                src={user.image || "/avatar.svg"}
                alt={user.name}
                className="rounded-circle avatar mb-3"
              />
              <h5 className="fw-semibold mb-1">
                {user.name || `${user.firstName} ${user.lastName}`}
              </h5>
              <p className="text-muted small">@{user.username}</p>
              <p className="text-muted small mb-2 bio">
                {user.bio || "No bio provided."}
              </p>

              <div className="d-flex justify-content-center gap-3 small text-muted mb-3">
                <span>{user.trips?.length || 0} trips</span>
                <span>{user.followers?.counter || 0} followers</span>
                <span>{user.following?.counter || 0} following</span>
              </div>

              <p className="text-muted small">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </p>
              <a href="#" className="btn view-btn  btn-sm w-100">
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;

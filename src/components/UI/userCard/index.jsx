import "./UsersPage.css";

const Index = ({ user }) => {
  return (
    <div className="profile-card shadow-sm bg-white rounded-4 p-4 text-center position-relative">
      <div className="d-flex justify-content-between position-absolute top-0 start-0 w-100 px-3 pt-2">
        <span className="badge bg text-uppercase">{user.role}</span>
      </div>

      <div className="user-image-wrapper position-relative d-inline-block mb-3">
        <img
          src={user.image || "/avatar.svg"}
          alt={user.name}
          className="rounded-circle avatar"
        />
        {user.status === "active" && (
          <span className="status-dot bg-success"></span>
        )}
      </div>
      <h5 className="fw-semibold mb-1">
        {user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.name}{" "}
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
  );
};

export default Index;

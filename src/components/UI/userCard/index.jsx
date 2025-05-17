import "./ProfileCard.css";
import { useState } from "react";

const ProfileCard = ({ user, destination, onEdit, onDelete }) => {
  const isUser = user && !destination;
  const isDestination = destination && !user;

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const imageSrc = isUser
    ? user.image || "/avatar.svg"
    : destination?.images?.[0] || "/default-destination.jpg";

  const title = isUser
    ? user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.name || user.username
    : destination?.name;

  const subtitle = isUser
    ? `@${user.username}`
    : `${destination?.region}, ${destination?.country}`;

  const description = isUser
    ? user.bio || "No bio provided."
    : destination?.description || "No description available.";

  return (
    <div
      className={`profile-card shadow-sm bg-white rounded-4 p-3 text-center position-relative ${
        isUser ? "profile-card-user" : "profile-card-destination"
      }`}
    >
      {isUser && (
        <div className="badge-wrapper position-absolute top-3 start-3">
          <span className="badge role-badge text-uppercase">{user.role}</span>
        </div>
      )}

      {isDestination && (
        <div className="dropdown-ellipsis position-absolute top-0 end-0 m-3">
          <button
            className="btn btn-ellipsis"
            onClick={() => setDropdownOpen((open) => !open)}
            aria-label="More options"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="5" r="2" fill="black" />
              <circle cx="12" cy="12" r="2" fill="black" />
              <circle cx="12" cy="19" r="2" fill="black" />
            </svg>
          </button>
          {dropdownOpen && (
            <div
              className="dropdown-menu show"
              style={{
                position: "absolute",
                right: 0,
                top: "2rem",
                zIndex: 10,
              }}
            >
              <button
                className="dropdown-item"
                onClick={() => {
                  setDropdownOpen(false);
                  onEdit?.(destination);
                }}
              >
                Edit
              </button>
              <button
                className="dropdown-item text-danger"
                onClick={() => {
                  setDropdownOpen(false);
                  onDelete?.(destination._id);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}

      <div
        className={`image-wrapper position-relative d-inline-block mb-3 ${
          isUser ? "user-image-wrapper" : "destination-image-wrapper"
        }`}
      >
        <img
          src={imageSrc}
          alt={title}
          className={
            isUser ? "rounded-circle avatar" : "rounded-4 destination-image"
          }
          style={
            isDestination
              ? { height: 180, objectFit: "cover", width: "100%" }
              : {}
          }
        />
        {isUser && user.status === "active" && (
          <span className="status-dot bg-success"></span>
        )}
      </div>

      <h5 className="fw-semibold mb-1">{title}</h5>
      <p
        className={`text-muted small mb-2 ${
          isUser ? "username" : "destination-location"
        }`}
      >
        {subtitle}
      </p>
      <p
        className={`text-muted small mb-3 ${
          isUser ? "bio" : "destination-description"
        }`}
      >
        {description}
      </p>

      {isUser && (
        <div className="d-flex justify-content-center gap-4 small text-muted mb-3 user-stats">
          <span>{user.trips?.length || 0} trips</span>
          <span>{user.followers?.counter || 0} followers</span>
          <span>{user.following?.counter || 0} following</span>
        </div>
      )}

      {isDestination && (
        <div className="destination-info d-flex justify-content-between text-muted small mb-3 px-3">
          <div>
            <strong>Attractions:</strong>{" "}
            {destination?.attractions?.filter(Boolean).join(", ") || "N/A"}
          </div>
          <div>
            <strong>Best time:</strong> {destination?.bestTimeToVisit || "N/A"}
          </div>
        </div>
      )}

      <p className="text-muted small">
        {isUser
          ? `Joined: ${new Date(user.createdAt).toLocaleDateString()}`
          : `Created: ${new Date(destination?.createdAt).toLocaleDateString()}`}
      </p>

      <a href="#" className="btn view-btn btn-sm w-100 mt-3">
        {isUser ? "View Profile" : "View Destination"}
      </a>
    </div>
  );
};

export default ProfileCard;

import { useDispatch, useSelector } from "react-redux";
import { makeUserAdmin } from "../../redux/features/admin/adminSlice";
import ProfileCard from "../../components/UI/userCard";
import Loader from "../../components/UI/Loader";
import { fetchUsers } from "../../redux/features/users/UserSlice";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.users);
  const { makeAdminLoading } = useSelector((state) => state.admin);
  const users = data?.users || [];

  const handleMakeAdmin = (userId) => {
    dispatch(makeUserAdmin(userId));
    dispatch(fetchUsers());
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-danger py-5">{error}</div>;

  return (
    <div className="container py-0">
      <h2 className="mb-4 fw-bold fs-5">PROFILES ({users.length})</h2>
      <div className="row g-4">
        {users.map((user) => (
          <div key={user._id} className="col-md-6 col-lg-4 col-xl-3">
            <ProfileCard
              user={user}
              onMakeAdmin={handleMakeAdmin}
              isPromoting={makeAdminLoading}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;

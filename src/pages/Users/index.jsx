import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/features/users/UserSlice"; 
import UserCard from '../../components/UI/userCard' 
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
          
            <UserCard user={ user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;

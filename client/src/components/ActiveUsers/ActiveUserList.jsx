import React from "react";
import ActiveUser from "./ActiveUser";
import s from "../../css/ActiveUsersList.module.css";
import { useContext } from "react";
import { StoreContext } from "../..";
import { useState } from "react";
import { useEffect } from "react";
import { fetchActiveUsersTC } from "../../Redux/ActionCreators/userAC";

const ActiveUsersList = (props) => {
  const store = useContext(StoreContext);

  const [activeUsers, setActiveUsers] = useState([]);

  const fetchActiveUsers = () => {
    store.dispatch(fetchActiveUsersTC());
  };

  useEffect(() => {
    fetchActiveUsers();
  }, []);

  store.subscribe(() => {
    setActiveUsers(store.getState().userPage.activeUsers);
  });

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <h5>Самые активные пользователи</h5>
      </div>
      {activeUsers?.map((user) => (
        <ActiveUser key={user.id} user={user} />
      ))}
     
    </div>
  );
};

export default ActiveUsersList;

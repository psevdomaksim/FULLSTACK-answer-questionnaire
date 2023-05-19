import React, { useState, useContext, useEffect } from "react";
import { useRef } from "react";
import { Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StoreContext } from "..";
import { fetchUsersTC } from "../Redux/ActionCreators/userAC";
import { PROFILE_ROUTE } from "../utils/routes_consts";

const UsersModal = ({ show, onHide }) => {
  const store = useContext(StoreContext);
  const [allUsers, setAllUsers] = useState([]);

  const [limit, setLimit] = useState(store.getState().questionPage?.limit);
  const [page, setPage] = useState(1);
  const [loadData, setLoadData] = useState(true);

  const trigger = useRef(null);

  const observer = useRef(null);

  const fetchAllUsers = () => {
    setLoadData(true);
    store.dispatch(fetchUsersTC(limit, page));
    setLoadData(false);
  };

  useEffect(() => {
    fetchAllUsers();
}, [page]);

// useEffect(() => {
//   if (!trigger && loadData && !page) return;
//   if (observer.current) observer.current.disconnect();
//   if (page > limit) return;
//   const callback = function (entries, observer) {
//     if (entries[0].isIntersecting) {
//       setPage((page) => page + 1);
//     }
//   };
//   observer.current = new IntersectionObserver(callback);
//   observer.current.observe(trigger.current);
// }, []);


  store.subscribe(() => {
    setAllUsers(store.getState().userPage.allUsers);
  });


  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Пользователи
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>№</th>
              <th>Имя</th>
              <th>Почта</th>            
              <th>Роль</th>
            </tr>
          </thead>
           {allUsers.map((user) => (
            <tbody key={user.id}>
              <tr>
                <td>{user.id}</td>
                <td><Link style={{color:"black"}} to={PROFILE_ROUTE + `/${user.id}`}>{user.fullname}</Link></td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            </tbody>
          ))} 
          <div ref={trigger} className="trigger"></div>
        </Table>

      </Modal.Body>
    </Modal>
  );
};

export default UsersModal;

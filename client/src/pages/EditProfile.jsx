import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { Col, Row, Image, Form, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { StoreContext } from "..";
import s from "../css/Edit.module.css";
import { editProfileDataTC } from "../Redux/ActionCreators/authAC";
import { BASE_URL } from "../utils/baseURL_const";
import { PROFILE_ROUTE } from "../utils/routes_consts";

const Edit = (props) => {
  const store = useContext(StoreContext);
  const [curLogin, setCurLogin] = useState(
    store.getState().authPage.currentLogin
  );

  const [fullname, setFullname] = useState(
    store.getState().authPage.currentLogin.fullname
  );
  const [status, setStatus] = useState(
    store.getState().authPage.currentLogin.status
  );
  const [img, setImg] = useState("");
  const [imgFile, setImgFile] = useState(null);

  const [msg, setMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isDisabledPutBtn, setIsDisabledPutBt] = useState(false);

  store.subscribe(() => {
    setCurLogin(store.getState().authPage.currentLogin);
    setErrorMsg(store.getState().authPage.error);
    setMsg(store.getState().authPage.msg);
  });

  const imgHandler = (e) => {
    setIsDisabledPutBt(false);
    setMsg("");
    setErrorMsg("");
    e.preventDefault();

    const reader = new FileReader();
    reader.onload = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    setImgFile(e.target.files[0]);
  };

  const onChange = (event) => {
    setIsDisabledPutBt(false);
    setMsg("");
    setErrorMsg("");

    if (event.target.id == "fullname") {
      setFullname(event.target.value);
    } else if (event.target.id == "status") {
      setStatus(event.target.value);
    }
  };

  const editProfile = () => {
    // if (fullname==="")
    store.dispatch(editProfileDataTC(curLogin.id, fullname, status, imgFile));
    setIsDisabledPutBt(true);
    setImg("");
  };

  return (
    <Container className={s.edit_wrapper}>
      <Row>
        <Col>
          <h2>Редактирование профиля</h2>
        </Col>
      </Row>
      <Row className={s.name_row}>
        <Col style={{marginRight:"20px"}} xs={2}>
          <span>Имя</span>
        </Col>
        <Col>
          <Form.Control id="fullname" value={fullname} onChange={onChange} />
        </Col>
      </Row>
      <Row className={s.name_row}>
        <Col style={{marginRight:"20px"}} xs={2}>
          <span >Статус</span>
        </Col>
        <Col>
          <Form.Control id="status" value={status} onChange={onChange} />
        </Col>
      </Row>
      <Row>
        <Col xs={3} className="d-flex align-items-center">
          <Form.Control type="file" onChange={imgHandler} />
        </Col>
      </Row>
      <Row className={s.name_row}>
        <Col md={{ span: 2, offset: 2 }}>
          <Image
            src={
              BASE_URL +
              `/${store.getState().authPage.currentLogin?.avatarImage}`
            }
            style={{ width: "150px", height: "150px" }}
            roundedCircle
          />
        </Col>
        <Col md={{ span: 2, offset: 2 }}>
          {img ? (
            <Image
              src={img}
              style={{ width: "150px", height: "150px" }}
              roundedCircle
            />
          ) : (
            <></>
          )}
        </Col>
      </Row>
      <Row className="mb-2">
        <b style={{ color: "red" }}>{errorMsg}</b>
      </Row>
      <Row className="mb-2">
        <b style={{ color: "lime" }}>{msg}</b>
      </Row>
      <Row>
        <Col>
          {isDisabledPutBtn ? (
            <Button disabled id={s.save_button}>
              Сохранить
            </Button>
          ) : (
            <Button id={s.save_button} onClick={editProfile}>
              Сохранить
            </Button>
          )}
        </Col>
        <Col>
          <Link to={PROFILE_ROUTE + `/${curLogin?.id}`}>
            <Button  id={s.back_button}>Вернуться</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Edit;

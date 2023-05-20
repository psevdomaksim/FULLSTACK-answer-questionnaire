import React from "react";
import s from "../css/Profile.module.css";
//import ProfileComponent from "../components/Profile/ProfileComponent";
import { useContext } from "react";
import { StoreContext } from "..";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useEffect } from "react";
import { fetchOneUserTC } from "../Redux/ActionCreators/userAC";
import { BASE_URL } from "../utils/baseURL_const";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { EDIT_PROFILE_ROUTE } from "../utils/routes_consts";
import {
  clearQuestionsAC,
  fetchQuestionsTC,
} from "../Redux/ActionCreators/questionAC";
import {
  fetchAnswersCountTC,
  fetchAnswersTC,
} from "../Redux/ActionCreators/answerAC";
import UserQuestionList from "../components/UsersQuestions/UserQuestionList";
import { useRef } from "react";
import AnswerList from "../components/AnswerList/AnswerList";

const Profile = (props) => {
  const { id } = useParams();
  const trigger = useRef(null);
  const store = useContext(StoreContext);

  const [curUser, setCurUser] = useState(null);

  const [isAnswers, setIsAnswers] = useState(false);

  const [userQuestionsCount, setUserQuestionsCount] = useState(null);

  const [userAnswersCount, setUserAnswersCount] = useState(null);
  const [bestAnswer, setBestAnswer] = useState(null);

  const fetchUser = () => {
    store.dispatch(fetchOneUserTC(id));
  };

  const fetchProfileAnswers = () => {
    store.dispatch(fetchAnswersTC(null, +id));
    store.dispatch(fetchAnswersCountTC(null, +id));
  };

  useEffect(() => {
    fetchUser();
    fetchProfileAnswers();
  }, [id]);

  store.subscribe(() => {
    setCurUser(store.getState().userPage.currentUser);
    setUserQuestionsCount(store.getState().questionPage.count);
    setUserAnswersCount(store.getState().answerPage.count);
    setBestAnswer(store.getState().answerPage.bestAnswer);
  });

  const formatDate = (propsDate) => {
    const date = new Date(Date.parse(propsDate));
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return date.toLocaleString("ru", options);
  };

  return (
    <div className={s.main_wrapper}>
      {/* Блок профиля и кол-во заданных вопросов (стата крч) */}
      <Container className={s.info_block}>
        <Row>
          {/* Профиль с возможностью редактирования */}
          <Col>
            <Container className={s.profile_block}>
              <Row>
                <Col className={s.profile_left_col}>
                  <Image
                    src={BASE_URL + `/${curUser?.avatarImage}`}
                    style={{ width: "120px", height: "120px" }}
                    roundedCircle
                  />
                  <p id={s.member_text}>
                    Участник проекта с {formatDate(curUser?.createdAt)}
                  </p>
                </Col>
              </Row>

              <div className={s.profile}>
                {store.getState().authPage.currentLogin?.id === +id ? (
                  <Link to={EDIT_PROFILE_ROUTE + `/${id}`}>
                    <Button style={{width:"70px", height:"30px"}} variant="secondary">Редактировать</Button>
                  </Link>
                ) : (
                  <></>
                )}
                <Row>
                <Col>
                <h2>{curUser?.fullname}</h2>
                </Col>
                <Col>
                 {curUser?.role !== "USER" ? <p>{curUser?.role}</p> : <></>}
                </Col>
               
                </Row>
                
                <p>{curUser?.status}</p>
              </div>
            </Container>
          </Col>
          {/* Блок профиля КОНЕЦ */}

          {/* Блок с количеством вопросов */}
          <Col className={s.question_block}>
            <h3>Вопросов задано:</h3>
            <span id={s.number}>{userQuestionsCount}</span>
            <h3>Ответов написано:</h3>
            <span id={s.number}>{userAnswersCount}</span>
          </Col>
          {/* Блок с вопросами КОНЕЦ */}
        </Row>
      </Container>

      {/* Активность пользователя */}
      <div className={s.activity_block}>
        <h3>Активность пользователя</h3>
        <Container>
          <Row>
            {!isAnswers ? (
              <>
                <Col xs="2">
                  <span className={s.active_span}>Вопросы</span>
                </Col>
                <Col xs="2">
                  <span
                    id={s.tab}
                    onClick={() => (
                      setIsAnswers(true), store.dispatch(clearQuestionsAC())
                    )}
                  >
                    Ответы
                  </span>
                </Col>
              </>
            ) : (
              <>
                <Col xs="2">
                  <span onClick={() => setIsAnswers(false)}>Вопросы</span>
                </Col>
                <Col xs="2">
                  <span id={s.tab} className={s.active_span}>
                    Ответы
                  </span>
                </Col>
              </>
            )}
          </Row>
          <Row>
            {!isAnswers ? (
              <>
                <UserQuestionList id={+id} trigger={trigger} profileQuestions />
                <div ref={trigger} className="trigger"></div>
              </>
            ) : (
              <AnswerList profileAnswers bestAnswer={bestAnswer} userId={id} />
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Profile;

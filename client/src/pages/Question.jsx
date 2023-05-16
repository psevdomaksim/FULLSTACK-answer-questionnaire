import React from "react";
import s from "../css/QuestionPage.module.css";
import AnswerList from "../components/AnswerList/AnswerList";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "..";
import { useEffect } from "react";
import { fetchOneQuestionTC } from "../Redux/ActionCreators/questionAC";
import {
  addNewAnswerTC,
  fetchAnswersTC,
} from "../Redux/ActionCreators/answerAC";
import { useState } from "react";
import UserQuestion from "../components/UsersQuestions/UserQuestion";
import { Button, Container, Form, Row } from "react-bootstrap";

const Question = (props) => {
  const { id } = useParams();

  const store = useContext(StoreContext);

  const [curQuestion, setCurQuestion] = useState(null);

  const [questionAnswers, setQuestionAnswers] = useState(null);
  const [questionAnswersCount, setQuestionAnswersCount] = useState(null);
  const [bestAnswer, setBestAnswer] = useState(null);

  const [body, setBody] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchQuestion = () => {
    store.dispatch(fetchOneQuestionTC(id));
  };

  const fetchQuestionAnswers = () => {
    store.dispatch(fetchAnswersTC(id, null));
  };

  useEffect(() => {
    fetchQuestion();
    fetchQuestionAnswers();
  }, []);

  store.subscribe(() => {
    setCurQuestion(store.getState().questionPage.curQuestion);
    setQuestionAnswers(store.getState().answerPage.answers);
    setQuestionAnswersCount(store.getState().answerPage.count);
    setBestAnswer(store.getState().answerPage.bestAnswer)
    setErrorMsg(store.getState().answerPage.error);
    setSuccessMsg(store.getState().answerPage.msg);
  });

  const onChange = (event) => {
    setErrorMsg("");
    setSuccessMsg("");
    if (event.target.id == "body") {
      setBody(event.target.value);
    }
  };

  const sendAnswer = () => {
    setBody("");
    store.dispatch(addNewAnswerTC(body, +id));
  
  };

  return (
      <Container className={s.wrapper}>
        <UserQuestion
          key={curQuestion?.id}
          question={curQuestion}
        />

        <div className={s.textarea_wrapper}>
          <Form.Control
            as="textarea"
            placeholder="Ваш ответ..."
            rows={4}
            value={body}
            className={s.textarea}
            id="body"
            onChange={onChange}
          />
          <Row className="mb-2">
            {" "}
            <b style={{ color: "lime" }}>{successMsg}</b>
          </Row>
          <Row className="mb-2">
            {" "}
            <b style={{ color: "red" }}>{errorMsg}</b>
          </Row>
          <Button variant="dark" className="mt-3" onClick={sendAnswer}>
            Отправить
          </Button>
        </div>
        <div className={s.users_question_wrapper}>
          <h3>Ответы пользователей</h3>
          <AnswerList bestAnswer={bestAnswer} answers={questionAnswers}  />
        </div>
      </Container>
  );
};

export default Question;

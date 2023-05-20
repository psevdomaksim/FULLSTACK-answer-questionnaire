import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { StoreContext } from "..";
import s from "../css/NewQuestion.module.css";
import { fetchCategoriesTC } from "../Redux/ActionCreators/categoryAC";
import { addNewQuestionTC } from "../Redux/ActionCreators/questionAC";

const NewQuestion = (props) => {
  const store = useContext(StoreContext);

  const [categories, setCategories] = useState([]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState(null);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchCategories = () => {
    setCategories(store.getState().categoryPage.categories);
    setCategory(store.getState().categoryPage.categories[0].id);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  store.subscribe(() => {
    setCategories(store.getState().categoryPage.categories);
    setCategory(store.getState().categoryPage.categories[0].id);
    setErrorMsg(store.getState().questionPage.error);
    setSuccessMsg(store.getState().questionPage.msg)
  });

  const onChange = (event) => {
    setErrorMsg("");
    setSuccessMsg("");
    if (event.target.id == "title") {
      setTitle(event.target.value);
    } else if (event.target.id == "body") {
      setBody(event.target.value);
    } else if (event.target.id == "category") {
      setCategory(+event.target.value);
    }
  };

  const sendQuestion = () => {
    store.dispatch(addNewQuestionTC(title, body, category));
  };

  return (
    <Container className={s.quest_wrapper}>
      <Row className={s.item}>
        <Col>
          <span id={s.text}>Задать вопрос</span>
        </Col>
      </Row>
      <Row className={s.item}>
        <Col>
          <span id={s.small_text}>Категория</span>
        </Col>
        <Col>
          <Form.Select
            className={s.select_list}
            id="category"
            onChange={onChange}
            value={category}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <Row className={s.item}>
        <Col>
          <span id={s.small_text}>Вопрос</span>
        </Col>
        <Col>
          <Form.Control className={s.input} id="title" onChange={onChange}  value={title} />
        </Col>
      </Row>
      <Row className={s.item}>
        <Col>
          <span id={s.small_text}>Текст вопроса</span>
        </Col>
        <Col>
          <Form.Control
            as="textarea"
            rows={3}
            className={s.textarea}
            id="body"
            value={body}
            onChange={onChange}
          />
        </Col>
      </Row>
      <Row className="mb-2">
        {" "}
        <b style={{ color: "lime" }}>{successMsg}</b>
      </Row>
      <Row className="mb-2">
        {" "}
        <b style={{ color: "red" }}>{errorMsg}</b>
      </Row>
      <Row className={s.row}>
        <Col className={s.col}>
          <Button id={s.publish} onClick={sendQuestion}>
            Опубликовать
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NewQuestion;

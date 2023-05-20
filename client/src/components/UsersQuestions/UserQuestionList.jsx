import React, { useContext } from "react";
import UserQuestion from "./UserQuestion";
import s from "../../css/UsersQuestionList.module.css";
import { useState } from "react";
import { fetchQuestionsTC } from "../../Redux/ActionCreators/questionAC";
import { fetchAnswersTC } from "../../Redux/ActionCreators/answerAC";
import { StoreContext } from "../..";
import { useEffect } from "react";
import { useRef } from "react";
import { addReportTC } from "../../Redux/ActionCreators/reportAC";

const UserQuestionList = (props) => {
  const store = useContext(StoreContext);
  const [userQuestions, setUserQuestions] = useState(null);

  const [limit, setLimit] = useState(store.getState().questionPage?.limit);
  const [page, setPage] = useState(store.getState().questionPage?.page);
  const [loadData, setLoadData] = useState(true);

  const observer = useRef(null);

  const fetchQuestions = () => {
    setLoadData(true);
    store.dispatch(fetchQuestionsTC(null, null, limit, page));
    setLoadData(false);
  };

  const fetchProfileQuestions = () => {
    setLoadData(true);
    store.dispatch(fetchQuestionsTC(null, props.id, limit, page));
    setLoadData(false);
  };

  useEffect(() => {
      if (!props.profileQuestions) {
        fetchQuestions();
      }

      if (props.profileQuestions) {
        fetchProfileQuestions();
      }
  }, [page]);

  useEffect(() => {
    if (!props.trigger && loadData && !page) return;
    if (observer.current) observer.current.disconnect();
    if (page > limit) return;
    const callback = function (entries, observer) {
      if (entries[0].isIntersecting) {
        setPage((page) => page + 1);
      }
    };
    observer.current = new IntersectionObserver(callback);
    observer.current.observe(props.trigger.current);
  }, []);

  store.subscribe(() => {
    setUserQuestions(store.getState().questionPage.questions);
  });


  const addReport = (questionId) => {
    if (window.confirm("Пожаловаться на вопрос?")) {
      store.dispatch(addReportTC(null, questionId));
    }
  };

  return (
    <div className={s.list_wrapper}>
      {userQuestions?.map((question) => (
        <UserQuestion addReport={addReport} question={question} />
      ))}
    </div>
  );
};

export default UserQuestionList;

import React from "react";
import UsersQuestionBlock from "../UsersQuestions/UsersQuestionList";
import style from "../../css/HomePage.module.css";
import ActiveUsersList from "../ActiveUsers/ActiveUsersList";
import AddQuestionList from "../AddQuestion/AddQuestionList";

const HomePage = (props) => {
  return (
    <div className={style.home_page_wrapper}>
        <AddQuestionList />
        <ActiveUsersList />
        <UsersQuestionBlock />
      <div>
        <button>Типа стрелка вверх</button>
      </div>
    </div>
  );
};

export default HomePage;

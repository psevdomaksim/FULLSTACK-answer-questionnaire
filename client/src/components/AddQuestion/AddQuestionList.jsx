import React from "react";
import style from "../../css/AddQuestion.module.css";

const AddQuestionList = (props) => {
  return (
    <div className={style.wrapper}>
      <h3>Есть вопрос?</h3>
      <h3>Спроси у сообщества</h3>
      <button>Спросить</button>
    </div>
  );
};

export default AddQuestionList;

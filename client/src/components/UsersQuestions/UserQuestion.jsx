import React from "react";
import ava from "../../img/ava.jpg"
import s from "../../css/UsersQuestion.module.css"

const UserQuestion = (props) => {
    return(
        <div className={s.wrapper}>
            <div>
                <h4>Название вопроса</h4>
                <div className={s.question_container}>
                    <img className={s.ava} src={ava} />
                    <p>Подробнее о вопросе</p>
                </div>
                <div>
                    <p className={s.signature}>Пользователь, время, категория</p>
                </div>
            </div>
        </div>
    )
}

export default UserQuestion;
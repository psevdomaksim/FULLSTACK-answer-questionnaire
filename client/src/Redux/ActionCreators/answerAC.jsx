import { addNewAnswer, fetchAnswers, fetchAnswersCount } from "../../http/answerAPI";
import {
  dislikeAnswer,
  fetchAnswerLikes,
  likeAnswer,
} from "../../http/answerLikeAPI";
import { fetchOneCategory } from "../../http/categoryAPI";
import { fetchOneUser } from "../../http/userAPI";
import {
  ADD_ANSWER,
  API_ERROR,
  CLEAR_ANSWERS,
  CLEAR_MSG,
  DATE_OPTIONS,
  DISLIKE_ANSWER,
  FETCH_ANSWERS,
  FETCH_ANSWERS_COUNT,
  GET_BEST_ANSWER,
  LIKE_ANSWER,
} from "../../utils/AC_consts";

// error
export const ApiError = (data) => {
  return {
    type: API_ERROR,
    data: data,
  };
};




// fetch answers
export const fetchAnswersAC = (data) => {
  return {
    type: FETCH_ANSWERS,
    data: data,
  };
};

export const fetchAnswersTC = (questionId, userId) => {
  return (dispatch) => {
    fetchAnswers(questionId, userId)
      .then((answers) => {
        answers.rows.map((answer) => {
          const date = new Date(Date.parse(answer.createdAt));
          answer.createdAt = date.toLocaleString("ru", DATE_OPTIONS);
        });
        if (answers.rows.length !== 0) {
          dispatch(
            getBestAnswerAC(
              answers.rows.reduce((prev, current) =>
                +prev.likeCount > +current.likeCount ? prev : current
              )
            )
          );
        } else {
          dispatch(getBestAnswerAC(null));
        }
        dispatch(fetchAnswersAC(answers));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//
export const fetchAnswersCountAC = (count) => {
  return {
    type: FETCH_ANSWERS_COUNT,
    count: count,
  };
};


export const fetchAnswersCountTC = (questionId, userId) => {
  return (dispatch) => {
    fetchAnswersCount(questionId, userId)
      .then((count) => {
        dispatch(fetchAnswersCountAC(count));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};



//get best answer

export const getBestAnswerAC = (answer) => {
  return {
    type: GET_BEST_ANSWER,
    answer: answer,
  };
};

export const clearAnswerMessagesAC = () => {
  return {
    type: CLEAR_MSG,
  };
};

// add new answer

export const addNewAnswerAC = (data) => {
  return {
    type: ADD_ANSWER,
    answer: data.answer,
    message: data.message,
  };
};

export const addNewAnswerTC = (body, questionId) => {
  return (dispatch) => {
    addNewAnswer(body, questionId)
      .then((data) => {
        const date = new Date(Date.parse(data.answer.createdAt));
        data.answer.createdAt = date.toLocaleString("ru", DATE_OPTIONS);
        dispatch(addNewAnswerAC(data));
      })
      .catch((err) => {
        dispatch(ApiError(err.response.data.message));
      });
  };
};

// like answer

export const likeAnswerAC = (data) => {
  return {
    type: LIKE_ANSWER,
    data: data,
  };
};

export const likeAnswerTC = (answerId) => {
  return (dispatch) => {
    likeAnswer(answerId)
      .then((data) => {
        dispatch(likeAnswerAC(data));
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
};
///

export const clearAnswersAC = () => {
  return {
    type: CLEAR_ANSWERS,
  };
};


// dislike answer

export const dislikeAnswerAC = (answerId) => {
  return {
    type: DISLIKE_ANSWER,
    answerId: answerId,
  };
};

export const dislikeAnswerTC = (answerId) => {
  return (dispatch) => {
    dislikeAnswer(answerId)
      .then((data) => {
        dispatch(dislikeAnswerAC(answerId));
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
};

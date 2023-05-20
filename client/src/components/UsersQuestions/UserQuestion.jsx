import React from "react";
import s from "../../css/UsersQuestion.module.css";
import { GoReport } from "react-icons/go";
import { FaCommentDots } from "react-icons/fa";
import { Col, Row, Stack, Image, Container } from "react-bootstrap";
import { BASE_URL } from "../../utils/baseURL_const";
import { PROFILE_ROUTE, QUESTION_PAGE_ROUTE } from "../../utils/routes_consts";
import { Link } from "react-router-dom";

const UserQuestion = (props) => {
  return (
    <Container className={s.wrapper}>
      <Row>
        <Col className={s.question_title}>
          <Link to={QUESTION_PAGE_ROUTE + `/${props.question?.id}`}>
            <h4>{props.question?.title}</h4>
          </Link>

          <GoReport xs={{ offset: 10 }} md={{ span: 2, offset: 11 }} className="mt-2" onClick={()=>props.addReport(props.question?.id)} style={{ color: "white", cursor:"pointer" }} size={24} />
        </Col>
      </Row>
       
          <Link to={PROFILE_ROUTE + `/${props.question?.user?.id}`}>
            <Image
              src={BASE_URL + `/${props.question?.user?.avatarImage}`}
              className="me-2"
              style={{ width: "50px", height: "50px", float:"left" }}
              roundedCircle
            />
          </Link>
    
          {" "}
          <p style={{minHeight:"50px"}}> {props.question?.body}</p>{" "}
       
     

      <Stack direction="horizontal" gap={4} className={s.signature_block}>
          <span className={s.signature}>{props.question?.user?.fullname}</span>
          <span className={s.signature}>{props.question?.createdAt}</span>
          <span className={s.signature}>{props.question?.category?.name}</span>
        <span style={{ color: "white"}}>{props.question?.answersCount} 
        
        <Link to={QUESTION_PAGE_ROUTE + `/${props.question?.id}`}> <FaCommentDots  style={{ color: "white" }} size={24} /></Link>
        </span>
      </Stack>
    </Container>
  );
};

export default UserQuestion;

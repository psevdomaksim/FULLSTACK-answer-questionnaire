import React from "react";
import { Col, Container, Image, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import s from "../../css/Answer.module.css";
import { FcLike, FcDislike } from "react-icons/fc";
import { GoReport } from "react-icons/go";
import { BASE_URL } from "../../utils/baseURL_const";
import { PROFILE_ROUTE } from "../../utils/routes_consts";
import { useState } from "react";

const Answer = (props) => {
  return (
    <Container className="mb-3">
      <Row>
        <Col xs={{ offset: 10 }} md={{ span: 2, offset: 11 }}>
          <GoReport
            onClick={() => props.addReport(props.answer?.id)}
            style={{ color: "white", cursor: "pointer" }}
            size={24}
          />
        </Col>
      </Row>
      <Link to={PROFILE_ROUTE + `/${props.answer?.user?.id}`}>
        <Image
          src={BASE_URL + `/${props.answer?.user?.avatarImage}`}
          className="me-2"
          style={{ width: "50px", height: "50px", float: "left" }}
          roundedCircle
        />
      </Link>
      <p style={{minHeight:"50px"}}>{props.answer?.body}</p>{" "}
      <Row style={{ color: "#747474" }} className="mb-2">
        <Col xs={4} md={2}>
          {props.answer?.user?.fullname}
        </Col>
        <Col xs={5} md={8}>
          {props.answer?.createdAt}
        </Col>

        <Col xs={3} md={2}>
          {props.answer?.likeCount}
          {props.answer?.isLiked === 1 ? (
            <FcLike
              style={{ cursor: "pointer" }}
              size={24}
              onClick={() => props.dislikeAnswer(props.answer?.id)}
            />
          ) : (
            <FcDislike
              style={{ cursor: "pointer" }}
              size={24}
              onClick={() => props.likeAnswer(props.answer?.id)}
            />
          )}
        </Col>
      </Row>
      <hr style={{ border: "#747474 2px solid" }} />
    </Container>
  );
};

export default Answer;

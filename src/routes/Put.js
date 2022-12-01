import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  background-color: #eace37;
  width: 100%;
  height: 100vh;
  position: relative;
`;

const InnerBox = styled.div`
  background-color: #eeeeee;
  padding-top: 50px;
  position: absolute;
  top: 30%;
  left: 30%;
  margin: -50px 0 0 -50px;
  width: 55%;
  height: auto;
  border-radius: 15px;
  input {
    width: 95%;
    border: 1px solid #e6e6e6;
    background-color: #f3f3f3;
    border: none;
    height: 40px;
    border-radius: 8px;
    margin: 15px;
    font-size: 16px;
    padding: 15px;
    color: black;
  }

  input::placehorder {
    color: white;
  }

  select {
    width: 35%;
    height: 35px;
    border-radius: 8px;
    padding: 5px;
  }

  textarea {
    width: 95%;
    border: 1px solid #e6e6e6;
    background-color: #f3f3f3;
    border: none;
    height: 200px;
    border-radius: 8px;
    margin: 15px;
    font-size: 16px;
    padding: 15px;
  }
`;

const CreateButton = styled.button`
  border-radius: 10px;
  height: 40px;
  width: 85px;
  font-size: 16px;
  padding: 5px;
  background-color: #4d68cd;
  border: none;
  color: white;
  margin: 10px;

  &:hover {
    box-shadow: 200px 0 0 0 rgba(0, 0, 0, 0.5) inset;
  }
`;

const RemoveButton = styled.button`
  background-color: #dd4c34;
  border-radius: 10px;
  height: 40px;
  width: 100px;
  font-size: 14px;
  padding: 5px;
  border: none;
  color: white;
  margin: 10px;

  &:hover {
    box-shadow: 200px 0 0 0 rgba(0, 0, 0, 0.5) inset;
  }
`;

const Put = () => {
  let content = useRef();
  let navigate = useNavigate();
  let { id } = useParams();
  let title = useRef();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/put/${id}`)
      .then((result) => {
        title.current.value = result.data[0].title;
        content.current.value = result.data[0].content;
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const clickDone = () => {
    axios
      .put(`http://localhost:8080/put/${id}`, {
        title: title.current?.value,
        content: content.current?.value,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    navigate("/");
  };

  const clickDelete = () => {
    axios
      .delete(`http://localhost:8080/delete/${id}`)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
    navigate("/");
  };

  return (
    <div>
      <Container>
        <InnerBox>
          <div className="title">
            <h1>Notes App</h1>
            <p>Take Notes and never forget.</p>
          </div>
          <input placeholder="None title" ref={title}></input>
          <div>
            <textarea placeholder="Enter note text" ref={content}></textarea>
          </div>
          <div className="remove">
            <RemoveButton onClick={clickDelete}>Remove note</RemoveButton>
            <CreateButton onClick={clickDone}>Done</CreateButton>
          </div>
        </InnerBox>
      </Container>
    </div>
  );
};

export default Put;

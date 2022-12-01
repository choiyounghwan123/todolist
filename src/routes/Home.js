import axios from "axios";
import { set } from "lodash";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    width: 60%;
    background-color: #e0e0e0;
    border: none;
    height: 40px;
    border-radius: 8px;
    margin: 10px;
    font-size: 20px;
    padding: 15px;
  }

  select {
    width: 35%;
    height: 35px;
    border-radius: 8px;
    padding: 5px;
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

const Content = styled.div`
  background-color: #f4f4f4;
  width: 95%;
  margin: auto;
  border-radius: 10px;
  padding: 15px;
  p {
    color: #979797;
  }
`;

const Home = () => {
  let [number, setnumber] = useState([]);
  let [title, setTitle] = useState([]);
  let [content, setContent] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080")
      .then((result) => {
        result.data.map((a, i) => {
          setnumber((number) => [...number, a.number]);
          setTitle((title) => [...title, a.title]);
          setContent((content) => [...content, a.content]);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container>
      <InnerBox>
        <div className="title">
          <h1>Notes App</h1>
          <p>Take Notes and never forget.</p>
        </div>

        <input type="text" placeholder="search"></input>
        <select>
          <option>Sort by last edited</option>
        </select>

        {number.map((a, i) => {
          return (
            <Content
              key={i}
              onClick={() => {
                navigate(`/put/${i}`);
              }}
            >
              <h2>{title[i]}</h2>
              <p>{content[i]}</p>
            </Content>
          );
        })}
        <div className="button-div">
          <CreateButton>
            <Link
              to="/write"
              style={{ color: "white", textDecoration: "none" }}
            >
              Create
            </Link>
          </CreateButton>
        </div>
      </InnerBox>
    </Container>
  );
};

export default Home;

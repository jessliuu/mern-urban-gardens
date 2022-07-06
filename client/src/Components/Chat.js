import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Card,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "../Styles/Chat.css";
import { AuthContext } from "../Contexts/AuthContext";
import ChatIndividual from "./ChatIndividual";

const Chat = (props) => {
  const params = props.params;
  const paramsNumber = params.gardenid;
  console.log(paramsNumber);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState();

  const { userProfile, getToken } = useContext(AuthContext);
  const token = getToken();
  const options = {
    method: "GET",
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/comment/getcomments?myGardenID=${paramsNumber}`,
        options
      );
      console.log("response", response);
      const data = await response.json();
      const cleandata = data.comments;
      console.log("comment data", cleandata);
      setComments(cleandata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const urlencoded = new URLSearchParams({
      authorid: userProfile.id,
      commentText: newComment,
      commentDate: new Date(),
      gardenid: paramsNumber,
    });

    const requestOptions = {
      method: "POST",
      body: urlencoded,
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await fetch(
        "http://localhost:5001/api/comment/postcomment",
        requestOptions
      );
      const results = await response.json();
      console.log("results", results);
    } catch (error) {
      console.log("error posting this comment", error);
    }
    setNewComment("");
  };

  // const messageDate = (date) => {
  //   return new Date(date).toLocaleTimeString();
  // };

  return (
    <div>
      <h1 className="fs-1 fw-bold pt-5 text-center">Chat</h1>
      <ol className="messages">
        {comments &&
          comments.map((c) => {
            return <ChatIndividual info={c} />;
          })}
      </ol>

      <InputGroup className="p-3">
        <FormControl
          placeholder="Enter your message..."
          aria-label="Enter your message..."
          aria-describedby="basic-addon1"
          value={newComment}
          onChange={handleCommentChange}
          onKeyDown={(e) => e.key === "Enter" && handleSubmitComment()}
        />
        {/* <Button variant="danger" onClick={handleChatMessageSubmit}> */}
        <Button variant="danger" type="submit" onClick={handleSubmitComment}>
          Send
        </Button>
      </InputGroup>
    </div>
  );
};

export default Chat;
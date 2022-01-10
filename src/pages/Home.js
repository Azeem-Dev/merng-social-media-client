import { useEffect, useState } from "react";
import "./Home.css";
import EmojiTextarea from "react-emoji-textarea";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Row, Col, Button, Tooltip, Modal, Input } from "antd";
import { RocketTwoTone, HeartTwoTone } from "@ant-design/icons";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import PostCard from "../components/PostCard/PostCard";
import { getUserDataFromMemory } from "../utils/getUserData";
import { OpenErrorNotification } from "../components/Notification/Notification";
import Loader from "../components/Loader/Loader";
const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [PostBody, setPostBody] = useState("");
  const [AddPost, response] = useMutation(ADD_POST, {
    // Then re-run
    refetchQueries: [{ query: FETCH_POSTS_QUERY }],
  });
  const [showEmojis, setShowEmojis] = useState(false);

  useEffect(() => {
    if (
      response.called == true &&
      response.loading == false &&
      response.error == undefined
    ) {
    }
  }, [response.data]);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    if (PostBody == "") {
      OpenErrorNotification(
        "Please enter something in the post body",
        "Post Body Empty"
      );
      return;
    }
    AddPost({
      variables: {
        body: PostBody,
      },
    });
    setPostBody("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setPostBody("");
  };

  const [user, setUser] = useState(undefined);
  let Posts = [];
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  useEffect(() => {
    let userInfo = getUserDataFromMemory();
    if (userInfo != {} || userInfo != undefined) {
      setUser(userInfo);
    }
  }, []);
  useEffect(() => {
    if (loading) {
      setIsLoading(true);
      return;
    }
    setIsLoading(false);
    Posts = data?.getPosts;
  }, [data, loading]);

  if (!loading) {
    Posts = data?.getPosts;
  }
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setPostBody(PostBody + emoji);
  };

  return (
    <div>
      {user?.id != null && user?.token != null && (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <Tooltip title="Add Post" color={"#2db7f5"} key={"#2db7f5"}>
            <Button
              type="primary"
              shape="circle"
              icon={<RocketTwoTone style={{ fontSize: "32px" }} />}
              size={"large"}
              onClick={showModal}
            />
          </Tooltip>
        </div>
      )}

      <Modal
        title="ADD POST"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input.Group compact>
          <Input.TextArea
            style={{ width: "85%", marginRight: "10px" }}
            placeholder="Such a wonderous place to share your thoughts"
            autoSize
            value={PostBody}
            onChange={(e) => setPostBody(e.target.value)}
          />
          <Tooltip
            placement="bottom"
            title="emojis"
            color="#2db7f5"
            style={{
              fontWeight: "800",
            }}
          >
            <HeartTwoTone
              style={{ fontSize: "26px" }}
              twoToneColor="#E71D36"
              onClick={() => setShowEmojis(!showEmojis)}
            />
          </Tooltip>
        </Input.Group>
        {showEmojis && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Picker
              onSelect={addEmoji}
              style={{ marginRight: "30px", marginTop: "10px", height: "20%" }}
            />
          </div>
        )}
      </Modal>

      {!isLoading ? (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="d-flex-row">
          {Posts?.map((post) => (
            <Col
              className="gutter-row"
              span={8}
              key={post.id}
              style={{
                width: "300px !important",
                maxWidth: "300px !important",
              }}
            >
              <PostCard post={post} />
            </Col>
          ))}
        </Row>
      ) : (
        <Loader />
      )}
    </div>
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        id
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
      likeCount
      commentCount
    }
  }
`;
const ADD_POST = gql`
  mutation AddPost($body: String!) {
    createPost(body: $body) {
      id
      body
      comments {
        id
        username
        createdAt
        body
      }
      likes {
        id
        username
      }
    }
  }
`;

export default Home;

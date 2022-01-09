import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Form, Input, Button, Checkbox, Alert } from "antd";
import { gql, useMutation } from "@apollo/client";
import { MehTwoTone } from "@ant-design/icons";
import "./LoginForm.css";
import Loader from "../Loader/Loader";
import {
  AUTH_TOKEN_KEY,
  USER_EMAIL_KEY,
  USER_ID_KEY,
  USER_NAME_KEY,
} from "../../utils/constants";
const LoginForm = () => {
  let navigate = useNavigate();
  const [LoginUser, response] = useMutation(LOGIN_USER);
  const [Loading, setLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (response.called == true && response.loading == false) {
      setLoading(false);
      if (response.error != undefined) {
        setisError(true);
        setErrors(response.error.graphQLErrors[0].extensions.errors);
        return;
      }
      localStorage.setItem(AUTH_TOKEN_KEY, response.data.login.token);
      localStorage.setItem(USER_ID_KEY, response.data.login.id);
      localStorage.setItem(USER_EMAIL_KEY, response.data.login.email);
      localStorage.setItem(USER_NAME_KEY, response.data.login.username);
      navigate("/");
    }
  }, [response]);
  const onFinish = (values) => {
    setLoading(true);
    const { username, password } = values;
    LoginUser({
      variables: {
        username,
        password,
      },
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "80vh",
      }}
    >
      {!Loading ? (
        <Form
          name="login"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="on"
          style={{
            width: "40vw",
          }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 8, span: 16 }}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Loader />
      )}
      {isError &&
        Object.values(errors).map((error) => (
          <Alert
            key={error}
            message="Error"
            description={error}
            type="error"
            showIcon
            closable
            icon={<MehTwoTone />}
          />
        ))}
    </div>
  );
};

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      token
    }
  }
`;
export default LoginForm;

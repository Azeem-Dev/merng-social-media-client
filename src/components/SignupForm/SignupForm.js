import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Form, Input, Alert, Button } from "antd";
import { gql, useMutation } from "@apollo/client";
import { MehTwoTone } from "@ant-design/icons";
import Loader from "../Loader/Loader";
import {
  AUTH_TOKEN_KEY,
  USER_EMAIL_KEY,
  USER_ID_KEY,
  USER_NAME_KEY,
} from "../../utils/constants";
const SignupForm = () => {
  let navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [errors, setErrors] = useState({});
  const [signUpUser, response] = useMutation(REGISTER_USER);
  useEffect(() => {
    if (response.called == true && response.loading == false) {
      setLoading(false);
      if (response.error != undefined) {
        setisError(true);
        setErrors(response.error.graphQLErrors[0].extensions.errors);
        return;
      }
      localStorage.setItem(AUTH_TOKEN_KEY, response.data.register.token);
      localStorage.setItem(USER_ID_KEY, response.data.register.id);
      localStorage.setItem(USER_EMAIL_KEY, response.data.register.email);
      localStorage.setItem(USER_NAME_KEY, response.data.register.username);
      navigate("/");
    }
  }, [response]);
  const onFinish = (values) => {
    const { username, email, password, confirmPassword } = values;
    signUpUser({
      variables: {
        userdata: {
          username,
          email,
          password,
          confirmPassword,
        },
      },
    });
    setLoading(true);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "80vh",
      }}
    >
      {!Loading ? (
        <Form
          name="signup"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="on"
          scrollToFirstError
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
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 8, span: 16 }}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button type="primary" htmlType="submit">
              Register
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

const REGISTER_USER = gql`
  mutation SignUpUser($userdata: RegisterInput) {
    register(registerInput: $userdata) {
      id
      email
      username
      token
    }
  }
`;
export default SignupForm;

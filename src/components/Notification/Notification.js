import { notification } from "antd";

export const OpenErrorNotification = (message, title) => {
  notification.error({
    message: title,
    description: message,
    style: {
      width: 400,
    },
  });
};

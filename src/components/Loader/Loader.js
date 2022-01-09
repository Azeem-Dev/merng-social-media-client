import { Spin } from "antd";
import { StarTwoTone } from "@ant-design/icons";

const Loader = () => {
  const antIcon = <StarTwoTone style={{ fontSize: 100 }} spin />;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Spin indicator={antIcon} />
      <p
        style={{
          marginTop: "30px",
          fontSize: "48px",
          fontWeight: "200",
          userSelect: "none",
        }}
      >
        Loading...
      </p>
    </div>
  );
};

export default Loader;

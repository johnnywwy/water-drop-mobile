// import "./App.css";
// import { useQuery } from "@apollo/client";
import { Button, Form, Input } from "antd-mobile";
import { useMutation } from "@apollo/client";
import { UPDATE } from "./graphql/demo";

function App() {
  const [update] = useMutation(UPDATE);

  const onClickHandle = (v) => {
    console.log("onClickHandle", v);

    update({
      variables: {
        id: "84770e80-4952-40c7-8772-375413ffaecb",
        params: {
          ...v,
        },
      },
    });
  };

  return (
    <div>
      <Button color="primary" fill="solid">
        刷新
      </Button>
      <Form
        onFinish={onClickHandle}
        layout="horizontal"
        footer={
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        }
      >
        <Form.Header>水平布局表单</Form.Header>
        <Form.Item name="name" label="用户名" rules={[{ required: true, message: "姓名不能为空" }]}>
          <Input onChange={console.log} placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item name="desc" label="描述" rules={[{ required: true, message: "描述不能为空" }]}>
          <Input onChange={console.log} placeholder="请输入描述" />
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;

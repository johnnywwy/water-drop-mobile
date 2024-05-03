// import "./App.css";

import { useQuery } from "@apollo/client";
import { Button } from "antd-mobile";
import { FIND } from "./graphql/demo";

function App() {
  const { loading, data } = useQuery(FIND, {
    variables: {
      id: "79b308ad-8ef7-4031-beb3-1b5065cfa6ec",
    },
  });

  return (
    <div>
      <Button color="primary" fill="solid">
        Solid
      </Button>
      <p>loading: {`${loading}`}</p>
      <p> data: {JSON.stringify(data)}</p>
    </div>
  );
}

export default App;

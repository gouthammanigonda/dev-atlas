import { Button, Result } from "antd";
import { Link } from "react-router-dom";

import { MainLayout } from "../layouts";

const NotFound = () => (
  <MainLayout>
    <Result
      status="404"
      title="Page not found"
      subTitle="The page you requested does not exist."
      extra={
        <Button type="primary">
          <Link to="/">Back to discovery</Link>
        </Button>
      }
    />
  </MainLayout>
);

export default NotFound;

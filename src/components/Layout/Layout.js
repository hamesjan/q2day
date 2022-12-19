import { Fragment } from "react";

import MainNavigation from "./MainNavigation";
import Background from "./Background/Background";

const Layout = (props) => {
  return (
    <Fragment>
      <Background />
      <MainNavigation title={props.title} />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;

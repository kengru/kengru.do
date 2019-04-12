import React from "react";
import { Footer, Content } from "rbx";
import "rbx/index.css";

import "./FullFooter.css";

const FullFooter = () => {
  return (
    <Footer className="footer">
      <Content textAlign="centered">
        <p>
          <strong>kengru.do</strong> by{" "}
          <a href="https://github.com/kengru">Kendry Grullon</a>.
          <br />
          Created in 2019, using <a href="https://bulma.io">bulma.io</a>, with
          special help of the <a href="https://dfee.github.io/rbx/">rbx</a>{" "}
          library.
        </p>
      </Content>
    </Footer>
  );
};

export default FullFooter;

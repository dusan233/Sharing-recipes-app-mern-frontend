import React from "react";
import Footer from "../components/Footer/Footer";
const withFooter = Component => {
  return props => (
    <Component {...props}>
      <Footer />
    </Component>
  );
};

export default withFooter;

import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  let location = useLocation();
  if (location.pathname !== "/") {
    return (
      <footer className="text-muted  fixed-bottom ">
        <div className="container d-flex flex-column ">
          <p className="mt-5 mb-3 text-muted  text-center">Help &copy; 2021 </p>
        </div>
      </footer>
    );
  }
  return <></>;
};

export default Footer;

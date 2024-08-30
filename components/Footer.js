import React from "react";

const Footer = () => {
  const currentyear = new Date().getFullYear();
  return (
    <footer className="bg-blue-950 text-white flex justify-center h-14 items-center px-4">
      <p>Copyright &copy; {currentyear} Get me A Chai - All rights reserved</p>
    </footer>
  );
};

export default Footer;

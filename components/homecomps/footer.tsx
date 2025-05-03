import React from "react";

const Footer = () => {
  return (
    <div className="h-[20vh] flex flex-col justify-center items-center px-10 gap-5">
      <div className="flex justify-center items-center px-10 gap-50 font-medium">
        <div>About</div>
        <div>Contact</div>
        <div>Privacy</div>
        <div>Terms</div>
      </div>
      <div>© 2024 Acrilc. All rights reserved.</div>
    </div>
  );
};

export default Footer;

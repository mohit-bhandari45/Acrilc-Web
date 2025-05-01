import React from "react";

const Title = ({ title }: {title: string}) => {
  return <div className={`h-[10vh] font-bold text-2xl px-40 flex justify-start items-center`}>{title}</div>;
};

export default Title;

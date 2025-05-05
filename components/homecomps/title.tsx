import React from "react";

const Title = ({ title }: {title: string}) => {
  return (
    <div className={`min-h-[8vh] sm:min-h-[9vh] md:min-h-[10vh] 
                    font-bold text-xl sm:text-xl md:text-2xl 
                    px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 
                    flex justify-start items-center`}>
      {title}
    </div>
  );
};

export default Title;
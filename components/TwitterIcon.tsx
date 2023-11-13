import React from "react";

interface TwitterIconProps {
  image: string;
  count: number;
}
function TwitterIcon({ image, count }: TwitterIconProps) {
  return (
    <div className="flex flex-row items-center space-x-2">
      <img
        src={`/twitter-icons/${image}.svg`}
        alt="Reply"
        className="h-5 w-5"
      />
      <p className="text-sm font-bold text-[#67727E]">{count}</p>
    </div>
  );
}

export default TwitterIcon;

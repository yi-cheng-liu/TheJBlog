import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const about = ({ post }) => {
  const router = useRouter();

  useEffect(() => {
    document.title = "About"
  }, [])

  return (
    <div className="container m-auto px-10 mb-4">
      <div className="grid grid-cols-1 gap-12">
        About
      </div>
    </div>
  );
};

export default about;

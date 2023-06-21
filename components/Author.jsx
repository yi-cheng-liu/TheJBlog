import autoprefixer from 'autoprefixer';
import React from 'react'

const Author = ({author}) => {
  return (
    <div className="text-center p-6 relative rounded-2xl bg-black bg-opacity-25">
      <div className="flex flex-row items-start w-full">
        <div className="basis-1/4 flex flex-col items-center">
          <img
            alt={author.name}
            src={author.photo.url}
            unoptimized
            className="rounded-lg bg-white p-2 w-full"
          />
          <h3 className="flex mt-2 text-white text-xl font-bold">
            {author.name}
          </h3>
        </div>
        <p className="basis-3/4 self-center ml-4 text-white">
          {author.bio}
        </p>
      </div>
    </div>
  );
}

export default Author;

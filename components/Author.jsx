import React from 'react'

const Author = ({author}) => {
  return (
    <div className="text-center p-6 relative rounded-2xl bg-black bg-opacity-25">
      <div className="flex flex-row items-start w-full">
        <div className="basis-1/6 flex flex-col items-center">
          <img
            alt={author.name}
            src={author.photo.url}
            unoptimized={true.toString()}
            className="rounded-full bg-white p-2 w-full"
          />
          <h2 className="flex mt-2 text-white text-3xl font-bold">
            {author.name}
          </h2>
        </div>
        <p className="basis-5/6 self-center ml-4 text-white">
          {author.bio}
        </p>
      </div>
    </div>
  );
}

export default Author;

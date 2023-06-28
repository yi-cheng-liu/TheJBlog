import React from 'react';
import moment from 'moment';

const PostDetail = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      let elements = Array.isArray(text) ? text : [text];

      elements = elements.map((el, i) => {
        let formattedEl = el;

        if (obj.bold) {
          formattedEl = <b key={`${index}-b-${i}`}>{formattedEl}</b>;
        }

        if (obj.italic) {
          formattedEl = <em key={`${index}-em-${i}`}>{formattedEl}</em>;
        }

        if (obj.underline) {
          formattedEl = <u key={`${index}-u-${i}`}>{formattedEl}</u>;
        }

        return formattedEl;
      });

    }

    switch (type) {
      case "heading-one":
        return (
          <h1 key={index} className="text-3xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h1>
        );
      case "heading-two":
        return (
          <h2 key={index} className="text-2xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h2>
        );
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );

      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "heading-five":
        return (
          <h5 key={index} className="text-sm font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h5>
        );
      case "heading-six":
        return (
          <h6 key={index} className="text-xs font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h6>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "bold":
        return (
          <strong key={index} className="mb-8">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </strong>
        );
      case "italic":
        return (
          <em key={index} className="mb-8">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </em>
        );
      case "image":
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );

      case "code":
        return <code key={index}>{modifiedText}</code>;

      case "back-quote":
        return <blockquote key={index}>{modifiedText}</blockquote>;

      case "link":
        return (
          <a key={index} href={obj.href}>
            {modifiedText}
          </a>
        );

      case "numbered-list":
        return (
          <ol key={index}>
            {modifiedText.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        );

      case "bulleted-list":
        return (
          <ul key={index}>
            {modifiedText.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );

      default:
        return modifiedText;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl lg:p-6 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-center h-full rounded-t-2xl"
        />
      </div>

      <div className="px-4 lg:px-0">
        <div className="block lg:flex text-left items-center justify-left lg:mb-4 mb-2 w-full gap-6">
          {/* author */}
          <div className="flex items-center mb-2 lg:mb-0 w-full lg:w-auto ">
            <img
              src={post.author.photo.url}
              alt={post.author.name}
              className="align-middle rounded-full"
              height="30px"
              width="30px"
            />
            <p className="inline align-middle ml-2 text-gray-800 lg:text-lg text-sm">
              {post.author.name}
            </p>
          </div>

          {/* date */}
          <div className="font-medium text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="align-middle ml-2 lg:text-base text-sm">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </span>
          </div>
        </div>

        {/* title */}
        <h1 className="mb-4 lg:text-3xl text-2xl font-semibold text-center">
          {post.title}
        </h1>
        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemIndex) =>
            getContentFragment(itemIndex, item.text)
          );

          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div>
    </div>
  );
}

export default PostDetail

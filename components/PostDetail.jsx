import React from 'react'
import moment from 'moment'

const PostDetail = ({ post }) => {
  const elementMap = {
    'heading-one': { tag: 'h1', className: 'text-3xl font-semibold mb-4' },
    'heading-two': { tag: 'h2', className: 'text-2xl font-semibold mb-4' },
    'heading-three': { tag: 'h3', className: 'text-xl font-semibold mb-4' },
    'heading-four': { tag: 'h4', className: 'text-md font-semibold mb-4' },
    'heading-five': { tag: 'h5', className: 'text-sm font-semibold mb-4' },
    'heading-six': { tag: 'h6', className: 'text-xs font-semibold mb-4' },
    'quote': { tag: 'blockquote', className: 'italic border-l-4 border-gray-400 pl-4' },
    'paragraph': { tag: 'p', className: 'mb-8' },
    'bold': { tag: 'strong', className: 'mb-8' },
    'italic': { tag: 'em', className: 'mb-8' }, 
    'code': { tag: 'code', className: 'mb-8' },
    'link' : { tag: 'a', className: 'text-blue-500 hover:underline' },
  };

  const getContentFragment = (index, text, obj, type) => {
    let elements = Array.isArray(text) ? text : [text]
    elements = elements.map((el, i) => {
      if (obj) {
        if (obj.bold) el = <b key={`${index}-b-${i}`}>{el}</b>
        if (obj.italic) el = <em key={`${index}-em-${i}`}>{el}</em>
        if (obj.underline) el = <u key={`${index}-u-${i}`}>{el}</u>
      }
      return el
    })

    const className = elementMap[type]?.className || ''

    switch (type) {
      case 'quote':
        return (
          <blockquote key={index} className={className}>
            {elements}
          </blockquote>
        )
      case 'code':
        return (
          <code key={index} className={className}>
            {elements}
          </code>
        )
      case 'link':
        return (
          <a key={index} href={obj?.href || '#'} className={className}>
            {elements}
          </a>
        )
      default:
        const Tag = elementMap[type]?.tag || 'span'
        return (
          <Tag key={index} className={className}>
            {elements}
          </Tag>
        )
    }
  }

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
        {/* Author and date info here */}
        <h1 className="mb-4 lg:text-3xl text-2xl font-semibold text-center">
          {post.title}
        </h1>
        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemIndex) =>
            getContentFragment(itemIndex, item.text, item, item.type)
          )
          return getContentFragment(index, children, typeObj, typeObj.type)
        })}
      </div>
    </div>
  )
}

export default PostDetail

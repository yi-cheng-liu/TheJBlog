import React from 'react'
import { useEffect } from 'react'

const PostDetail = ({ post }) => {
  useEffect(() => {
    document.title = post.title
  }, [])

  const elementMap = {
    'heading-one': { tag: 'h1', className: 'text-3xl font-semibold mb-5' },
    'heading-two': { tag: 'h2', className: 'text-2xl font-semibold mb-5' },
    'heading-three': { tag: 'h3', className: 'text-xl font-semibold mb-5' },
    'heading-four': { tag: 'h4', className: 'text-md font-semibold mb-5' },
    'heading-five': { tag: 'h5', className: 'text-sm font-semibold mb-5' },
    'heading-six': { tag: 'h6', className: 'text-xs font-semibold mb-5' },
    paragraph: { tag: 'p', className: 'mb-5' },
    'code-block': { tag: 'pre', className: 'bg-gray-300 p-3 rounded-lg mb-5' },
    'block-quote': {
      tag: 'blockquote',
      className: 'italic border-l-4 border-gray-300 pl-4 mb-5'
    },
    'bulleted-list': { tag: 'ul', className: 'list-disc list-inside mb-5' },
    'numbered-list': { tag: 'ol', className: 'list-decimal list-inside mb-5' },
    'list-item': { tag: 'li', className: '' }
  }
    
  const getContentFragment = (index, text, obj, type, indentLevel = 0) => {
    const padding = `${indentLevel * 15}px` // You can adjust the multiplier as needed

    if (['bulleted-list', 'numbered-list'].includes(type)) {
      return (
        <ul
          key={index}
          className={elementMap[type]?.className}
          style={{ paddingLeft: padding }}
        >
          {obj.children.map((item, idx) =>
            getContentFragment(idx, null, item, item.type, indentLevel)
          )}
        </ul>
      )
    }

    if (type === 'list-item') {
      return (
        <li key={index} className={elementMap[type]?.className}>
          {obj.children.map((item, idx) =>
            getContentFragment(idx, item.text, item, item.type, indentLevel + 1)
          )}
        </li>
      )
    }

    if (type === 'list-item-child') {
      return (
        <span key={index}>
          {obj.children.map((child, idx) =>
            getContentFragment(idx, child.text, child, child.type, indentLevel)
          )}
        </span>
      )
    }

    if (type === 'table') {
      return (
        <table
          key={index}
          className="min-w-full divide-y divide-gray-200 border border-gray-300 border-collapse"
        >
          {obj.children.map((item, idx) =>
            getContentFragment(idx, null, item, item.type)
          )}
        </table>
      )
    }

    if (type === 'table_body') {
      return (
        <tbody key={index} className="divide-y divide-gray-200">
          {obj.children.map((item, idx) =>
            getContentFragment(idx, null, item, item.type)
          )}
        </tbody>
      )
    }

    if (type === 'table_row') {
      return (
        <tr key={index} className="divide-x divide-gray-200">
          {obj.children.map((item, idx) =>
            getContentFragment(idx, null, item, item.type)
          )}
        </tr>
      )
    }

    if (type === 'table_cell') {
      return (
        <td key={index} className="px-6 py-4 border">
          {obj.children.map((item, idx) => {
            if (item.type === 'paragraph') {
              return item.children.map((textObj, textIdx) =>
                getContentFragment(textIdx, textObj.text, textObj, textObj.type)
              )
            }
            return getContentFragment(idx, item.text, item, item.type)
          })}
        </td>
      )
    }

    let elements = Array.isArray(text) ? text : [text]
    elements = elements.map((el, i) => {
      if (obj && obj.type === 'link') {
        return (
          <a
            key={`${index}-a-${i}`}
            href={obj.href}
            target={obj.openInNewTab ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline"
          >
            {obj.children[0].text}
          </a>
        )
      }
      if (typeof el === 'string') {
        const content = el.split('\n').map((str, j, arr) => {
          let formattedStr = str

          if (obj) {
            if (obj.bold)
              formattedStr = <b key={`${index}-b-${j}`}>{formattedStr}</b>
            if (obj.italic)
              formattedStr = <em key={`${index}-em-${j}`}>{formattedStr}</em>
            if (obj.underline)
              formattedStr = <u key={`${index}-u-${j}`}>{formattedStr}</u>
            if (obj.code)
              formattedStr = (
                <code
                  key={`${index}-code-${j}`}
                  className="bg-gray-300 rounded-lg mx-1 p-1"
                >
                  {formattedStr}
                </code>
              )
          }

          return j === arr.length - 1 ? (
            formattedStr
          ) : (
            <>
              {formattedStr}
              <br key={`br-${j}`} />
            </>
          )
        })
        return content
      }
      return el
    })

    const Tag = elementMap[type]?.tag || 'span'
    const className = elementMap[type]?.className || ''

    return (
      <Tag key={index} className={className}>
        {elements}
      </Tag>
    )
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
          const type = typeObj.children.type
          return getContentFragment(index, children, typeObj, typeObj.type)
        })}
      </div>
    </div>
  )
}

export default PostDetail

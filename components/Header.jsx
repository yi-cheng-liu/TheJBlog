import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'

import { getCategories } from '../services';
import logo from "../public/logo_white.png";



const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">
              The J Blog
            </span>
          </Link>
        </div>

        <div className="hidden md:float md:contents">
          {categories.map((category) => (
            <Link href={`/category/${category.slug}`} key={category.slug}>
              <span
                className="md:float-right mt-2 ml-4 align-middle text-white font-semibold cursor-pointer hover:text-orange-500"
              >
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header

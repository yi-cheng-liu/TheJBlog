import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'

import { getCategories } from '../services';

import { MdClose } from "react-icons/md";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [navbarOpen, setNavbarOpen] = useState(false);

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="flex border-b w-full justify-between items-center py-8">
        <div className="flex md:float-left">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">
              The J Blog
            </span>
          </Link>
        </div>

        <div className="flex flex-row md:float md:contents">
          <div className="flex md:float-right text-lg text-white font-semibold gap-4 items-center">
            {/* Appointment */}
            {/* <div className="flex cursor-pointer hover:text-orange-500">
              <Link href={"/appointment"}>Appointment</Link>
            </div> */}

            {/* Category */}
            <div className="flex cursor-pointer items-center">
              <button
                className="toggle left-3 top-4"
                onClick={() => setNavbarOpen((prev) => !prev)}
              >
                {navbarOpen ? (
                  <MdClose
                    size={32}
                    className="cursor-pointer hover:text-orange-500"
                  />
                ) : (
                  <div className="flex flex-row items-center cursor-pointer hover:text-orange-500">
                    <div>Category</div>
                  </div>
                )}
              </button>
              {navbarOpen && (
                <ul
                  className={`menu-nav${navbarOpen ? " show-menu" : ""} gap-2`}
                >
                  {categories.map((category) => (
                    <Link
                      href={`/category/${category.slug}`}
                      key={category.slug}
                    >
                      <span className="ml-2 md:float-right text-lg text-white font-semibold cursor-pointer hover:text-orange-500 ">
                        {category.name}
                      </span>
                    </Link>
                  ))}
                </ul>
              )}
            </div>

            {/* About me */}
            {/* <div className="flex cursor-pointer hover:text-orange-500">
              <Link href={"/about"}>About</Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header

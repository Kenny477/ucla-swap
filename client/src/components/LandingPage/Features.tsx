import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { TfiWrite } from 'react-icons/tfi'
import { BsFillPersonPlusFill } from 'react-icons/bs'
import { features } from '../../types';

const Features = () => {
  const feature: features = {
    title: "Trading Made Easy!",
    item1:
    {
      title: "SIGN UP",
      description: "Get started with your offical UCLA email to join other UCLA students on the platform. ",
      img: "/../../assets/images/students-upscaled.jpeg",
    },
    item2:
    {
      title: "ADD LISTINGS",
      description: "TEXT",
      img: "/../../assets/images/students-upscaled.jpeg",
    },
    item3:
    {
      title: "BROWSE LISTINGS",
      description: "TEXT",
      img: "/../../assets/images/students-upscaled.jpeg",
    },
  };

  return (
    <section className={`bg-slate-200`}>
      <div className={`container max-w-5xl mx-auto m-8`}>
        <h1
          className={`w-full my-2 text-5xl font-bold leading-tight text-center text-primary`}
        >
          Join our platform in a few easy steps!
        </h1>
        <div className={`flex flex-wrap`}>
          <div className={`w-5/6 sm:w-1/2 p-6 mt-20`}>
            <h3
              className={`text-3xl text-gray-800 font-bold leading-none mb-3`}
            >
              SIGN UP
            </h3>
            <p className={`text-gray-600`}>Get started with your official UCLA email to join other UCLA students on the platform.</p>
          </div>
          <div className={`w-full sm:w-1/2 p-6 flex justify-center items-center`}>
            <BsFillPersonPlusFill className="h-1/2 w-1/2 aspect-sqaure" />
          </div>
        </div>
        <div className={`flex flex-wrap flex-col-reverse sm:flex-row`}>
          <div className={`w-full sm:w-1/2 p-6 flex justify-center items-center`}>
            <TfiWrite className="h-1/2 w-1/2 aspect-sqaure" />
          </div>
          <div className={`w-full sm:w-1/2 p-6 mt-20`}>
            <div className={`align-middle`}>
              <h3
                className={`uppercase text-3xl text-gray-800 font-bold leading-none mb-3`}
              >
                ADD LISTINGS
              </h3>
              <p className={`text-gray-600 mb-8`}>Visit the new listing page to sell something. Fill out some basic information about what you are selling and complete the post with some images.</p>
            </div>
          </div>
          <div className={`flex flex-wrap`}>
            <div className={`w-5/6 sm:w-1/2 p-6 mt-20`}>
              <h3
                className={`uppercase text-3xl text-gray-800 font-bold leading-none mb-3`}
              >
                BROWSE LISTINGS
              </h3>
              <p className={`text-gray-600`}>See the feed page to see the latest listings other students have posted. Search, filter, and sort by parameters like title, description, price, and category.</p>
            </div>
            <div className={`w-full sm:w-1/2 p-6 flex justify-center items-center`}>
              <FaSearch className="h-1/2 w-1/2 aspect-sqaure" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
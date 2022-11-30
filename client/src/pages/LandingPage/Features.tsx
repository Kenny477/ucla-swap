import React from 'react';
import { features } from '../../types';

const Features = () => {
    const feature: features = {
        title: "Trading Made Easy!",
        item1:
          {
            title: "SIGN UP",
            description: "Enroll using your offical ucla email",
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
          {feature.title}
        </h1>
        <div className={`flex flex-wrap`}>
          <div className={`w-5/6 sm:w-1/2 p-6 mt-20`}>
            <h3
              className={`text-3xl text-gray-800 font-bold leading-none mb-3`}
            >
              {feature.item1?.title}
            </h3>
            <p className={`text-gray-600`}>{feature.item1.description}</p>
          </div>
          <div className={`w-full sm:w-1/2 p-6`}>
            <img
              src={feature.item1.img}
              alt={feature.item1.title}
            />
          </div>
        </div>
        <div className={`flex flex-wrap flex-col-reverse sm:flex-row`}>
          <div className={`w-full sm:w-1/2 p-6`}>
            <img
              src={feature.item2.img}
              alt={feature.item2.title}
            />
          </div>
          <div className={`w-full sm:w-1/2 p-6 mt-20`}>
            <div className={`align-middle`}>
              <h3
                className={`text-3xl text-gray-800 font-bold leading-none mb-3`}
              >
                {feature.item2.title}
              </h3>
              <p className={`text-gray-600 mb-8`}>{feature.item2.description}</p>
            </div>
          </div>
          <div className={`flex flex-wrap`}>
          <div className={`w-5/6 sm:w-1/2 p-6 mt-20`}>
            <h3
              className={`text-3xl text-gray-800 font-bold leading-none mb-3`}
            >
              {feature.item3.title}
            </h3>
            <p className={`text-gray-600`}>{feature.item3?.description}</p>
          </div>
          <div className={`w-full sm:w-1/2 p-6`}>
            <img
              src={feature.item3.img}
              alt={feature.item3.title}
            />
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
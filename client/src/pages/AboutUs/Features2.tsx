import React from 'react';
import { features2 } from '../../types';

const Features2 = () => {
    const feature2: features2 = {
        title: "Our Class of 2025 Team:",
        item1:
          {
            title: "Kenneth Tang",
            description: "2nd Year Computer Science Major",
            img: "/../../assets/images/engineer.png",
          },
          item2:
          {
            title: "Caroline Debbarauh",
            description: "2nd Year Computer Science Major",
            img: "/../../assets/images/1641258770208.jpeg",
          },
          item3:
          {
            title: "Gayathri Eleswarapu",
            description: "2nd Year Computer Science Major",
            img: "/../../assets/images/1634062771149.jpeg",
          },
          item4:
          {
            title: "Liam Meagher",
            description: "2nd Year Computer Science and Engineering Major",
            img: "/../../assets/images/engineer.png",
          },
          item5:
          {
            title: "Alan Michael",
            description: "2nd Year Computer Science Major",
            img: "/../../assets/images/1665344873048.jpeg",
          },
	};

  return (
    <section className={`bg-slate-200`}>
      <div className={`container max-w-5xl mx-auto m-8`}>
        <h1
          className={`w-full my-2 text-5xl font-bold leading-tight text-center text-primary`}
        >
          {feature2.title}
        </h1>
        <div className={`flex flex-wrap`}>
          <div className={`w-5/6 sm:w-1/2 p-6 mt-20`}>
            <h3
              className={`text-3xl text-gray-800 font-bold leading-none mb-3`}
            >
              {feature2.item1?.title}
            </h3>
            <p className={`text-gray-600`}>{feature2.item1.description}</p>
          </div>
          <div className={`w-full sm:w-1/2 p-6`}>
            <img
              src={feature2.item1.img}
              alt={feature2.item1.title}
            />
          </div>
        </div>
        <div className={`flex flex-wrap flex-col-reverse sm:flex-row`}>
          <div className={`w-full sm:w-1/2 p-6`}>
            <img
              src={feature2.item2.img}
              alt={feature2.item2.title}
            />
          </div>
          <div className={`w-full sm:w-1/2 p-6 mt-20`}>
            <div className={`align-middle`}>
              <h3
                className={`text-3xl text-gray-800 font-bold leading-none mb-3`}
              >
                {feature2.item2.title}
              </h3>
              <p className={`text-gray-600 mb-8`}>{feature2.item2.description}</p>
            </div>
          </div>
          <div className={`flex flex-wrap`}>
          <div className={`w-5/6 sm:w-1/2 p-6 mt-20`}>
            <h3
              className={`text-3xl text-gray-800 font-bold leading-none mb-3`}
            >
              {feature2.item3.title}
            </h3>
            <p className={`text-gray-600`}>{feature2.item3?.description}</p>
          </div>
          
          <div className={`w-full sm:w-1/2 p-6`}>
            <img
              src={feature2.item3.img}
              alt={feature2.item3.title}
            />
          </div>  

        <div className={`flex flex-wrap`}>
          <div className={`w-full sm:w-1/2 p-6`}>
            <img
              src={feature2.item4.img}
              alt={feature2.item4.title}
            />
          </div>
          <div className={`w-5/6 sm:w-1/2 p-6 mt-20`}>
            <h3
              className={`text-3xl text-gray-800 font-bold leading-none mb-3`}
            >
              {feature2.item4?.title}
            </h3>
            <p className={`text-gray-600`}>{feature2.item4.description}</p>
          </div>
        </div>

        <div className={`flex flex-wrap`}>
          <div className={`w-5/6 sm:w-1/2 p-6 mt-20`}>
            <h3
              className={`text-3xl text-gray-800 font-bold leading-none mb-3`}
            >
              {feature2.item5?.title}
            </h3>
            <p className={`text-gray-600`}>{feature2.item5.description}</p>
          </div>
          <div className={`w-full sm:w-1/2 p-6`}>
            <img
              src={feature2.item5.img}
              alt={feature2.item5.title}
            />
          </div>
        </div>

        </div>
        </div>
      </div>
    </section>
  );
};

export default Features2;
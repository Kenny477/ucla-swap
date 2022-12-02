import React from 'react';
import { BsPersonCircle } from 'react-icons/bs';

function People() {
  const people = [
    {
      name: "Alan Michael",
      description: "2nd Year Computer Science Major",
      img: <img src="/../../assets/images/1665344873048.jpeg" alt="Alan Michael" />,
    },
    {
      name: "Caroline Debbarauh",
      description: "2nd Year Computer Science Major",
      img: <img src="/../../assets/images/1641258770208.jpeg" alt="Caroline Debbarauh" />,
    },
    {
      name: "Gayathri Eleswarapu",
      description: "2nd Year Computer Science Major",
      img: <img src="/../../assets/images/1634062771149.jpeg" alt="Gayathri Eleswarapu" />,
    },
    {
      name: "Kenneth Tang",
      description: "2nd Year Computer Science Major",
      img: <BsPersonCircle className="w-full h-full" />,
    },
    {
      name: "Liam Meagher",
      description: "2nd Year Computer Science and Engineering Major",
      img: <img src="/../../assets/images/Resized_58633679_oclc8g98jg.png" alt="Liam Meagher" />,
    },
  ];

  return (
    <section className={`h-full`}>
      <div className={`container max-w-5xl mx-auto`}>
        <h1
          className={`w-full my-4 text-5xl font-bold leading-tight text-center text-primary`}
        >
          Our Class of 2025 Team:
        </h1>
        <div className={`grid grid-cols-3 gap-x-24 gap-y-10 px-20`}>
          {people.map((person) => (
            <div className={`flex flex-col space-y-4 justify-between`}>
              <h3
                className={`text-2xl text-gray-800 font-bold leading-none`}
              >
                {person.name}
              </h3>
              <p className={`text-gray-600`}>{person.description}</p>
              <div className={`w-full`}>
                {person.img}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default People;
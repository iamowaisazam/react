import React, { useState } from "react";
import faq from "../../assets/faq-img.png";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import PagesBanner from "../../Components/PagesBanner/PagesBanner";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      question: "How often should I get my car serviced?",
      answer:
        "Follow your car's owner's manual for recommended service intervals based on mileage and time. Consider driving conditions and habits for adjustments. Address warning signs promptly.",
    },
    {
      question: "What is the best oil for my car?",
      answer:
        "The best oil depends on your car's make, model, and age. Refer to the owner's manual for specifications.",
    },
    {
      question: "Why is my car making strange noises?",
      answer:
        "Strange noises can indicate a range of issues, from brake problems to engine trouble. It's best to consult a mechanic promptly.",
    },
    {
      question: "How can I improve my car's fuel efficiency?",
      answer:
        "Maintain proper tire pressure, avoid aggressive driving, and keep up with regular maintenance. Remove unnecessary weight and avoid excessive idling.",
    },
    {
      question: "What should I do if my car won't start?",
      answer:
        "Check the battery, starter, and alternator. Ensure your car is in 'Park' or 'Neutral' and check for any loose connections. If unsure, contact roadside assistance.",
    },
    {
      question: "When should I replace my car's tires?",
      answer:
        "Inspect your tires for tread wear using the penny test. Replace them if the tread depth is below 2/32 of an inch or if there are visible signs of damage.",
    },
  ];
  

  return (
    <>
 <div className="max-w-[133rem] mx-auto px-[2rem]">

      <Navbar />
      <PagesBanner one="Frequently" two="Questions" three="And" four="Answers" para="Find answers to all your questions with our comprehensive FAQ section" btn="View More"/>

      <div className="w-[100%] h-full flex items-center justify-center gap-[2rem] font-[Poppins] faq-main-container">
        <div className="faq-image bg-[white] w-[30%] ">
          <img
            src={faq}
            alt="showing client attraction"
            className="w-[100%]"
          />
        </div>

        <div className="w-[55%] h-full faq-qa-container">
          <h1 className="text-white text-[3rem]">
            FAQ’s & Latest Answer <br />
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#ffe73a] text-[1.6rem] border py-[1.5rem] rounded-[0.4rem] mt-[2rem] faq-question-container"
              >
                <button
                  className="flex justify-between items-center w-full p-4 text-left text-lg font-medium text-gray-800"
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="text-[1.6rem]">{faq.question}</div>
                  <span
                    className={`transform transition-transform duration-300 ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    activeIndex === index ? "max-h-[200px]" : "max-h-0"
                  }`}
                >
                  <div className="p-4 text-[black] tracking-[0.1rem] font-[LightPoppins]">{faq.answer}</div>
                </div>
              </div>
            ))}
          </h1>
        </div>
      </div>



      <Footer/>
      </div>
    </>
  );
};

export default Faq;





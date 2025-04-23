import { useState } from 'react'
const path = import.meta.env.VITE_PATH || "";
const faqs = [
  {
    question: "How often should I get my car serviced?",
    answer: "Most manufacturers recommend servicing every 6 months or 5,000-10,000 kms.",
  },
  {
    question: "What is the best oil for my car?",
    answer: "It depends on your vehicle’s engine — check the owner’s manual for viscosity and type.",
  },
  {
    question: "Why is my car making strange noises?",
    answer: "Unusual sounds can indicate worn-out parts, loose belts, or engine problems.",
  },
  {
    question: "How can I improve my car's fuel efficiency?",
    answer: "Keep tires properly inflated, avoid aggressive driving, and do regular maintenance.",
  },
  {
    question: "What should I do if my car won't start?",
    answer: "Check the battery, starter, or fuel supply. Call a mechanic if needed.",
  },
  {
    question: "When should I replace my car's tires?",
    answer: "Usually every 40,000 to 80,000 kms, or if tread depth is too low.",
  },
];
export default () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const bgImage = path + '/src/assets/banner.jpg';
  return (
    <div className="bg-black text-white">

      <div
        className="text-center text-white py-5"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h2 className="fw-bold text-warning" style={{ fontSize: '3rem' }}>
          Frequently Questions And Answers
        </h2>
        <p className="mt-3 px-3" style={{ maxWidth: '600px', margin: 'auto' }}>
          Find answers to all your questions with our comprehensive FAQ section
        </p>
        <button className="btn btn-outline-light mt-3 px-4">View More</button>
      </div>



      <div className="container-fluid bg-black text-white py-5 px-3">
        <div className="row align-items-start justify-content-center">
          {/* Left Image */}
          <div className="col-md-5 mb-4 mb-md-0">
            <img
              src={path + '/src/assets/faq-img.png'}
              alt="FAQs"
              className="img-fluid rounded"
            />
          </div>

          {/* Right Accordion */}
          <div className="col-md-7">
            <h3 className="mb-4 fw-bold">FAQ’s & Latest Answer</h3>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="mb-3"
                style={{
                  backgroundColor: '#fde047',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-100 text-start fw-semibold px-4 py-3 border-0 d-flex justify-content-between align-items-center"
                  style={{
                    backgroundColor: 'transparent',
                    fontSize: '1rem',
                    color: '#000',
                  }}
                >
                  {faq.question}
                  <span>{openIndex === index ? '▲' : '▼'}</span>
                </button>
                {openIndex === index && (
                  <div className="px-4 pb-3 text-dark" style={{ fontSize: '0.95rem' }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );


}

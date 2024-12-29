import React from 'react';

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "How do I create an account?",
      answer: "You can create an account by clicking on the 'Register' button and filling out the registration form. You'll need to provide basic information and choose whether you're looking for work or hiring."
    },
    {
      question: "Is the service free?",
      answer: "Yes, basic services are free for both workers and employers. Premium features may be available in the future."
    },
    {
      question: "How do I find workers in my area?",
      answer: "You can use our search feature and filter workers by location, skills, and availability to find the perfect match for your needs."
    },
    {
      question: "How do I apply for jobs?",
      answer: "Once you've created a worker account, you can browse available jobs and click 'Apply Now' on any job listing that interests you."
    },
    {
      question: "How do I post a job?",
      answer: "Business owners can post jobs by logging in and clicking on 'Post New Job' from their dashboard. Fill out the job details and requirements to create your listing."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
import React, { useState, useEffect } from "react";
import { fetchFaq, postFaq } from "../api/settings";
import { useCookies } from "react-cookie";
import { App } from "antd";
function Faq() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [faqList, setFaqList] = useState([]);
  const [cookie] = useCookies(["token"]);
  // Function to handle adding a new FAQ
  const addNewFaq = () => {
    if (question.trim() && answer.trim()) {
      const newFaq = { question, answer };
      setFaqList([...faqList, newFaq]);
      setQuestion(""); // Clear the input fields after adding
      setAnswer("");
    }
  };

  const { message } = App.useApp();

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  //fetch req

  useEffect(() => {
    const getData = async () => {
      try {
        const datas = await fetchFaq(cookie.token);
        setFaqList(datas.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(faqList);
  }, [faqList]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postFaq(cookie.token, formData);
      message.success("New FAQ added successfully");
      setFormData({ question: "", answer: "" });

      const updatedData = await fetchFaq(cookie.token);
      setFaqList(updatedData.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl">
      <form onSubmit={handleSubmit}>
        <div className="my-6 flex flex-row items-center justify-between">
          <div>
            <h1 className="text-black text-2xl font-work font-semibold">
              Frequently Asked Questions
            </h1>
            <h4 className="text-gray100 text-sm font-work font-medium mt-1">
              Last updated on 5/12/2024
            </h4>
          </div>
          <div className="flex flex-row items-center gap-3 justify-between mt-4">
            <button
              onClick={addNewFaq}
              className="rounded-xl px-4 py-2 cursor-pointer font-semibold font-work text-primary bg-secondary border border-secondary flex flex-row items-center justify-center gap-2"
            >
              Add New
              <svg
                width="32"
                height="33"
                viewBox="0 0 32 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.3335 15.834V7.83398H16.6668V15.834H24.6668V17.1673H16.6668V25.1673H15.3335V17.1673H7.3335V15.834H15.3335Z"
                  fill="#8C78EA"
                  stroke="#8C78EA"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-y-4">
          <input
            type="text"
            name="question"
            value={formData.name}
            onChange={handleChange}
            placeholder="Question"
            className="focus:outline-none p-4 w-full border border-90 rounded-2xl"
          />
          <textarea
            rows="5"
            name="answer"
            value={formData.password}
            onChange={handleChange}
            placeholder="Auto size height based on content lines"
            className="focus:outline-none p-4 w-full border border-90 rounded-2xl"
          ></textarea>
        </div>

        {/* Displaying the list of FAQs */}
        <div className="mt-6">
          {faqList.map((faq, index) => (
            <div key={index} className="mt-4">
              <h1 className="text-secondaryTitle text-lg font-work font-bold">
                {faq.question}
              </h1>
              <p className="text-subtitle text-base font-work font-normal">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default Faq;

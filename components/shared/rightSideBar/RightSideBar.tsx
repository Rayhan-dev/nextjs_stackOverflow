import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "../RenderTag";

const RightSideBar = () => {
  const hotQuestions = [
    {
      _id: 1,
      titel:
        "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
    },
    { _id: 2, titel: "Is it only me or the font is bolder than necessary?" },
    { _id: 3, titel: "Redux Toolkit Not Updating State as Expected" },
    { _id: 4, titel: "Async/Await Function Not Handling Errors Properly" },
    { _id: 5, titel: "Can I get the course for free?" },
  ];
  const popularTags = [
    {
      _id: 1,
      name: "NEXTJS",
      totalQuestions: 32,
    },
    {
      _id: 2,
      name: "TEST",
      totalQuestions: 9,
    },
    {
      _id: 3,
      name: "REACT",
      totalQuestions: 18,
    },
    {
      _id: 4,
      name: "CSS",
      totalQuestions: 13,
    },
    {
      _id: 5,
      name: "REDUX",
      totalQuestions: 5,
    },
  ];
  return (
    <section className="background-light900_dark200   light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[330px] flex-col  overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden max-sm:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Hot Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              href={`/questions/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.titel}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron-right"
                className="invert-colors"
                width={20}
                height={20}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestion={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;

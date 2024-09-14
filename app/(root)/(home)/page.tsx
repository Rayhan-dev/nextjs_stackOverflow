import HomeFilters from "@/components/Home/HomeFilters";
import QuestionCard from "@/components/shared/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import React from "react";

const Home = () => {
  const questions = [
    {
      _id: "1",
      title: "Cascading Deletes in SQLAlchemy?",
      tags: [
        { _id: "1", name: "python" },
        { _id: "2", name: "sql" },
      ],
      author: {
        _id: "1",
        name: "John Doe",
        picture: "john-doe.jpg",
      },
      upvotes: 1500000,
      views: 500552,
      answers: [],
      createdAt: new Date("2023-09-01T12:00:00.000Z"),
    },
    {
      _id: "2",
      title: "How to center a div?",
      tags: [
        { _id: "3", name: "css" },
        { _id: "4", name: "html" },
      ],
      author: {
        _id: "2",
        name: "Jane Smith",
        picture: "jane-smith.jpg",
      },
      upvotes: 5,
      views: 50,
      answers: [],
      createdAt: new Date("2021-09-02T10:30:00.000Z"),
    },
  ];

  return (
    <>
      <div className="flex flex-row justify-between max-sm:flex-col-reverse">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link className="flex justify-end" href="/ask-questions">
          <Button className="primary-gradient min-h-[46px] rounded-lg px-4 py-3 text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholders="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-questions"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default Home;

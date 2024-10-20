import Link from "next/link";
import React from "react";
import RenderTag from "../RenderTag";
import Metric from "../Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../EditDeleteAction";

interface QuestionProps {
  clerkId?: string | null;
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
  };
  upvotes: Array<object>;
  views: number;
  answers: Array<object>;
  createdAt: Date;
}
const QuestionCard = ({
  clerkId,
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: QuestionProps) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row ">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/questions/${_id}`}>
            <h3 className="base-bold sm:h3-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>
      <SignedIn>
        {showActionButtons && (
          <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
        )}
      </SignedIn>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            totalQuestion={0}
            showCount={false}
          />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author?.picture}
          alt="user"
          value={author?.name || "Anonymous"}
          title={` - asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author?._id || ""}`}
          isAuthor
          textStyles="body-medium text-dark400_light700"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="upvotes"
          value={formatAndDivideNumber(upvotes.length)}
          title="Votes"
          textStyles="small-medium text-dark400_light700"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="answers"
          value={formatAndDivideNumber(answers.length)}
          title="Answers"
          textStyles="small-medium text-dark400_light700"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="views"
          value={formatAndDivideNumber(views)}
          title="Views"
          textStyles="small-medium text-dark400_light700"
        />
      </div>
    </div>
  );
};

export default QuestionCard;

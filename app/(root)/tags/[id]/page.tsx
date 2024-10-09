import { URLProps } from "@/types";
import React from "react";

const page = async ({ params, searchParams }: URLProps) => {
  // const result = await getQuestionsByTagId({
  //   tagId: params.id,
  //   page: 1,
  //   searchQuery: searchParams.q,
  // });
  return <div>page</div>;
};

export default page;

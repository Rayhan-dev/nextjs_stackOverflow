"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

export async function getUserById(userId: string) {
  try {
    connectToDatabase();

    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    throw new Error("Failed to get user");
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create user");
  }
}

export async function updateUser(params: UpdateUserParams) {
  const { clerkId, updateData, path } = params;
  try {
    connectToDatabase();
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update user");
  }
}

export async function deleteUSer(params: DeleteUserParams) {
  const { clerkId } = params;
  try {
    connectToDatabase();
    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // deteting asnwers,comments,etc after deleting user

    // getting quetion ids for deleting answers later
    // const userQuestionIds = await Question.find({ author: user?._id }).distinct("_id");

    // delete user questions
    await Question.deleteMany({ author: user._id });

    const deletedUSer = await User.findByIdAndDelete(user._id);

    return deletedUSer;
  } catch (error) {
    console.log(error);

    throw new Error("Failed to delete user");
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();
    // const { page = 1, limit = 20, pageSize, filter } = params;

    const users = await User.find({}).sort({ createdAt: -1 });

    return { users };
  } catch (error) {
    console.log(error);
    throw new Error("can't get all users");
  }
}

"use client";
import Link from "next/link";
import React from "react";
import { SignedOut, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Image from "next/image";

const LeftSideBar = () => {
  const pathname = usePathname();
  const clerkId = useAuth();

  return (
    <section className="background-light900_dark200   light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className=" flex flex-1 flex-col gap-6 ">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;
          if (item.route === "/profile") {
            item.route = `/profile/${clerkId.userId}`;
          }
          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${!isActive && "invert-colors"} `}
              />
              <p
                className={`${
                  isActive ? "base-bold" : "base-medium"
                } max-lg:hidden`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
      <SignedOut>
        <div className=" flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/account.svg"
                alt="login"
                height={20}
                width={20}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">
                Log in
              </span>
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="small-medium light-border-2 btn-tertiary btn-secondary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="login"
                height={20}
                width={20}
                className="invert-colors lg:hidden"
              />
              <span className="max-lg:hidden">Sign in</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
      {/* <SignedIn>
          <div className="flex flex-col gap-3">
            <SignOutButton />
          </div>
        </SignedIn> */}
    </section>
  );
};

export default LeftSideBar;

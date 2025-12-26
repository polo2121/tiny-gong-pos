import React from "react";
import BubbleOutline from "@/components/BubbleOutline";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Sale = () => {
  return (
    <section className="bg-white min-h-screen text-brown-900">
      <Breadcrumb className="pt-6 px-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              className="underline font-quicksand font-medium text-xs text-brown-900 opacity-50"
            >
              My Workspace
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="underline font-quicksand font-medium text-xs text-brown-900">
              Sales
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Willl add layout later strating from here */}
      <section className="flex flex-col gap-4 px-6 pt-6">
        <div>
          <h1 className="font-margarine font-base text-3xl">Sales</h1>
          <p className="font-uMoe text-s">(အရောင်းစာရင်း)</p>
        </div>
        <p className="bg-rd-300 font-quicksand font-medium text-sm">
          This is your new creative playground. Explore, invent, and share your
          biggest ideas with us. Tingy is so excited for all the fun we'll have!
        </p>
      </section>

      <section className="flex flex-col gap-4 px-6 pt-6">
        <div>
          <h1 className="font-margarine font-base text-lg">
            Current Sale (Till Now)
          </h1>
          <p className="font-uMoe text-sm">(ယနေ့ထိအရောင်း)</p>
        </div>

        <BubbleOutline />
      </section>
    </section>
  );
};

export default Sale;

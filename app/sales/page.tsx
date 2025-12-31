import CurrentSaleSummary from "./components/ui/CurrentSaleSummary";
import DashboardHeader from "@/components/ui/DashboardHeader";
import PrimaryButton from "@/components/ui/PrimaryButton";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Line } from "recharts";
import SelectDateButton from "./components/ui/SelectDateButton";

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
      <DashboardHeader
        heading="Sales"
        burmeseLabel="အရောင်းစာရင်း"
        subtitle="This is your new creative playground. Explore, invent, and share your biggest ideas with us. Tingy is so excited for all the fun we'll have!"
      />
      <CurrentSaleSummary />

      <section className="flex justify-between gap-4 px-6 pt-6 mb-6">
        <div>
          <h1 className="font-margarine font-base text-lg">Today Sales</h1>
          <p className="font-uMoe text-sm">(ယနေ့အရောင်း)</p>
        </div>
        <SelectDateButton />
      </section>
    </section>
  );
};

export default Sale;

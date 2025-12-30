import CurrentSaleSummary from "./components/ui/CurrentSaleSummary";
import DashboardHeader from "@/components/ui/DashboardHeader";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Line } from "recharts";

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
    </section>
  );
};

export default Sale;

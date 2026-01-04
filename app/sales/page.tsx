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

import TodaySale from "./components/ui/TodaySale";

import TitleHeader from "@/components/ui/TitleHeader";
import SelectDateButton from "./components/ui/SelectDateButton";
import SaleBarChart from "./components/charts/SaleBarChart";
import ProductSalePie from "./components/charts/ProductSalePie";

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
      <TodaySale>
        <TitleHeader title="Today Sale" subtitle="ဒီနေ့ အရောင်းစာရင်း">
          <SelectDateButton />
        </TitleHeader>
        <SaleBarChart />
        <a href="#" className="text-xs underline text-brown-900 mt-2">
          View Detailed Report
        </a>
      </TodaySale>

      <section className="flex flex-col gap-4 px-6 pt-6">
        <TitleHeader
          title="Sale by Products"
          subtitle="ရောင်းရဆုံးproductစာရင်း"
        />
        <ProductSalePie />
      </section>
    </section>
  );
};

export default Sale;

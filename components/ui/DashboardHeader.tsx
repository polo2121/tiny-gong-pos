import React from "react";

interface DashboardHeaderProps {
  heading: string;
  burmeseLabel: string;
  subtitle: string;
}

const DashboardHeader = ({
  heading,
  burmeseLabel,
  subtitle,
}: DashboardHeaderProps) => {
  return (
    <section className="flex flex-col gap-4 px-6 pt-6">
      <div>
        <h1 className="font-margarine font-base text-3xl">{heading}</h1>
        <p className="font-uMoe text-s">({burmeseLabel})</p>
      </div>
      <p className="bg-rd-300 font-quicksand font-medium text-sm">{subtitle}</p>
    </section>
  );
};

export default DashboardHeader;

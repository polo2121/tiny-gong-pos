import React from "react";

const TodaySale = ({ children }: { children?: React.ReactNode }) => {
  return (
    <section className="flex flex-col gap-4 px-6 pt-6">{children}</section>
  );
};

export default TodaySale;

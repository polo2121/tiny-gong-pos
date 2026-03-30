import React from "react";

const TodayDate = () => {
  const today = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <div className={`flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm`}>
      <p className="text-lg font-semibold text-slate-900">{today}</p>
    </div>
  );
};

export default TodayDate;

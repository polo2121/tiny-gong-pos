import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}
const TitleHeader = ({ title, subtitle, children }: SectionHeaderProps) => {
  return (
    <div className="flex justify-between x">
      <header>
        <h1 className="font-margarine font-base text-lg">{title}</h1>
        <p className="font-uMoe text-sm">({subtitle})</p>
      </header>
      {children}
    </div>
  );
};

export default TitleHeader;

import React from "react";
interface NumberFormatterProps {
  rawNum: string;
  numSuffixStyle: string;
}

const AmountDisplay = ({ amount }: { amount: number }) => {
  const formattedAmount = (num: number): NumberFormatterProps => {
    return {
      rawNum: num.toLocaleString("en-US"),
      numSuffixStyle: amount >= 9999999 ? "absolute right-0 -bottom-3" : "pl-1",
    };
  };

  const numberFormatter = formattedAmount(amount);

  return (
    <p className="text-xl font-margarine relative z-10 w-fit bg-aber-200">
      {numberFormatter?.rawNum}
      <small className={`text-xs ${numberFormatter?.numSuffixStyle}`}>
        MMK
      </small>
    </p>
  );
};

export default AmountDisplay;

import AmountDisplay from "./ui/AmountDisplay";

interface BubbleOutlineProps {
  title?: string;
  burmeseLabel?: string;
  totalAmount: number;
}

const BubbleOutline = ({
  title,
  burmeseLabel,
  totalAmount,
}: BubbleOutlineProps) => {
  return (
    <a
      href="/sales"
      className={`flex flex-col gap-2 justify-start h-fit 
                    rounded-[28px] bg-grey-300 
                    relative border-brown-900 border overflow-hidden group focus-visible:none will-change-transform transition-transform select-none touch-none animate-(--anim-bubble) active:animate-(--anim-bubble-press) bubble-button`}
      style={{ WebkitTouchCallout: "none" }}
    >
      {/* highlgiht up */}
      <svg
        className="absolute top-2.5 left-3 z-10 "
        width="17"
        height="14"
        viewBox="0 0 17 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.7"
          d="M1.5 12C4.5 6 9 3 15.5003 1.5"
          stroke="#D2D2D2"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="bevel"
        />
      </svg>

      <div className="flex flex-col gap-2 py-8 p-6 bg-amber-40">
        <div>
          <p className="text-sm font-quicksand font-medium opacity-80 relative z-10">
            {title}
          </p>
          <p className="font-uMoe text-xs opacity-80">{burmeseLabel}</p>
        </div>
        <AmountDisplay amount={totalAmount} />
      </div>

      {/* highlgiht bottom */}
      <svg
        className="absolute bottom-3 right-4"
        width="14"
        height="11"
        viewBox="0 0 14 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.7"
          d="M1.5 9.5C5.73077 8.55882 9.53846 6.67647 12.5 1.5"
          stroke="#D2D2D2"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="bevel"
        />
      </svg>
    </a>
  );
};

export default BubbleOutline;

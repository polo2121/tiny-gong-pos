type IconProps = React.SVGProps<SVGSVGElement>;

export function StripeShape({ className = "", ...props }: IconProps) {
  return (
    <div className="w-full absolute inset-0 left-0 top-0 right-0 bottom-0 overflow-hidden">
      <svg
        viewBox="-40 -20 300 300"
        fill="none"
        className={className}
        {...props}
      >
        <path
          opacity="0.2"
          d="M166.767 6.49247C172.269 -0.263463 180.871 -2.03319 185.98 2.53969L186.628 3.11944C191.737 7.69232 191.418 16.8761 185.915 23.6321L23.4933 223.058C17.9909 229.814 9.38879 231.583 4.27989 227.01L3.63217 226.431C-1.47673 221.858 -1.15776 212.674 4.3446 205.918L166.767 6.49247Z"
          fill="currentColor"
        />
        <path
          opacity="0.2"
          d="M199.077 20.0968C204.789 13.0826 213.562 11.1035 218.671 15.6764L219.319 16.2562C224.428 20.829 223.938 30.2222 218.225 37.2364L48.2954 245.88C42.5827 252.895 33.81 254.874 28.7011 250.301L28.0534 249.721C22.9445 245.148 23.434 235.755 29.1467 228.741L199.077 20.0968Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

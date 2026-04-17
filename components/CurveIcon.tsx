type IconProps = React.SVGProps<SVGSVGElement>;

export function CurveIcon({ className = "size-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 5 5" fill="none" className={className} {...props}>
      <path
        d="M3.93345 0.507252C3.42849 2.94071 1.79166 3.91638 0.492754 3.90527"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

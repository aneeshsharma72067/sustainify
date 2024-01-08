export const DropDownIcon = ({ size = 240, color = "#ffffff", ...props }) => (
  <svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="m4.594 8.912 6.553 7.646a1.126 1.126 0 0 0 1.708 0l6.552-7.646c.625-.73.107-1.857-.854-1.857H5.447c-.961 0-1.48 1.127-.853 1.857Z" />
  </svg>
);

export const AddCircleIcon = ({ size = 240, color = "#ffffff", ...props }) => (
  <svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12 2.25c-5.376 0-9.75 4.374-9.75 9.75s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75S17.376 2.25 12 2.25Zm3.75 10.5h-3v3a.75.75 0 1 1-1.5 0v-3h-3a.75.75 0 1 1 0-1.5h3v-3a.75.75 0 1 1 1.5 0v3h3a.75.75 0 1 1 0 1.5Z" />
  </svg>
);

export const AddIcon = ({
  size = 240,
  strokeWidth = 2,
  color = "#ffffff",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12 5.25v13.5" />
    <path d="M18.75 12H5.25" />
  </svg>
);

export const ImageIcon = ({ size = 240, color = "#ffffff", ...props }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M19.5 3.75h-15A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V6a2.25 2.25 0 0 0-2.25-2.25Z" />
    <path d="M15.75 9.75a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    <path d="M14.25 15.743 10 11.502a1.5 1.5 0 0 0-2.056-.061L2.25 16.503" />
    <path d="m10.5 20.253 5.782-5.781a1.5 1.5 0 0 1 2.02-.094l3.448 2.875" />
  </svg>
);

export const CloseIcon = ({
  size = 240,
  strokeWidth = 1.5,
  color = "#ffffff",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M17.25 17.25 6.75 6.75" />
    <path d="m17.25 6.75-10.5 10.5" />
  </svg>
);

export const LikeIcon = ({
  size = 46,
  strokeWidth = 1,
  color = "currentColor",
  fill = "none",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    fill={fill}
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M16.472 20H4.1a.6.6 0 0 1-.6-.6V9.6a.6.6 0 0 1 .6-.6h2.768a2 2 0 0 0 1.715-.972l2.71-4.517a1.631 1.631 0 0 1 2.961 1.308l-1.022 3.408a.6.6 0 0 0 .574.772h4.575a2 2 0 0 1 1.93 2.526l-1.91 7A2 2 0 0 1 16.473 20Z" />
    <path d="M7 20V9" />
  </svg>
);

export const FlagIcon = ({
  size = 240,
  strokeWidth = 1,
  color = "#ffffff",
  fill = "none",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    fill={fill}
    stroke={color}
    strokeLinecap="round"
    strokeWidth={strokeWidth}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M3.75 21.75V3.194a.375.375 0 0 1 .188-.323c.366-.215 1.355-.621 3.562-.621 3 0 6.797 2.25 9 2.25a9.353 9.353 0 0 0 3.62-.74.093.093 0 0 1 .13.088V14.13a.187.187 0 0 1-.112.171c-.386.17-1.748.699-3.638.699-2.25 0-6-1.5-9-1.5s-3.75.75-3.75.75" />
  </svg>
);

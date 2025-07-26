interface CustomButton_Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const CustomButton: React.FC<CustomButton_Props> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button className={`rounded-sm cursor-pointer ${className}`} {...props}>
      {children}
    </button>
  );
};

export default CustomButton;

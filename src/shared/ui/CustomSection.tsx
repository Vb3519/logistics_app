interface CustomSection_Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

const CustomSection: React.FC<CustomSection_Props> = ({
  className,
  children,
  ...props
}) => {
  return (
    <section
      className={`${className} p-2 bg-white container-shadow xs:p-4 xs:mx-4 xs:rounded-md lg:m-0`}
      {...props}
    >
      {children}
    </section>
  );
};

export default CustomSection;

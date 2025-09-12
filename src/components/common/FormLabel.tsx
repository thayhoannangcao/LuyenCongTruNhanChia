const FormLabel = ({
  label,
  required,
  className,
  htmlFor,
}: {
  label?: string | React.ReactNode;
  required?: boolean;
  className?: string;
  htmlFor?: string;
}) => {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className={`flex items-center justify-start gap-2 text-sm text-text-primary ${className}`}
      >
        {label}
        {required && (
          <div className="h-[13px] rounded-[3px] bg-error px-[7.5px] text-center text-[7px] font-bold leading-[12.5px] text-white">
            必須
          </div>
        )}
      </label>
    </div>
  );
};

export default FormLabel;

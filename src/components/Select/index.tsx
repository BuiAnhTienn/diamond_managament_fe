import { Select as SelectBase, SelectProps } from "antd";

interface ISelectProps extends SelectProps {
  label?: string;
  errorMessage?: string;
}

const Select = ({ label, errorMessage, className, ...rest }: ISelectProps) => {
  return (
    <div>
      {label && <div className="mb-2">{label}</div>}
      <SelectBase className={`w-full ${className}`} {...rest}></SelectBase>
      {errorMessage && (
        <div className="mb-2 " style={{ color: "red" }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Select;

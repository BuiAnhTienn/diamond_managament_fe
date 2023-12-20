import { ButtonProps } from 'antd';
import { StyledButton } from '@components/Button/styled';

interface IButtonProps extends ButtonProps {}

const Button = (props: IButtonProps) => {
  
  return <StyledButton {...props} />;
};

export default Button;

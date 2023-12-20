import { Col, Input as InputBase, InputProps, Row } from 'antd';

interface IInputProps extends InputProps {
  label?: string;
  errorMessage?: string;
}

const Input = ({ label, errorMessage, ...rest }: IInputProps) => {
  return (
    <Row className='w-full'>
      <Col span={24}>{label && <div className='mb-2'>{label}</div>}</Col>
      <Col span={24}>
        <InputBase {...rest} />
      </Col>
      <Col span={24}>
        {errorMessage && (
          <div className='mb-2 ' style={{ color: 'red' }}>
            {errorMessage}
          </div>
        )}
      </Col>
    </Row>
  );
};

export default Input;

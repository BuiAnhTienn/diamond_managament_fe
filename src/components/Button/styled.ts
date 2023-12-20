import { Button } from 'antd';
import styled from 'styled-components';

export const StyledButton = styled(Button)`
  border-radius: 22px;
  &.ant-btn-default {
    background: var(--primary-color);
    color: #fff;
    border: none;
    box-shadow: none;
  }
`;

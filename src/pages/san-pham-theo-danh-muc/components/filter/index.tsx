import { Col, Row, Select, Typography } from 'antd';
import React from 'react';
import { FilterContainer } from './styled';

const Filter = () => {
  return (
    <FilterContainer>
      <Row gutter={40}>
        <Col span={4}>
          <Typography className='filter-heading'>Sắp xếp:</Typography>
          <Select
            size='small'
            defaultValue='Sản phẩm phổ biến nhất'
            // onChange={handleChange}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
          />
        </Col>
      </Row>
    </FilterContainer>
  );
};

export default Filter;

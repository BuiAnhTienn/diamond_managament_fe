import { Col, Row, Typography } from 'antd';
import { WhyContainer } from './styled';

const Why = () => {
  return (
    <WhyContainer>
      <div className='why'>
        <div className='why-top'>
          <Typography className='why-heading'>
            TẠI SAO NÊN CHỌN DIAMOND?
          </Typography>
        </div>
        <div className='why-bottom'>
          <div className='why-list'>
            <Row gutter={130} className=''>
              <Col span={8} className='gutter-row'>
                <div className='why-item'>
                  <img
                    src='https://cdn.pnj.io/images/image-update/2020/key_points/icon-circle-tragop.svg'
                    alt=''
                  />
                  <Typography className='item-title'>
                    TRẢ GÓP 0% LÃI SUẤT
                  </Typography>
                  <div className='line'></div>
                  <Typography className='item-desc'>
                    Áp dụng dễ dàng qua thẻ tín dụng của hơn 20 ngân hàng
                  </Typography>
                </div>
              </Col>
              <Col span={8} className='gutter-row'>
                <div className='why-item'>
                  <img
                    src='https://firebasestorage.googleapis.com/v0/b/diamond-management-76c5a.appspot.com/o/image%2Fbanner2.png?alt=media&token=497a92cb-1bbf-4c9a-b567-50de15ebde83'
                    alt=''
                  />
                  <Typography className='item-title'>GIAO HÀNG 3H</Typography>
                  <div className='line'></div>
                  <Typography className='item-desc'>
                    Sở hữu ngay món trang sức yêu thích chỉ trong vòng 3 giờ
                  </Typography>
                </div>
              </Col>
              <Col span={8} className='gutter-row'>
                <div className='why-item'>
                  <img
                    src='https://cdn.pnj.io/images/image-update/2020/key_points/icon-circle-nbv.svg'
                    alt=''
                  />
                  <Typography className='item-title'>NGƯỜI BẠN VÀNG</Typography>
                  <div className='line'></div>
                  <Typography className='item-desc'>
                    Giải pháp tài chính cầm đồ; thu mua kim cương, túi hiệu và
                    đồng hồ cơ
                  </Typography>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </WhyContainer>
  );
};

export default Why;

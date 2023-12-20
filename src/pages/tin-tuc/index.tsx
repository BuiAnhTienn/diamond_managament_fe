import { Link } from 'react-router-dom';

import { MORELIST, NEWLIST } from './constants';

import { Breadcrumb, Col, Row, Typography } from 'antd';
import { NewsContainer } from './styled';

const TinTuc = () => {
  return (
    <NewsContainer>
      <div className='container'>
        <Breadcrumb
          items={[
            { title: 'Trang chủ' },
            {
              title: (
                <Link to='' className='breadcrumb-crr'>
                  Tin tức
                </Link>
              ),
            },
          ]}
          className='breadcrumb'
        />
        <img
          src='https://cdn.pnj.io/images/promo/191/tabsale-chung-t11-1972x640.png'
          alt=''
          className='w-full'
        />
        <Row gutter={50} className='relative my-5'>
          <Col span={16}>
            <div className='flex justify-between items-center'>
              <span className='text-[font-semibold'>CUNG - MỆNH</span>
              <div className='inline-block w-[80%] h-[4px] bg-secondaryColor'></div>
            </div>
            {NEWLIST.map((item, index) => (
              <Link
                to={'/tin-tuc/fwgyu12142412ca'}
                key={index}
                className='inline-block my-5'>
                <Row gutter={15}>
                  <Col span={8}>
                    <img src={item.imgURL} alt='' className='w-full' />
                  </Col>
                  <Col span={16}>
                    <Typography className='mb-2 text-[18px] font-semibold leading-6'>
                      {item.title}
                    </Typography>
                    <Typography className='mb-2 text-[13px] font-semibold'>
                      TRANG SỨC CUNG - MỆNH 19/11/2023
                    </Typography>
                    <Typography className='text-[#767676] text-[14px]'>
                      Những khía cạnh trong cuộc sống của Mậu Dần 1998 sẽ thay
                      đổi như thế nào trong năm 2024? Để Diamond bật mí nhé!
                      Tính...
                    </Typography>
                  </Col>
                </Row>
              </Link>
            ))}
          </Col>
          <Col span={8}>
            <div className='sticky top-[20px] h-auto'>
              <div className='flex justify-between items-center mb-5'>
                <span className='font-semibold'>TIN TỨC DIAMOND</span>
                <div className='inline-block w-[60%] h-[4px] bg-secondaryColor'></div>
              </div>
              <img
                src='https://www.pnj.com.vn/blog/wp-content/uploads/2022/05/1200-x-1200-1.jpg'
                alt=''
                className='w-full mb-5'
              />
              <div className='flex justify-between items-center'>
                <span className='text-[font-semibold'>XEM NHIỀU</span>
                <div className='inline-block w-[66%] h-[4px] bg-secondaryColor'></div>
              </div>
              {MORELIST.map((item, index) => (
                <Link
                  to='/tin-tuc/14bj1b3jk21b3kj12b3'
                  key={index}
                  className='inline-block my-5'>
                  <Row gutter={15}>
                    <Col span={8}>
                      <img
                        src={item.imgURL}
                        alt=''
                        className='w-[90px] h-[90px] rounded-[50%]'
                      />
                    </Col>
                    <Col span={16}>
                      <Typography className='mb-1 text-[12px] font-semibold'>
                        TRANG SỨC CUNG - MỆNH
                      </Typography>
                      <Typography className='text-[15px] font-semibold leading-4'>
                        {item.title}
                      </Typography>
                    </Col>
                  </Row>
                </Link>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </NewsContainer>
  );
};

export default TinTuc;

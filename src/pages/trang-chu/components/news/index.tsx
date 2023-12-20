import { Col, Row, Typography } from 'antd';
import { NewsContainer } from './styled';
import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const News = () => {
  return (
    <NewsContainer>
      <div className='news'>
        <Typography className='heading-label py-5 text-center'>
          Tin tức
        </Typography>
        <Row gutter={24}>
          <Col span={10}>
            <img
              src='https://firebasestorage.googleapis.com/v0/b/diamond-management-76c5a.appspot.com/o/image%2Fnews1.png?alt=media&token=fb86b13f-dec2-4f31-8d7e-eb54fa51e032'
              alt=''
              className='w-full'
            />
          </Col>
          <Col span={14} className='text-center'>
            <Row gutter={50} className='mb-5'>
              <Col span={12}>
                <img
                  src='https://firebasestorage.googleapis.com/v0/b/diamond-management-76c5a.appspot.com/o/image%2Fnews2.png?alt=media&token=5ac24a90-b631-40a6-8b7b-fa561dfacf9f'
                  alt=''
                  className='news-img'
                />
                <Typography className='news-title'>
                  Top 5 trang sức đính đá CZ được ưa chuộng nhất 2023
                </Typography>
                <Typography className='news-desc'>
                  Nếu bạn đang tìm cho mình phụ kiện đủ nổi bật nhưng không quá
                  lộng lẫy để song hành trong cuộc sống ngày thường, trang sức
                  đính đá CZ là lựa chọn hoàn hảo cho bạn!
                </Typography>
                <Typography className='flex items-center text-[12px]'>
                  Xem thêm <RightOutlined className='ml-3' />
                </Typography>
              </Col>
              <Col span={12}>
                <img
                  src='https://firebasestorage.googleapis.com/v0/b/diamond-management-76c5a.appspot.com/o/image%2Fnews2.png?alt=media&token=5ac24a90-b631-40a6-8b7b-fa561dfacf9f'
                  alt=''
                  className='news-img'
                />
                <Typography className='news-title'>
                  Top 5 trang sức đính đá CZ được ưa chuộng nhất 2023
                </Typography>
                <Typography className='news-desc'>
                  Nếu bạn đang tìm cho mình phụ kiện đủ nổi bật nhưng không quá
                  lộng lẫy để song hành trong cuộc sống ngày thường, trang sức
                  đính đá CZ là lựa chọn hoàn hảo cho bạn!
                </Typography>
                <Typography className='flex items-center text-[12px]'>
                  Xem thêm <RightOutlined className='ml-3' />
                </Typography>
              </Col>
            </Row>
            <Link to='/' className='more-btn'>
              Xem tất cả
            </Link>
          </Col>
        </Row>
      </div>
    </NewsContainer>
  );
};

export default News;

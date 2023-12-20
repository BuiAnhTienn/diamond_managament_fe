import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { TrendSliderContainer } from '../styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Typography from 'antd/es/typography/Typography';
import { v4 } from 'uuid';
import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@services/product.service';
import { useNavigate } from 'react-router-dom';

export const TrendSlider = () => {
  const navigate = useNavigate();
  const arrowId = v4();

  const { data: productData } = useQuery(['trending-product'], () =>
    getProduct({
      trending: true,
      page: 1,
      pageSize: 7,
    })
  );

  return (
    <TrendSliderContainer>
      <Swiper
        slidesPerView={6}
        spaceBetween={69}
        modules={[Navigation]}
        navigation={{
          nextEl: `#arrow-right${arrowId}`,
          prevEl: `#arrow-left${arrowId}`,
        }}
        className='trend-slider'
      >
        {productData?.docs?.map((item) => (
          <SwiperSlide
            key={item?._id}
            className='slide-item cursor-pointer'
            onClick={() => navigate(`/san-pham/${item._id}`)}
          >
            <img src={item?.image?.[0]} alt='' />
            <Typography className='item-label'>
              {item?.subCategory?.name}
            </Typography>
          </SwiperSlide>
        ))}
      </Swiper>
      <LeftOutlined id={`arrow-left${arrowId}`} className='arrow-right' />
      <RightOutlined id={`arrow-right${arrowId}`} className='arrow-left' />
    </TrendSliderContainer>
  );
};

export default TrendSlider;

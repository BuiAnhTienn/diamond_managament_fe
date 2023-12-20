import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { BrandSliderContainer } from '../styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Typography from 'antd/es/typography/Typography';
import { v4 } from 'uuid';

const data = [
  {
    label:
      'https://firebasestorage.googleapis.com/v0/b/diamond-management-76c5a.appspot.com/o/image%2Flabel1.png?alt=media&token=0a51c575-e283-49c7-9769-e39ccaf95ad8',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/spa-management-44019.appspot.com/o/image%2Fbrand1.png?alt=media&token=ba8ba39a-6472-4c16-bf2d-d3daca602e3d&_gl=1*12b1whr*_ga*MTMzNTExMDQxOS4xNjk4NDE2Nzg0*_ga_CW55HF8NVT*MTY5ODQ2NTAxOS4zLjEuMTY5ODQ2NjMzNC4zOS4wLjA.',
  },
  {
    label:
      'https://firebasestorage.googleapis.com/v0/b/diamond-management-76c5a.appspot.com/o/image%2Flabel2.png?alt=media&token=4d42de68-88d0-4ffe-8565-f84a560948d4',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/spa-management-44019.appspot.com/o/image%2Fbrand2.png?alt=media&token=ee687b7f-0a72-40b9-9f64-17b0b3b20d85&_gl=1*5lcthn*_ga*MTMzNTExMDQxOS4xNjk4NDE2Nzg0*_ga_CW55HF8NVT*MTY5ODQ2NTAxOS4zLjEuMTY5ODQ2NjMzOS4zNC4wLjA.',
  },
  {
    label:
      'https://firebasestorage.googleapis.com/v0/b/diamond-management-76c5a.appspot.com/o/image%2Flabel3.png?alt=media&token=9f5bebdf-15cf-4bd0-bb48-cac3c73a678d',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/spa-management-44019.appspot.com/o/image%2Fbrand3.png?alt=media&token=15f1c297-286a-49d7-95be-bb642d5c927b&_gl=1*pmam7g*_ga*MTMzNTExMDQxOS4xNjk4NDE2Nzg0*_ga_CW55HF8NVT*MTY5ODQ2NTAxOS4zLjEuMTY5ODQ2NjM0Mi4zMS4wLjA.',
  },
  {
    label:
      'https://firebasestorage.googleapis.com/v0/b/diamond-management-76c5a.appspot.com/o/image%2Flabel4.png?alt=media&token=5e0f14db-70a9-4b63-8915-942a89a31150',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/spa-management-44019.appspot.com/o/image%2Fbrand4.png?alt=media&token=46ae7b53-29ae-470f-a361-5a5a19a3794b&_gl=1*1ybtwxe*_ga*MTMzNTExMDQxOS4xNjk4NDE2Nzg0*_ga_CW55HF8NVT*MTY5ODQ2NTAxOS4zLjEuMTY5ODQ2NjM0NS4yOC4wLjA.',
  },
];

export const BrandSlider = () => {
  const arrowId = v4();
  return (
    <BrandSliderContainer>
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        modules={[Navigation]}
        navigation={{
          nextEl: `#arrow-left${arrowId}`,
          prevEl: `#arrow-right${arrowId}`,
        }}
        className='trend-slider'>
        {data.map((item, index) => (
          <SwiperSlide key={index} className='slide-item'>
            <img src={item.imgUrl} alt='' className='rounded-[5px]' />
            <div className='item-label'>
              <img src={item.label} className='' />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <LeftOutlined className='arrow-right' id={`arrow-right${arrowId}`} />
      <RightOutlined className='arrow-left' id={`arrow-left${arrowId}`} />
    </BrandSliderContainer>
  );
};

export default BrandSlider;

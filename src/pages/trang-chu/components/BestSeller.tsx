import { LeftOutlined, RightOutlined, StarFilled } from '@ant-design/icons';
import { BestSellerContainer } from '../styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Typography from 'antd/es/typography/Typography';

const data = [
  {
    label: 'Mặt dây chuyền Kim cương Vàng trắng 14K DIAMOND DDDDW000924',
    price: '23.100.000',
    imgUrl:
      'https://cdn.pnj.io/images/thumbnails/300/300/detailed/170/sp-gmddddw000924-mat-day-chuyen-kim-cuong-vang-trang-14k-pnj-1.png',
  },
  {
    label: 'Nhẫn Vàng 18K đính đá CZ DIAMOND XMXMY001713',
    price: '5.100.000',
    imgUrl:
      'https://cdn.pnj.io/images/thumbnails/300/300/detailed/47/gnxmxmy001713-nhan-vang-18k-dinh-da-cz-pnj-01.png',
  },
  {
    label: 'Lắc tay Vàng trắng Ý 18K DIAMOND 0000W000566',
    price: '12.100.000',
    imgUrl:
      'https://cdn.pnj.io/images/thumbnails/300/300/detailed/137/gl0000w000566-lac-tay-vang-trang-y-18k-pnj.png',
  },
  {
    label: 'Bông tai Vàng trắng 10K đính đá ECZ DIAMOND XMXMW001535',
    price: '4.990.000',
    imgUrl:
      'https://cdn.pnj.io/images/thumbnails/300/300/detailed/117/gbxmxmw001535-bong-tai-vang-trang-10k-dinh-da-ecz-pnj-01.png',
  },
  {
    label: 'Lắc tay Vàng 18K đính đá CZ DIAMOND XM00Y000028',
    price: '15.100.000',
    imgUrl:
      'https://cdn.pnj.io/images/thumbnails/300/300/detailed/133/glxm00y000028-lac-tay-vang-18k-dinh-da-cz-pnj-1.png',
  },
];

export const BestSellerSlider = () => {
  return (
    <BestSellerContainer>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        modules={[Navigation]}
        navigation={{ nextEl: '.arrow-left', prevEl: '.arrow-right' }}
        className='trend-slider'>
        {data.map((item, index) => (
          <SwiperSlide key={index} className='slide-item'>
            <div className='item-img'>
              <img src={item.imgUrl} alt='' className='prd-img' />
              <img
                src='https://cdn.pnj.io/images/image-update/tag-product/icon-tragop-2.svg'
                alt=''
                className='img-tag'
              />
            </div>
            <Typography className='item-label'>{item.label}</Typography>
            <Typography className='item-price'>{item.price}đ</Typography>
            <div className='item-bottom'>
              <span className='item-vote'>
                <StarFilled className='item-star' />
                <span>5(20)</span>
              </span>
              <span>696+ đã bán</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <LeftOutlined className='arrow-right' />
      <RightOutlined className='arrow-left' />
    </BestSellerContainer>
  );
};

export default BestSellerSlider;

import { Swiper, SwiperSlide } from 'swiper/react';
import { BannerSliderContainer } from '../styled';
import { Pagination } from 'swiper/modules';

export const BannerSlider = () => {
  return (
    <BannerSliderContainer>
      <Swiper
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className='banner'>
        <SwiperSlide className='slide-item'>
          <img src='https://firebasestorage.googleapis.com/v0/b/diamond-management-76c5a.appspot.com/o/image%2Fpnj-banner4.png?alt=media&token=f034e43a-57d3-4e48-a499-5efe8279b365.' />
        </SwiperSlide>
        <SwiperSlide className='slide-item'>
          <img src='https://firebasestorage.googleapis.com/v0/b/diamond-management-76c5a.appspot.com/o/image%2Fpnj-banner2.png?alt=media&token=460017a4-5860-4738-b786-1441ba1f107d' />
        </SwiperSlide>
        <SwiperSlide className='slide-item'>
          <img src='https://firebasestorage.googleapis.com/v0/b/diamond-management-76c5a.appspot.com/o/image%2Fpnj-banner3.png?alt=media&token=fbc9ab13-6dc2-4cb2-a6b5-3063a69068dd ' />
        </SwiperSlide>
      </Swiper>
    </BannerSliderContainer>
  );
};

export default BannerSlider;

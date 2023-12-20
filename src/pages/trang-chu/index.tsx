import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { getProduct, IProductQuery } from '@services/product.service';

import { BannerSlider } from './components/BannerSlider';
import ProductSlider from '@components/prd-slider';
import BrandSlider from './components/BrandSlider';
import TrendSlider from './components/TrendBanner';
import Button from '@components/Button';
import News from './components/news';
import Why from './components/why';

import { Typography } from 'antd';
import { HomepageContainer } from './styled';
import FacebookMessengerPlugin from '@components/FacebookMessenger';

const TrangChu = () => {
  const [paging] = useState<IProductQuery>({
    page: 1,
    pageSize: 6,
  });

  const { data: newProducts } = useQuery(
    ['product', paging],
    async () => {
      const result = await getProduct({ ...paging });
      return result?.docs;
    },
    { refetchOnWindowFocus: false, enabled: true }
  );

  const { data: ProductsFilterByMaterial } = useQuery(
    ['product-gold', paging],
    async () => {
      const result = await getProduct({ ...paging, search: 'Vàng' });
      return result?.docs;
    },
    { refetchOnWindowFocus: false, enabled: true }
  );

  return (
    <HomepageContainer>
      <BannerSlider />
      <div className='py-[40px]'>
        <div className='container'>
          <div className=''>
            <Typography className='heading-label mb-3 font-medium'>
              Xu hướng tìm kiếm
            </Typography>
            <TrendSlider />
            <div className='py-5'>
              <Typography className='heading-label mb-3 font-medium'>
                Thương hiệu nổi bật
              </Typography>
              <BrandSlider />
            </div>
            <div className='py-5'>
              <div className='heading'>
                <Typography className='heading-label mb-3 font-medium'>
                  Sản phẩm mới
                </Typography>
                <Link
                  to='/san-pham-theo-danh-muc/6546fd1c4d12d0936109152b'
                  className='more-btn'
                >
                  Xem thêm &gt;
                </Link>
              </div>
              <ProductSlider prdData={newProducts ?? []} />
            </div>
            <div className='diamond-list text-center'>
              <img
                src='https://firebasestorage.googleapis.com/v0/b/diamond-af5df.appspot.com/o/banner-2.jpg?alt=media&token=de78bba2-559c-4564-9ae2-cc30ed7ec9c8&_gl=1*xjdj46*_ga*MTMzNTExMDQxOS4xNjk4NDE2Nzg0*_ga_CW55HF8NVT*MTY5ODQ3MzM4My41LjEuMTY5ODQ3MzQxMS4zMi4wLjA.'
                alt=''
                className='w-full'
              />
              <Typography className='heading-label'>Trang sức vàng</Typography>
              <ProductSlider prdData={ProductsFilterByMaterial ?? []} />
              <Button className='more-btn2'>
                <Link to='/san-pham-theo-danh-muc/6546fcfd4d12d09361091529'>
                  Xem thêm
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className='advertisement'>
          <div className='store-banner'>
            Xem địa chỉ hệ thống hơn 69 Cửa Hàng Diamond trên toàn quốc
          </div>
          <img
            src='https://firebasestorage.googleapis.com/v0/b/diamond-management-76c5a.appspot.com/o/image%2Fbanner1.png?alt=media&token=e84cf3b4-8660-4ffe-8f2b-3402d65541c6'
            alt=''
            className='sub-banner'
          />
          <iframe
            width='80%'
            height='450px'
            src='https://www.youtube.com/embed/sv9ZjFedAJQ?si=LmoT-BOj9xEnT0F2'
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
          ></iframe>
        </div>
        <Why />
        <div className='container mb-20'>
          <News />
        </div>
      </div>
      <FacebookMessengerPlugin />
    </HomepageContainer>
  );
};

export default TrangChu;

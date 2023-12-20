import styled from 'styled-components';

export const HomepageContainer = styled.div`
  .banner {
    overflow: hidden;
  }
  /* .banner .slick-item {
    height: 500px;
  }
  .banner .slick-item img {
    height: 100%;
  } */
  .banner2,
  .banner3 {
    font-family: 'Roboto', sans-serif;
  }

  .slick-slide div {
    outline: none;
    cursor: pointer;
  }
  .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .heading-label {
    color: var(--secondary-color);
    font-size: 20px;
    font-weight: 500;
  }
  .more-btn {
    color: #707070;
    font-weight: 300;
    border-bottom: 1px solid #707070;
  }
  .more-btn2 {
    margin: 20px 0;
    font-size: 14px;
    border: 1px solid var(--secondary-color);
    border-radius: 3px;
  }
  .advertisement {
    padding-bottom: 20px;
    background: #000;
    text-align: center;
  }
  .store-banner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    padding: 0 18%;
    background-image: url('https://cdn.pnj.io/images/image-update/2020/key_points/cuahangbanner.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    color: #fff;
    font-size: 44px;
    font-weight: 300;
    text-align: center;
  }
  .sub-banner {
    width: 80%;
    margin-bottom: 10px;
  }
  .why-top {
    padding-top: 15px;
    padding-bottom: 70px;
    background: var(--secondary-color);
    text-align: center;
  }
  .why-heading {
    color: #fff;
    font-size: 44px;
  }
  .why-bottom {
    margin: -70px auto 0;
  }
  .why-list {
    width: 50%;
    margin: 0 auto;
  }
  .why-item {
    text-align: center;
  }
  .item-title {
  }
`;

export const BannerSliderContainer = styled.div`
  .slide-item img {
    width: 100%;
    height: 500px;
  }
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
  }
`;

export const TrendSliderContainer = styled.div`
  position: relative;

  .slide-item {
    text-align: center;
  }
  .slide-item img {
    width: 100%;
  }
  .item-label {
    font-size: 13px;
  }
  .arrow-left,
  .arrow-right {
    position: absolute;
    top: 30%;
    transform: translateY(50%);
    display: block;
    width: 40px;
    height: 40px;
    p: 5px;
    color: #8d8c8c;
    font-size: 25px;
    borderradius: 50%;
    cursor: pointer;
    zindex: 69;
  }
  .arrow-right {
    left: -5%;
  }
  .arrow-left {
    right: -5%;
  }
`;

export const BrandSliderContainer = styled.div`
  position: relative;

  .slide-item {
    position: relative;
    text-align: center;
    height: 400px;
  }
  .slide-item img {
    width: 100%;
  }
  .item-label {
    position: absolute;
    bottom: 5%;
    right: 50%;
    transform: translateX(50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 60px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
  }
  .item-label img {
    width: 50%;
  }
  .arrow-left,
  .arrow-right {
    position: absolute;
    top: 30%;
    transform: translateY(50%);
    display: block;
    width: 40px;
    height: 40px;
    p: 5px;
    color: #8d8c8c;
    font-size: 25px;
    borderradius: 50%;
    cursor: pointer;
    zindex: 69;
  }
  .arrow-right {
    left: -5%;
  }
  .arrow-left {
    right: -5%;
  }
`;

export const BestSellerContainer = styled.div`
  position: relative;

  .slide-item {
    position: relative;
    text-align: center;
    display: flex;
    flex-direction: column;
    padding: 10px;
    background: linear-gradient(to bottom, #fff 0%, #f7f7f7 100%);
  }
  .item-img {
    position: relative;
    margin-bottom: 10px;
  }
  .prd-img {
    width: 100%;
  }
  .item-label {
    color: #282828;
    font-size: 14px;
  }
  .item-label img {
    width: 50%;
  }
  .img-tag {
    position: absolute;
    right: 2%;
    bottom: 0;
    width: 30px;
  }
  .item-price {
    margin-bottom: 30px;
    color: var(--primary-color);
    font-weight: 500;
  }
  .item-bottom {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 11px;
    color: #333;
  }
  .item-vote {
  }
  .item-star {
    margin-right: 2px;
    color: #ffc107;
  }
  .arrow-left,
  .arrow-right {
    position: absolute;
    top: 30%;
    transform: translateY(50%);
    display: block;
    width: 40px;
    height: 40px;
    p: 5px;
    color: #8d8c8c;
    font-size: 25px;
    borderradius: 50%;
    cursor: pointer;
    zindex: 69;
  }
  .arrow-right {
    left: -5%;
  }
  .arrow-left {
    right: -5%;
  }
`;

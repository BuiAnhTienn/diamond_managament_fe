import styled from 'styled-components';

export const BreadcrumbsContainer = styled.div`
  .breadcrumb {
    padding: 10px 0;
    font-size: 15px;
  }
  .breadcrumb ol {
    justify-content: center;
  }
  .breadcrumb-crr:visited {
    color: #000;
  }
`;

export const PrdInfoContainer = styled.div`
  .prd-name {
    margin-bottom: 20px;
    font-weight: 400;
  }

  .prd-price {
    margin-bottom: 20px;
    color: var(--secondary-color);
    font-size: 20px;
    font-weight: 500;
  }
  .prd-info {
    margin-bottom: 20px;
    font-size: 13px;
  }
  .count-btns {
    margin-right: 40px;
    border: 1px solid #d3d3d3;
  }
  .plus-btn {
    padding: 0;
    border-right: 1px solid #d3d3d3;
  }
  .minus-btn {
    padding: 0;
    border-left: 1px solid #d3d3d3;
  }
  .buy-btn {
    width: 100%;
    height: auto;
    padding: 10px 0;
    margin-bottom: 10px;
    background: #ad2a36;
    color: #fff;
    font-weight: 500;
    border-radius: 5px;
  }

  .buy-btn.disabled {
    background-color: grey;
  }

  .buy-btn p:first-child {
    font-size: 12px;
    font-weight: 700;
    line-height: 10px;
  }
  .buy-btn p:last-child {
    font-size: 11px;
    font-weight: 400;
    font-style: italic;
  }
  .more-info {
    list-style: none;
  }
  .more-info-icon {
    margin-right: 10px;
    font-size: 12px;
  }
  .more-info-desc {
    font-size: 12px;
    font-weight: 400;
  }
`;

export const DescContainer = styled.div`
  padding: 0 30px;
  .desc-heading {
    display: inline-block;
    padding-bottom: 5px;
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 600;
    border-bottom: 2px solid var(--secondary-color);
  }
`;

export const SwiperContainer = styled.div`
  .swiper {
    width: 100%;
    height: 100%;
  }
`;

export const PrdDetailContainer = styled.div`
  padding: 0 0 40px;
  //
  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* .swiper {
    width: 100%;
    height: 300px;
    margin-left: auto;
    margin-right: auto;
  } */

  .swiper-slide {
    background-size: cover;
    background-position: center;
    cursor: pointer;
  }

  /* .mySwiper2 {
    width: 100%;
    height: 450px;
  } */

  /* .mySwiper {
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0;
  }

  .mySwiper .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  } */
  .mySwiper {
    height: 420px;
  }

  .mySwiper .swiper-slide-thumb-active {
    opacity: 1;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  //

  .mySwiper .swiper-slide {
    width: 100%;
    height: auto !important;
    /* display: flex;
    flex-direction: column; */
  }

  .prd-name {
    margin-bottom: 20px;
    font-weight: 400;
  }

  .prd-price {
    margin-bottom: 20px;
    color: var(--secondary-color);
    font-weight: 500;
  }
  .prd-info {
    margin-bottom: 20px;
    font-size: 13px;
  }
  .buy-btn {
    width: 100%;
    height: auto;
    padding: 10px 0;
    background: #ad2a36;
    color: #fff;
    font-weight: 500;
    border-radius: 5px;
  }
  .buy-btn p:first-child {
    font-size: 12px;
    line-height: 10px;
  }
  .buy-btn p:last-child {
    font-size: 11px;
  }
`;

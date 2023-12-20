import styled from 'styled-components';

export const ProductSliderContainer = styled.div`
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
    /* fill: #ffc107; */
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

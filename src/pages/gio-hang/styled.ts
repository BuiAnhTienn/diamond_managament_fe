import styled from 'styled-components';

export const GioHangContainer = styled.div`
  padding: 40px 0;
  background: #f5f5f5;
  .cart {
    position: relative;
  }
  .heading {
    padding: 10px 0;
    margin-bottom: 20px;
    background: #fff;
  }
  .heading-item {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 40px;
    padding: 5px 0;
    /* background: #000; */
    line-height: 28px;
    text-align: center;
  }
  .heading-name {
    justify-content: start;
  }
  .prd-item {
    align-items: center;
    padding: 20px 0;
    background: #fff;
    /* background: black; */
  }
  .prd-item + .prd-item {
    margin-top: 20px;
  }
  .prd-item > div > div {
    padding: 5px 0;
    text-align: center;
  }
  .prd-item > div > .prd-name {
    text-align: start;
    /* justify-content: start; */
  }
  .item-img {
    width: 100%;
  }
  .count-btns button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 0;
  }
  .count-btns button svg {
    font-size: 10px;
  }
  .count-numb {
    height: 40px;
    padding: 0 10px;
    line-height: 36px;
    border: 1px solid #ddd;
  }
  .item-price,
  .item-total-price {
    font-weight: 600;
  }
  .pay {
    position: sticky;
    top: 120px;
    width: 100%;
    height: auto;
    padding: 20px;
    background: #fff;
  }
  .total {
  }
  .total-title {
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: 500;
  }
  .total-price,
  .total-price-label {
    font-size: 18px;
  }
  .total-price-cost {
    font-size: 20px;
    font-weight: 600;
    text-align: end;
  }
  .pay-btn {
    width: 100%;
    height: 45px;
    margin-top: 30px;
    background: #333;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    border: none;
    border-radius: 0;
  }
  .pay-btn a:visited {
    color: #fff;
  }
  .total-btns {
    justify-content: space-between;
    width: 100%;
  }
  .total-btns button {
    width: 42%;
    margin-top: 20px;
    border-radius: 0;
  }
  .total-btns button:first-child {
    background: #d04e4e;
    color: #fff;
    border: none;
  }
  .total-btns button:last-child {
    border: 1px solid #333;
  }
`;

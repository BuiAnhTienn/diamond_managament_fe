import styled from 'styled-components';

export const CheckoutContainer = styled.div`
  padding: 40px 0;
  background: #f5f5f5;
  .checkout-main {
    padding: 30px;
    background: #fff;
  }
  .checkout-heading {
    margin-bottom: 20px;
    font-weight: 600;
  }
  .checkout-form article {
    margin: 8px 0;
    font-weight: 500;
  }
  .checkout-form input {
    width: 100%;
    height: 35px;
    padding: 0 10px;
    color: #333;
    font-size: 17px;
  }
  .checkout-form textarea {
    width: 100%;
    padding: 0 10px;
    color: #333;
    font-size: 17px;
  }
  .pay {
    padding: 30px;
    background: #fff;
  }
  .total-title {
    margin-bottom: 20px;
    font-weight: 600;
  }
  .pay-table {
    margin-bottom: 20px;
    font-size: 14px;
    border-collapse: collapse;
    text-align: center;
  }
  .pay-table,
  tr,
  th,
  td {
    padding: 10px;
    border: 1px solid #ececec;
  }
  tr {
    /* padding: 10px; */
  }
  .pay-table-heading {
    font-weight: 600;
  }
  .total-label {
    font-size: 16px;
    font-weight: 700;
    text-align: start;
  }
  .total-price {
    font-size: 16px;
    font-weight: 700;
    text-align: end;
  }
  .cash {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    margin-bottom: 20px;
    border: 1px solid #ececec;
  }
  .order-btn {
    width: 100%;
    height: 40px;
    background: #333;
    color: #fff;
    font-weight: 500;
    border: none;
    border-radius: 0;
  }
`;

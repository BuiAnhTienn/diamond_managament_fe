import styled from 'styled-components';

export const PaymentContainer = styled.div`
  .pay-table {
    margin: 20px 0;
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

import styled from 'styled-components';

export const NewsContainer = styled.div`
  padding: 0 0 40px;
  .breadcrumb {
    padding: 10px 0;
    font-size: 14px;
  }
  .breadcrumb ol {
    justify-content: center;
  }
  .breadcrumb-crr:visited {
    color: #000;
  }
  .all-btn {
    width: 150px;
    height: 34px;
    margin-bottom: 30px;
    background: #fff;
    color: var(--secondary-color);
    font-size: 16px;
    border: 1px solid var(--secondary-color);
    border-radius: 5px;
  }
`;

export const SaleContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
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
    cursor: pointer;
  }
  .arrow-right {
    left: -5%;
  }
  .arrow-left {
    right: -5%;
  }
`;

export const BrandContainer = styled.div`
  position: relative;
  width: 90%;
  margin: 20px auto;
  .arrow-left,
  .arrow-right {
    position: absolute;
    top: 30%;
    transform: translateY(50%);
    display: block;
    width: 40px;
    height: 40px;
    color: #8d8c8c;
    font-size: 25px;
    cursor: pointer;
  }
  .arrow-right {
    left: -5%;
  }
  .arrow-left {
    right: -5%;
  }
`;

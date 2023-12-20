import styled from "styled-components";

export const PrdCardContainer = styled.div`
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 400px;
  padding: 10px 0;
  background: linear-gradient(to bottom, #fff 0%, #f7f7f7 100%);
  .filter-heading {
    margin-bottom: 10px;
    font-size: 12px;
  }
  .filter-select {
    margin-right: 5px;
  }
  .ant-select-selection-item {
    font-size: 12px;
  }
  .item-img {
    position: relative;
    margin-bottom: 10px;
  }
  .prd-img {
    width: 100%;
    min-height: 250px;
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

  .promotion {
    position: absolute;
    top: 0;
    right: 3px;
    padding: 5px;
    background-color: #c48c46;
    color: white;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

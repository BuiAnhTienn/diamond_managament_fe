import styled from "styled-components";

export const HeaderContainer = styled.div`
  width: 100%;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.16);
  .header-top {
    width: 100%;
    height: 80px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
  }
  .header-logo {
    height: 80%;
    cursor: pointer;
  }
  .header-info div,
  .header-user div {
    display: flex;
    align-items: center;
    color: #4d4d4d;
    font-size: 13px;
  }
  .header-info img,
  .header-user img {
    width: 18px;
    height: 18px;
    margin-right: 5px;
    object-fit: contain;
  }
  .header-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
  }
  .header-link {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    width: 70%;
    height: 100%;
    font-size: 14px;
  }
  .header-link li {
    display: inline-flex;
    align-items: center;
    /* width: 100%; */
    height: 100%;
    padding-right: 70px;
  }
  .header-link li a {
  }
  .header-search {
    width: 28%;
    height: 35px;
    background: #ededed;
    border-radius: 40px;
    font-style: italic;
  }
  .header-dropdown {
    position: absolute;
    top: 130px;
    width: 100%;
    height: 500px;
    background: #fff;
    box-shadow: 0 2px 6px #efefef;
    z-index: 69;
  }
  .ant-input-affix-wrapper {
    background-color: #fff;
  }
`;

import styled from 'styled-components';

export const UserInfoContainer = styled.div`
  padding: 20px 40px 40px;
  .heading {
    padding-bottom: 15px;
    margin-bottom: 10px;
    font-size: 18px;
    border-bottom: 1px solid #efefef;
  }
  .content {
    display: flex;
    justify-content: space-between;
  }
  .info-form {
    width: 60%;
    margin-left: 30px;
  }
  .form-field {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 20px 0;
  }
  .form-field article {
    width: 25%;
    padding-right: 20px;
    font-size: 14px;
    color: #555555cc;
    text-align: end;
  }
  .form-field > input {
    width: 75%;
    height: 35px;
    padding: 12px;
    border: 1px solid rgba(0, 0, 0, 0.14);
    border-radius: 2px;
    box-shadow: inset 0 2px 0 rgba(0, 0, 0, 0.02);
    outline: none;
  }
  .avatar {
    width: 30%;
    margin: 15px 0;
    text-align: center;
    border-left: 1px solid #efefef;
  }
  .ava-img {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
    border-radius: 50%;
  }
  .save-btn {
    width: 75%;
    margin-left: auto;
    border-radius: 2px;
  }
  .save-btn button {
    padding: 0 25px;
    border-radius: 2px;
  }
`;

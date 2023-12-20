import styled from 'styled-components';

export const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8fafc;
  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 450px;
    height: 100%;
    padding: 40px 60px;
    background: #fff;
    border-radius: 5px;
    z-index: 69;
  }
  .login-form {
    width: 100%;
  }
  .login-form input {
    height: 36px;
  }
  .login-back {
    color: #333;
    cursor: pointer;
  }
  .login-back:hover {
    color: var(--primary-color);
  }
  .login-logo {
    width: 150px;
  }
  .login-btn {
    width: 100%;
    height: 36px;
    margin-top: 20px;
    margin-bottom: 20px;
    background: var(--primary-color);
    color: #fff;
    font-weight: 500;
    border-radius: 5px;
  }
  .login-info p {
    line-height: 24px;
  }
  .login-info span {
    margin: 0 8px;
    color: #4f46e5;
  }
  .signup-link {
    display: inline-block;
    width: 100%;
    margin: 0 auto;
  }
  .signup-btn {
    color: var(--primary-color);
  }
`;

import styled from 'styled-components';

export const ContactContainer = styled.div`
  .contact {
    position: relative;
    font-size: 17px;
  }
  .contact-content {
    color: #fff;
  }
  .contact-bg {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 600px;
    background: url('../../../public/contact-bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;
  }
  .contact-title {
    margin-bottom: 20px;
    font-size: 40px;
  }
  .contact-sub {
    font-size: 24px;
  }
  .contact__form {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    width: 88%;
    padding: 60px 80px;
    margin-top: -100px;
    background-color: #fff;
  }
  .contact__form--content {
    width: 50%;
  }
  .contact__form--send {
    width: 50%;
  }
  .contact__form--title {
    margin-bottom: 15px;
    font-size: 30px;
    font-weight: 600;
  }
  .contact__form--sub {
    margin-bottom: 50px;
  }
  .contact__form--info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 80px;
    width: 100%;
  }
  .info-item img {
    width: 18%;
    margin-bottom: 15px;
  }
  .info-title {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 700;
  }
  .info-desc {
    font-weight: 300;
  }
  .send-title {
    margin-bottom: 40px;
    font-size: 30px;
    font-weight: 600;
  }
  .send-form div {
    margin-bottom: 20px;
  }
  .send-form p {
    margin-bottom: 3px;
  }
  .send-form div input {
    width: 100%;
    height: 40px;
    padding: 10px;
    border: 1px solid #ddd;
    color: #333;
    font-weight: 500;
    outline: none;
  }
  .send-form div textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    outline: none;
  }
  .send-form button {
    width: 150px;
    height: 48px;
    border-radius: 0;
    font-size: 18px;
    font-weight: 600;
  }
`;

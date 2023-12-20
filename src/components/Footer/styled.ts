import styled from 'styled-components';

export const FooterContainer = styled.div`
  padding: 0 10%;
  .footer {
    padding: 50px 0;
    border-top: 1px solid #858585;
  }
  .footer-logo {
    width: 200px;
  }
  .footer p,
  .footer a {
    font-size: 13px;
  }
  .footer-heading {
    margin-bottom: 10px;
    font-size: 13px;
    font-weight: 600;
  }
  .socials {
    display: flex;
    margin-bottom: 10px;
    list-style: none;
  }
  .socials img {
    width: 30px;
    margin-right: 10px;
  }
`;

import styled from 'styled-components';

export const TaiKhoanContainer = styled.div`
  padding: 40px 0;
  background: #eee;
  .header-wrapper {
    display: flex;
    justify-content: space-between;
  }
  .header-title {
    font-size: 24px;
    font-weight: 600;
  }
  .header-admin {
    display: flex;
    align-items: center;
  }
  .header-dropdown {
    display: flex;
    align-items: center;
  }
  .header-hi {
    display: flex;
    align-items: center;
    margin-right: 10px;
    color: #333;
    font-weight: 600;
  }
  .admin-icon {
    width: 30px;
    margin-bottom: 5px;
    margin-left: 8px;
  }
  .ant-layout-content {
    margin: 0 30px !important;
  }
`;

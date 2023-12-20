import React from 'react';

const InfoList = () => {
  return (
    <div className='contact__form--info'>
      <div className='info-item'>
        <img
          src='https://oanispa.com/wp-content/uploads/2022/12/location-svgrepo-com.svg'
          alt=''
        />
        <p className='info-title'>ĐỊA CHỈ</p>
        <p className='info-desc'>46 Phan Liêm, Ngũ Hành Sơn, Đà Nẵng</p>
      </div>
      <div className='info-item'>
        <img
          src='https://oanispa.com/wp-content/uploads/2022/12/clock-svgrepo-com.svg'
          alt=''
        />
        <p className='info-title'>GIỜ MỞ CỬA</p>
        <p className='info-desc'>09:00 – 23:00 hàng ngày</p>
        <p>Đặt hẹn cuối cùng: 22:30</p>
      </div>
      <div className='info-item'>
        <img
          src='https://oanispa.com/wp-content/uploads/2022/12/email-svgrepo-com.svg'
          alt=''
        />
        <p className='info-title'>E-MAIL</p>
        <p className='info-desc'>info@oanispa.com</p>
      </div>
      <div className='info-item'>
        <img
          src='https://oanispa.com/wp-content/uploads/2022/12/phone-svgrepo-com-1.svg'
          alt=''
        />
        <p className='info-title'>ĐIỆN THOẠI</p>
        <p className='info-desc'>0917 020 468</p>
      </div>
    </div>
  );
};

export default InfoList;

import { Col, Row } from 'antd';
import { FooterContainer } from './styled';
import { Link } from 'react-router-dom';
import logo from '@assets/logo-nobg.png';

const Footer = () => {
  return (
    <FooterContainer>
      <div className='footer '>
        <div className=''>
          <img src={logo} alt='' className='footer-logo mb-5' />
          <Row gutter={40}>
            <Col span={9}>
              <p className='footer-heading'>
                © 2017 Công Ty Cổ Phần Vàng Bạc Đá Quý Diamond
              </p>
              <p>69 Võ Văn Kiệt, P.Phước Mỹ, Q.Sơn Trà, TP.Đà Nẵng</p>
              <p>ĐT: 096 969 6969 - Fax: 0369 963 369</p>
              <p>
                Giấy chứng nhận đăng ký doanh nghiệp: 0300521758 do Sở Kế hoạch
                & Đầu tư TP.Đà Nẵng cấp lần đầu ngày 02/01/2004. Ngành, nghề
                kinh doanh
              </p>
              <p>Tổng đài hỗ trợ (08:00-21:00, miễn phí gọi)</p>
              <p>Gọi mua: 19006969 (phím 1)</p>
              <p>Khiếu nại: 19006969 (phím 2)</p>
            </Col>
            <Col span={4}>
              <p className='footer-heading'>VỀ DIAMOND</p>
              <ul className='ty-text-links'>
                <li className='ty-text-links__item ty-level-0'>
                  <Link to='/' className=''>
                    Câu chuyện DIAMOND
                  </Link>
                </li>
                <li className='ty-text-links__item ty-level-0'>
                  <Link to='/' className=''>
                    Tuyển dụng
                  </Link>
                </li>
                <li className='ty-text-links__item ty-level-0'>
                  <Link to='/' className=''>
                    Xuất khẩu
                  </Link>
                </li>
                <li className='ty-text-links__item ty-level-0'>
                  <Link to='/' className=''>
                    Kinh doanh sỉ
                  </Link>
                </li>
                <li className='ty-text-links__item ty-level-0'>
                  <Link to='/' className=''>
                    Kiểm định kim cương
                  </Link>
                </li>
                <li className='ty-text-links__item ty-level-0'>
                  <Link to='/' className=''>
                    Kinh doanh vàng miếng
                  </Link>
                </li>
              </ul>
            </Col>
            <Col span={6}>
              <p className='footer-heading'>DỊCH VỤ KHÁCH HÀNG</p>
              <ul className='ty-text-links'>
                <li className='ty-text-links__item ty-level-0'>
                  <Link to='/' className='ty-text-links__a'>
                    Hướng dẫn đo size trang sức
                  </Link>
                </li>
                <li className='ty-text-links__item ty-level-0'>
                  <Link to='/' className='ty-text-links__a'>
                    Mua hàng trả góp
                  </Link>
                </li>
                <li className='ty-text-links__item ty-level-0'>
                  <Link to='/' className='ty-text-links__a'>
                    Hướng dẫn mua hàng và thanh toán
                  </Link>
                </li>
                <li className='ty-text-links__item ty-level-0'>
                  <Link to='/' className='ty-text-links__a'>
                    Chính sách hoàn tiền
                  </Link>
                </li>
                <li className='ty-text-links__item ty-level-0'>
                  <Link to='/' className='ty-text-links__a'>
                    Chính sách giao hàng
                  </Link>
                </li>
                <li className='ty-text-links__item ty-level-0'>
                  <Link to='/' className='ty-text-links__a' rel='nofollow'>
                    Cẩm nang sử dụng trang sức
                  </Link>
                </li>
                <li className='ty-text-links__item ty-level-0'>
                  <Link to='/' className='ty-text-links__a'>
                    Chính sách bảo hành thu đổi
                  </Link>
                </li>
                <li className='ty-text-links__item ty-level-0'>
                  <Link to='/' className='ty-text-links__a'>
                    Chính sách khách hàng thân thiết
                  </Link>
                </li>
                <li className='ty-text-links__item ty-level-0'>
                  <Link to='/' className='ty-text-links__a'>
                    Chính sách bảo mật thông tin khách hàng
                  </Link>
                </li>
                <li className='ty-text-links__item ty-level-0'>
                  <Link to='/' className='ty-text-links__a'>
                    Chính sách xử lý dữ liệu cá nhân
                  </Link>
                </li>
                <li className='ty-text-links__item ty-level-0'>
                  <Link to='/' className='ty-text-links__a'>
                    Câu hỏi thường gặp
                  </Link>
                </li>
              </ul>
            </Col>
            <Col span={5}>
              <p className='footer-heading'>KẾT NỐI VỚI CHÚNG TÔI</p>
              <ul className='socials'>
                <li>
                  <Link to={'/'}>
                    <img src='https://cdn.pnj.io/images/image-update/footer/facebook.svg' />
                  </Link>
                </li>
                <li>
                  <Link to={'/'}>
                    <img src='https://cdn.pnj.io/images/image-update/footer/instagram.svg' />
                  </Link>
                </li>
                <li>
                  <Link to={'/'}>
                    <img src='https://cdn.pnj.io/images/image-update/footer/youtube.svg' />
                  </Link>
                </li>
                <li>
                  <Link to={'/'}>
                    <img src='https://cdn.pnj.io/images/image-update/footer/email.svg' />
                  </Link>
                </li>
              </ul>
              <p className='footer-heading'>QUAN TÂM ZALO DIAMOND</p>
              <p className='mb-2'>Nhận các thông tin khuyến mãi hấp dẫn</p>
              <Link to='/'>
                <img src='https://cdn.pnj.io/images/2023/zalo.png' alt='' />
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    </FooterContainer>
  );
};

export default Footer;

import { Link } from 'react-router-dom';

import { Breadcrumb, Col, Row, Typography } from 'antd';
import { NewsContainer } from './styled';
import { MORELIST } from '@pages/tin-tuc/constants';

const ChiTietTinTuc = () => {
  return (
    <NewsContainer>
      <div className='container'>
        <Breadcrumb
          items={[
            { title: 'Trang chủ' },
            {
              title: (
                <Link to='' className='breadcrumb-crr'>
                  Tin tức
                </Link>
              ),
            },
          ]}
          className='breadcrumb'
        />
        <img
          src='https://cdn.pnj.io/images/promo/191/tabsale-chung-t11-1972x640.png'
          alt=''
          className='w-full mb-10'
        />
        <Typography className='mb-4 text-[40px] font-bold leading-[48px]'>
          Tuổi Giáp Tuất 1994, điều gì đang chờ đợi bạn trong năm 2024? Đá quý
          nào sẽ mang lại may mắn cho bạn trong năm mới?
        </Typography>
        <Typography className='mb-3 text-sm font-medium text-[#747474]'>
          Blog Trang Sức Cung - Mệnh
        </Typography>
        <span className='text-[14px]'>18/11/2023</span>
        <Row gutter={50} className='relative my-5'>
          <Col span={16}>
            <Typography className='text-[18px]'>
              Vận mệnh của các Giáp Tuất 1994 sẽ có những thay đổi gì trong năm
              2024? Đâu sẽ là viên đá phong thuỷ phù hợp? Đón xem tại đây nhé!
            </Typography>
            <Typography className='my-5 text-[18px] font-semibold'>
              Tổng quan về Giáp Tuất 1994
            </Typography>
            <Typography className='text-[18px]'>
              Giáp Tuất 1994 là những người ngay thẳng, chân thành và giàu lòng
              nhân ái. Họ đặt lợi ích của cộng đồng lên trên lợi ích cá nhân,
              sẵn sàng giúp đỡ những người xung quanh và dễ mủi lòng trước những
              hoàn cảnh khó khăn. Tính cách nổi bật khác của Giáp Tuất là sự độc
              lập, không thích phụ thuộc và có chính kiến riêng, không ngại đưa
              ra quan điểm cá nhân. Ngoài ra, lòng trung thành của Giáp Tuất
              1994 luôn được người khác ngưỡng mộ và nể trọng. 3 viên đá phong
              thuỷ che chở sức khoẻ của các chủ nhân.
            </Typography>
            <Typography className='my-5 text-[18px] font-semibold'>
              Xem trang sức đá màu:
            </Typography>
            <Typography className='mb-5 text-[18px]'>
              Khi đối diện với thử thách, những chú cún thường không than thở mà
              luôn bình tĩnh tìm hướng giải quyết và vượt qua. Họ có suy nghĩ
              thấu đáo, làm việc luôn cân nhắc trước sau mạch lạc. Với ý chí bền
              bỉ và sự nỗ lực không ngừng nghỉ, các Giáp Tuất luôn dễ dàng thích
              nghi với mọi môi trường sống. Người tuổi này biết cách dung hòa
              năng lượng, cư xử khéo léo khiến mọi người cảm thấy dễ chịu và ấm
              áp khi kề bên.
            </Typography>
            <img
              src='https://www.pnj.com.vn/blog/wp-content/uploads/2023/11/Tuoi-Giap-Tuat-1994-dieu-gi-dang-cho-doi-ban-trong-2024-Da-quy-nao-se-mang-lai-may-man-cho-ban-trong-nam-moi.jpg'
              alt=''
              className='w-full'
            />
            <Typography className='my-5 text-[18px] font-semibold'>
              Xem sản phẩm trên hình
            </Typography>
            <img
              src='https://cdn.pnj.io/images/detailed/151/gmrbxmy000582-mat-day-chuyen-vang-18k-dinh-da-ruby-pnj-1.png'
              alt=''
              className='w-full'
            />
            <Typography className='mb-5 text-[18px]'>
              Năm 2024 sẽ là thời điểm mà các Giáp Tuất phải đối diện với nhiều
              thử thách và gian nan. Tuy nhiên, trong nguy có cơ, nhiều cơ hội
              mới trong công việc và cuộc sống sẽ cùng song hành với khó khăn.
            </Typography>
            <img
              src='https://www.pnj.com.vn/blog/wp-content/uploads/2023/11/Tuoi-Giap-Tuat-1994-dieu-gi-dang-cho-doi-ban-trong-2024-Da-quy-nao-se-mang-lai-may-man-cho-ban-trong-nam-moi-1.jpg'
              alt=''
              className='w-full'
            />
          </Col>
          <Col span={8}>
            <div className='sticky top-[20px] h-auto'>
              <div className='flex justify-between items-center mb-5'>
                <span className='font-semibold'>Bài viết nổi bật</span>
                <div className='inline-block w-[60%] h-[4px] bg-secondaryColor'></div>
              </div>
              <img
                src='https://www.pnj.com.vn/blog/wp-content/uploads/2022/05/1200-x-1200-1.jpg'
                alt=''
                className='w-full mb-5'
              />
              {MORELIST.map((item, index) => (
                <Link
                  to='/tin-tuc/j3n14kjbjk4b3j'
                  key={index}
                  className='inline-block my-5'>
                  <Row gutter={15}>
                    <Col span={8}>
                      <img
                        src={item.imgURL}
                        alt=''
                        className='w-[90px] h-[90px] rounded-[50%]'
                      />
                    </Col>
                    <Col span={16}>
                      <Typography className='mb-1 text-[12px] font-semibold'>
                        TRANG SỨC CUNG - MỆNH
                      </Typography>
                      <Typography className='text-[15px] font-semibold leading-4'>
                        {item.title}
                      </Typography>
                    </Col>
                  </Row>
                </Link>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </NewsContainer>
  );
};

export default ChiTietTinTuc;

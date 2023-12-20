import Button from "@components/Button";
import InfoList from "./components/InfoList";
import { ContactContainer } from "./styled";
import StoreList from "@pages/trang-chu/components/StoreList";

const LienHe = () => {
  return (
    <ContactContainer>
      <div className="contact">
        <div className="contact-bg">
          <div className="contact-content">
            <p className="contact-title">Liên hệ</p>
            <p className="contact-sub">
              Liên hệ với chúng tôi qua các kênh sau
            </p>
          </div>
        </div>
        <div className="contact__form">
          <div className="contact__form--content">
            <p className="contact__form--title">Liên hệ chúng tôi</p>
            <p className="contact__form--sub">
              Mọi chi tiết về sản phẩm dịch vụ xin vui lòng liên hệ với chúng
              tôi.
            </p>
            <InfoList />
          </div>
          <div className="contact__form--send">
            <p className="send-title">Gửi liên hệ</p>
            <div className="send-form">
              <div>
                <p>Họ và tên</p>
                <input type="text" />
              </div>
              <div>
                <p>Email</p>
                <input type="text" />
              </div>
              <div>
                <p>Điện thoại</p>
                <input type="text" />
              </div>
              <div>
                <p>Nội dung</p>
                <textarea rows={8} />
              </div>
              <Button>GỬI ĐI</Button>
            </div>
          </div>
        </div>
        <div className="info p-10 bg-[#FFF9EE]">
          <div className="container flex justify-between">
            <div className="w-[33%] h-[400px] py-5 overflow-y-scroll">
              <StoreList />
            </div>
          </div>
        </div>
      </div>
    </ContactContainer>
  );
};

export default LienHe;

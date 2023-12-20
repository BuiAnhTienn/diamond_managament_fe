import { useEffect } from "react";

function FacebookMessengerPlugin() {
  useEffect(() => {
    // Tạo một script element
    const script = document.createElement("script");

    // Đặt nội dung của script là đoạn mã cần chèn
    script.innerHTML = `
      var chatbox = document.getElementById('fb-customerchat');
      chatbox?.setAttribute("page_id", 158425887359214);
      chatbox.setAttribute("attribution", "biz_inbox");

      window.fbAsyncInit = function() {
        FB.init({
          xfbml: true,
          version: 'v18.0'
        });
      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    `;

    // Thêm script vào body của trang
    document.body.appendChild(script);

    // Xóa script khi component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []); // [] để chỉ chạy một lần khi component được mount

  return (
    <div
      style={{
        height: 320,
        flexGrow: 1,
        position: "fixed",
        bottom: 50,
        right: -4,
        zIndex: 100,
      }}
    >
      <div id="fb-root">
        <div id="fb-customerchat" className="fb-customerchat" />
      </div>
    </div>
  );
}

export default FacebookMessengerPlugin;

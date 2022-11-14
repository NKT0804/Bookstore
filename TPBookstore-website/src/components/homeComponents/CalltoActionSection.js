import React from "react";

const CalltoActionSection = () => {
  return (
    <div className="subscribe-section bg-with-black">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="subscribe-head">
              <h2>Đăng ký và nhận bản tin</h2>
              <p>Đăng ký nhận thông tin sách mới, sách bán</p>
              <form className="form-section">
                <input placeholder="Your Email..." name="email" type="email" />
                <input value="Đăng ký" name="subscribe" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalltoActionSection;

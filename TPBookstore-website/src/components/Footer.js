import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  // hanlde set show icon footer

  window.addEventListener("scroll", toggleVisible);
  return (
    <>
      <footer className="footer">
        <div className="footer__information">
          <div className="grid wide">
            <div className="row">
              <div className="col l-2-4 m-6 c-12">
                <div className="footer__infomation-contact">
                  {/* <h3 className="footer__infomation--contact-heading">CONTACT</h3> */}
                  <div className="footer__infomation-contact-heading">
                    <Link className="footer__infomation--contact-logo" to="/">
                      <img alt="logo" src="/images/logo.png" />
                    </Link>
                  </div>
                  <ul className="footer__infomation--contact-list">
                    {/* <li className="footer__infomation--contact-name">TP Bookstore</li> */}
                    <li className="footer__infomation--contact-address">Address: Q12, Ho Chi Minh City</li>
                    <li className="footer__infomation--contact-email">Email: tp.bookstore@gmail.com</li>
                    <li className="footer__infomation--contact-phone">Phone: +0909 0009</li>
                    <div className="gird">
                      <div className="row no-gutters">
                        <div className="col l-3">
                          <img className="footer__infomation--bank" src="../images/bank/payment-1.png" alt="" />
                        </div>
                        <div className="col l-3">
                          <img className="footer__infomation--bank" src="../images/bank/payment-2.png" alt="" />
                        </div>
                        <div className="col l-3">
                          <img className="footer__infomation--bank" src="../images/bank/payment-3.png" alt="" />
                        </div>
                        <div className="col l-3">
                          <img className="footer__infomation--bank" src="../images/bank/payment-4.png" alt="" />
                        </div>
                      </div>
                    </div>
                    {/* </li> */}
                  </ul>
                </div>
              </div>
              <div className="col l-2-4 m-6 col-6">
                <div className="footer__infomation-content">
                  <h3 className="footer__infomation--heading">SALES CHANNEL</h3>
                  <ul className="footer__infomation--list">
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Shopee
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Sendo
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Zalo
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Lazada
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Tiki
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col l-2-4 m-6 col-6">
                <div className="footer__infomation-content">
                  <h3 className="footer__infomation--heading">MORE INFORMATION</h3>
                  <ul className="footer__infomation--list">
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        About New Book
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Promotions
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Ordering guide
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        News
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col l-2-4 m-6 col-6">
                <div className="footer__infomation-content">
                  <h3 className="footer__infomation--heading">POLICY ONLY</h3>
                  <ul className="footer__infomation--list">
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Sales policy
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Return Policy
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Shipping Policy
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Contributor policy
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Warranty Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col l-2-4 m-6 col-6">
                <div className="footer__infomation-content">
                  <h3 className="footer__infomation--heading">PRODUCT</h3>
                  <ul className="footer__infomation--list">
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Featured products
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        New collection
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Collection 2022
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Selling products
                      </Link>
                    </li>
                    <li className="footer__infomation--item">
                      <Link to="#" className="footer__infomation--link">
                        Promotional products
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="footer__copyright">Copyright 2022 © | TP Bookstore</p>
          </div>
        </div>
      </footer>

      {/* icon footer left */}
      <div className="icon__footer" style={{ display: visible ? "inline" : "none" }}>
        <div class="icon__footer-left">
          <div class="icon__footer-social">
            <div class="icon__footer-social--list hidden-mobile">
              <li class="icon__footer-social--item">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="icon__footer-social-link"
                >
                  <i class="icon-footer fab fa-facebook"></i>
                </a>
              </li>
              <li class="icon__footer-social--item">
                <a
                  href="https://www.facebook.com/messages/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="icon__footer-social-link"
                >
                  <i class="icon-footer fab fa-facebook-messenger"></i>
                </a>
              </li>
              <li class="icon__footer-social--item">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="icon__footer-social-link"
                >
                  <i class="icon-footer fab fa-instagram"></i>
                </a>
              </li>
              <li class="icon__footer-social--item">
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="icon__footer-social-link"
                >
                  <i class="icon-footer fas fa-phone"></i>
                </a>
              </li>
              <li class="icon__footer-social--item">
                <a
                  href="https://twitter.com/?lang=vi"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="icon__footer-social-link"
                >
                  <i class="icon-footer fab fa-twitter"></i>
                </a>
              </li>
            </div>
          </div>
        </div>
      </div>
      {/* Arrow circle */}
      <Link to="#" className="active-top" style={{ display: visible ? "inline" : "none" }}>
        <i className="fas fa-arrow-circle-up"></i>
      </Link>
    </>
  );
};

export default Footer;

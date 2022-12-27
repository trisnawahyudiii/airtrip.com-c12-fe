/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function foooter() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-brand">
            <img alt="..." src="/img/logos.png" />

            <p className="footer-text">
              Didedikasikan untuk pengalaman terbang yang menyenangkan dan
              penawaran tiket pesawat yang luar biasa
            </p>
          </div>

          <div className="footer-contact">
            <h4 className="contact-title">Contact Us</h4>

            <p className="contact-text">Feel free to contact and reach us !!</p>

            <ul>
              <li className="contact-item">
                <i className="fas fa-phone"></i>

                <a href="tel:+02420865941" className="contact-link">
                  +02 (420) 8659 41
                </a>
              </li>

              <li className="contact-item">
                <i className="fas fa-envelope"></i>

                <a className="contact-link">Airtrip.com</a>
              </li>

              <li className="contact-item">
                <i className="fa fa-map-marker"></i>

                <address>Semarang, Indonesia</address>
              </li>
            </ul>
          </div>

          <div className="footer-form">
            <p className="form-text">
              Subscribe our newsletter for more update & news !!
            </p>

            <form action="" className="form-wrapper">
              <input
                type="email"
                name="email"
                className="input-field w-full text-gray-900"
                placeholder="Enter Your Email"
                required
              ></input>

              <button
                type="submit"
                className="text-white border-[2px] border-white w-full rounded-full px-2 py-3 uppercas hover:bg-white hover:bg-opacity-[10%] ease-in-out duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            Copyright © {new Date().getFullYear()} Airtrip . All rights reserved
          </p>

          <ul className="footer-bottom-list">
            <li>
              <p href="#" className="footer-bottom-link">
                Privacy Policy
              </p>
            </li>

            <li>
              <p href="#" className="footer-bottom-link">
                Term & Condition
              </p>
            </li>

            <li>
              <p href="#" className="footer-bottom-link">
                FAQ
              </p>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

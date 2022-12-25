/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

import React from "react";
import Link from "next/link";

export default function diskonn() {
  return (
    <section className="package" id="package">
      <div className="container">
        <p className="section-subtitle">Popular Packeges</p>

        <h2 className="h2 section-title text-4xl text-gray-800">
          Checkout Our Packeges
        </h2>

        <p className="section-text">
          Fusce hic augue velit wisi quibusdam pariatur, iusto primis, nec nemo,
          rutrum. Vestibulum cumque laudantium. Sit ornare mollitia tenetur,
          aptent.
        </p>

        <ul className="package-list">
          <li>
            <div className="package-card">
              <figure className="card-banner">
                <img
                  src="/img/packege-1.jpg"
                  alt="Experience The Great Holiday On Beach"
                  loading="lazy"
                ></img>
              </figure>

              <div className="card-content">
                <h3 className="h3 card-title text-2xl front-semibold text-gray-800">
                  Experience The Great Holiday On Beach
                </h3>

                <p className="card-text">
                  Laoreet, voluptatum nihil dolor esse quaerat mattis explicabo
                  maiores, est aliquet porttitor! Eaque, cras, aspernatur.
                </p>

                <ul className="card-meta-list">
                  <li className="card-meta-item">
                    <div className="meta-box">
                      <ion-icon name="time"></ion-icon>

                      <p className="text">7D/6N</p>
                    </div>
                  </li>

                  <li className="card-meta-item">
                    <div className="meta-box">
                      <ion-icon name="people"></ion-icon>

                      <p className="text">pax: 10</p>
                    </div>
                  </li>

                  <li className="card-meta-item">
                    <div className="meta-box">
                      <ion-icon name="location"></ion-icon>

                      <p className="text">Malaysia</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="card-price">
                <div className="wrapper">
                  <p className="reviews">(25 reviews)</p>

                  <div className="card-rating">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                  </div>
                </div>

                <p className="price">
                  $750
                  <span>/ per person</span>
                </p>

                <button className="btn btn-secondary">Book Now</button>
              </div>
            </div>
          </li>

          <li>
            <div className="package-card">
              <figure className="card-banner">
                <img
                  src="/img/packege-2.jpg"
                  alt="Summer Holiday To The Oxolotan River"
                  loading="lazy"
                ></img>
              </figure>

              <div className="card-content">
                <h3 className="h3 card-title text-2xl front-semibold text-gray-800">
                  Summer Holiday To The Oxolotan River
                </h3>

                <p className="card-text">
                  Laoreet, voluptatum nihil dolor esse quaerat mattis explicabo
                  maiores, est aliquet porttitor! Eaque, cras, aspernatur.
                </p>

                <ul className="card-meta-list">
                  <li className="card-meta-item">
                    <div className="meta-box">
                      <ion-icon name="time"></ion-icon>

                      <p className="text">7D/6N</p>
                    </div>
                  </li>

                  <li className="card-meta-item">
                    <div className="meta-box">
                      <ion-icon name="people"></ion-icon>

                      <p className="text">pax: 10</p>
                    </div>
                  </li>

                  <li className="card-meta-item">
                    <div className="meta-box">
                      <ion-icon name="location"></ion-icon>

                      <p className="text">Malaysia</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="card-price">
                <div className="wrapper">
                  <p className="reviews">(20 reviews)</p>

                  <div className="card-rating">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                  </div>
                </div>

                <p className="price">
                  $520
                  <span>/ per person</span>
                </p>

                <button className="btn btn-secondary">Book Now</button>
              </div>
            </div>
          </li>

          <li>
            <div className="package-card">
              <figure className="card-banner">
                <img
                  src="/img/packege-3.jpg"
                  alt="Santorini Island's Weekend Vacation"
                  loading="lazy"
                ></img>
              </figure>

              <div className="card-content">
                <h3 className="h3 card-title text-2xl front-semibold text-gray-800">
                  Santorini Island's Weekend Vacation
                </h3>

                <p className="card-text">
                  Laoreet, voluptatum nihil dolor esse quaerat mattis explicabo
                  maiores, est aliquet porttitor! Eaque, cras, aspernatur.
                </p>

                <ul className="card-meta-list">
                  <li className="card-meta-item">
                    <div className="meta-box">
                      <ion-icon name="time"></ion-icon>

                      <p className="text">7D/6N</p>
                    </div>
                  </li>

                  <li className="card-meta-item">
                    <div className="meta-box">
                      <ion-icon name="people"></ion-icon>

                      <p className="text">pax: 10</p>
                    </div>
                  </li>

                  <li className="card-meta-item">
                    <div className="meta-box">
                      <ion-icon name="location"></ion-icon>

                      <p className="text">Malaysia</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="card-price">
                <div className="wrapper">
                  <p className="reviews">(40 reviews)</p>

                  <div className="card-rating">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                  </div>
                </div>

                <p className="price">
                  $660
                  <span>/ per person</span>
                </p>

                <button className="btn btn-secondary">Book Now</button>
              </div>
            </div>
          </li>
        </ul>

        <div className="ml-auto mr-auto text-center">
          <div className="mt-12">
            <Link
              href="/profile"
              className="px-6 py-4 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none get-started focus:outline-none bg-slate-700 active:bg-slate-500 hover:shadow-lg"
            >
              View all packages
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

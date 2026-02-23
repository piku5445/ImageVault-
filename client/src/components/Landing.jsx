import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';
import './landing.css';

function landing() {
  return (
    <div className="box">
      <div className="heading">
        <h1>Image Vault</h1>
      </div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCoverflow]}
        spaceBetween={30}
        slidesPerView={3}
        navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        loop={true}
        effect={'coverflow'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 40 },
        }}
      >
        <SwiperSlide className="slide1"></SwiperSlide>
        <SwiperSlide className="slide2"></SwiperSlide>
        <SwiperSlide className="slide3"></SwiperSlide>
        <SwiperSlide className="slide4"></SwiperSlide>
      </Swiper>
      <div className="swiper-button-prev">&#10094;</div>
      <div className="swiper-button-next">&#10095;</div>
    </div>
  );
}

export default landing;

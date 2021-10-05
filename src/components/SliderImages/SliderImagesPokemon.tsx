import React from 'react';
import classNames from 'classnames/bind';
import styles from './SliderImagesPokemon.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { SwiperOptions } from 'swiper';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/navigation/navigation.scss';

// CUSTOM MODIFICATIONS TO SWIPPER
import './index.scss';

const cx = classNames.bind({ ...styles });

SwiperCore.use([Navigation, Pagination]);

function SliderImagesPokemon({ images = [] }: { images: Array<string> }): JSX.Element {
  const config: SwiperOptions = {
    slidesPerView: 1,
    pagination: { clickable: true },
    navigation: true,
    loop: true,
    grabCursor: true,
  };

  return (
    <div className="SliderImagesPokemon">
      <Swiper {...config}>
        {images.map((item, index) => (
          <SwiperSlide key={index} className={cx('slide-image')}>
            <img src={item} alt={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
export default SliderImagesPokemon;

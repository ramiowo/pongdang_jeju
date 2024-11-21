import { Link } from "react-router-dom";
import styled from "styled-components";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const MainBanner = styled.div``;

const TitleWrap = styled.div``;

const Banner = ({ data }) => {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop={true}
    >
      {data.slice(2, 10).map((spot, id) => (
        <SwiperSlide key={id}>
          <Link to={`/detail/${spot.id}`}>
            <MainBanner>
              <img src={spot.img} alt={spot.title}></img>
              <TitleWrap>
                <h3>{spot.name}</h3>
                {/* <p>{spot.description}</p> */}
              </TitleWrap>
            </MainBanner>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;

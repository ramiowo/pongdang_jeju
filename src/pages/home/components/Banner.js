import { Link } from "react-router-dom";
import styled from "styled-components";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaLocationDot } from "react-icons/fa6";

const MainBanner = styled.div`
  margin-top: 60px;
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 10px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (min-width: 1441px) {
    height: 520px;
  }
`;
const Blur = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  background-color: rgba(0, 0, 0, 0.4);
  filter: blur(20px);
`;
const TitleWrap = styled.div`
  display: flex;
  align-items: flex-start;
  position: absolute;
  left: 8%;
  bottom: 8%;
  color: #fff;
  h3 {
    margin-left: 6px;
    font-size: 26px;
    font-weight: 600;
  }
  @media screen and (min-width: 1441px) {
    left: 6%;
    bottom: 10%;
    h3 {
      font-size: 34px;
    }
  }
`;

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
              <Blur></Blur>
              <TitleWrap>
                <span>
                  <FaLocationDot style={{ fontSize: "26px" }} />
                </span>
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

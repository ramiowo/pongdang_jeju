import { Link } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

const Container = styled.section``;
const Title = styled.div``;

const Spots = ({ title, data }) => {
  const params = {
    spaceBetween: 5,
    slidesPerView: 1.8,
  };
  return (
    <Container>
      <Title>{title}</Title>
      <Swiper {...params}>
        {data &&
          data.map(({ id, img, name }) => (
            <SwiperSlide key={id}>
              <Link to={`detail/${id}`}>
                <img src={img} alt={name} />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </Container>
  );
};

export default Spots;

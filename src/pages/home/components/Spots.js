import { Link } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

const Container = styled.section`
  width: 100%;
  margin-top: 30px;
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  .main {
    display: flex;
    align-items: end;
    margin-bottom: 5px;
  }
  span {
    font-size: 16px;
    font-weight: 500;
    margin-right: 3px;
    color: #363636;
  }
  h3 {
    font-size: 20px;
    font-weight: 800;
    color: #f7844e;
  }
  p {
    font-size: 12px;
    color: #434343;
    margin-bottom: 20px;
  }
`;

const Con = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 10px;
  }
  p {
    margin-top: 10px;
    font-size: 14px;
    font-weight: 600;
  }
`;

const Spots = ({ title, sub, data }) => {
  const params = {
    spaceBetween: 5,
    slidesPerView: 1.8,
    breakpoints: {
      1440: { slidesPerView: 4.5, spaceBetween: 16 },
      1024: { slidesPerView: 4, spaceBetween: 12 },
      650: { slidesPerView: 2.3, spaceBetween: 10 },
      430: { slidesPerView: 2, spaceBetween: 8 },
    },
  };
  return (
    <Container>
      <Title>
        <div className="main">
          <span>퐁당제주</span>
          <h3>{title}</h3>
        </div>
        <p>{sub}</p>
      </Title>
      <Swiper {...params}>
        {data &&
          data.map(({ id, img, name }) => (
            <SwiperSlide key={id}>
              <Con>
                <Link to={`detail/${id}`}>
                  <img src={img} alt={name} />
                  <p>{name}</p>
                </Link>
              </Con>
            </SwiperSlide>
          ))}
      </Swiper>
    </Container>
  );
};

export default Spots;

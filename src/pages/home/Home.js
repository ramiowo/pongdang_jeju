import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchFoodSpots, fetchTouristSpots } from "../../api";
import Loading from "../../components/Loading";
import Banner from "./components/Banner";
import Spots from "./components/Spots";
import { mainStyle } from "../../GlobalStyled";
import { Helmet } from "react-helmet-async";

const Container = styled.section`
  width: 100%;
  min-height: 100vh;
  max-width: 440px;
  margin: 0 auto;
  padding: 0 ${mainStyle.moPadding};
  margin-bottom: 40px;
  @media screen and (min-width: 441px) {
    max-width: 100%;
  }
  @media screen and (min-width: 769px) {
    padding: 0 ${mainStyle.tabletPadding};
  }
  @media screen and (min-width: 1441px) {
    padding: 0 ${mainStyle.pcPadding};
  }
`;

const Home = () => {
  const [touristSpots, setTouristSpots] = useState([]);
  const [foodSpots, setFoodSpots] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const spots = await fetchTouristSpots();
        const foods = await fetchFoodSpots();

        setTouristSpots(spots);
        setFoodSpots(foods);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Helmet>
            <title>홈 | 퐁당제주</title>
          </Helmet>
          <Container>
            <Banner data={touristSpots} />
            <Spots
              title="관광명소"
              sub="제주의 매력에 퐁당 빠지다."
              data={touristSpots}
            />
            <Spots
              title="맛집명소"
              sub="제주의 맛에 퐁당 빠지다."
              data={foodSpots}
            />
          </Container>
        </>
      )}
    </div>
  );
};

export default Home;

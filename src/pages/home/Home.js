import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchFoodSpots, fetchTouristSpots } from "../../api";
import Loading from "../../components/Loading";
import Banner from "./components/Banner";
import Spots from "./components/Spots";
import { mainStyle } from "../../GlobalStyled";

const Container = styled.section`
  width: 100%;
  height: 100vh;
  max-width: 440px;
  margin: 0 auto;
  padding: 0 ${mainStyle.moPadding};
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
          <Container>
            <Banner data={touristSpots} />
            <Spots title="관광명소" data={touristSpots} />
            <Spots title="맛집명소" data={foodSpots} />
          </Container>
        </>
      )}
    </div>
  );
};

export default Home;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSpotDetails } from "../../api";
import Loading from "../../components/Loading";
import styled from "styled-components";
import Wrapper from "../../components/Wrapper";

const Container = styled.section`
  width: 100%;
  height: 100vh;
  max-width: 440px;
  margin: 0 auto;
`;

const Detail = () => {
  const { id } = useParams();
  const [spot, setSpot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const data = await fetchSpotDetails(id);

        setSpot(data);
      } catch (error) {
        console.log("상세정보 에러", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadDetail();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Wrapper>
          <Container>
            {spot.img && <img src={spot.img} alt={spot.name}></img>}
            <h3>{spot.name}</h3>
            <p>{spot.description}</p>
            <p>주소 : {spot.address}</p>
            <p>전화번호 : {spot.tel}</p>
          </Container>
        </Wrapper>
      )}
    </>
  );
};

export default Detail;

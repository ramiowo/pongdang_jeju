import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSpotDetails } from "../../api";
import Loading from "../../components/Loading";
import styled from "styled-components";

const Container = styled.section``;

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
        <>
          <Container>
            {spot.img && <img src={spot.img} alt={spot.name}></img>}
            <h3>{spot.name}</h3>
            <p>{spot.description}</p>
            <p>주소 : {spot.address}</p>
          </Container>
        </>
      )}
    </>
  );
};

export default Detail;

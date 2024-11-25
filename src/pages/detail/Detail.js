import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSpotDetails } from "../../api";
import Loading from "../../components/Loading";
import styled from "styled-components";
import Wrapper from "../../components/Wrapper";
import { mainStyle } from "../../GlobalStyled";

const Container = styled.section`
  width: 100%;
  height: 100vh;
  max-width: 440px;
  margin: 0 auto;
  padding: 0 ${mainStyle.moPadding};
`;

const Description = styled.p`
  white-space: ${(props) => (props.isExpanded ? "normal" : "nowrap")};
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ExpandButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Detail = () => {
  const { id } = useParams();
  const [spot, setSpot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shortDescription, setShortDescription] = useState("");

  const MAX_DESCRIPTION_LENGTH = 300;

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const data = await fetchSpotDetails(id);
        setSpot(data);

        if (data.description.length > MAX_DESCRIPTION_LENGTH) {
          setShortDescription(
            data.description.slice(0, MAX_DESCRIPTION_LENGTH) + "..."
          );
        } else {
          setShortDescription(data.description);
        }
      } catch (error) {
        console.log("상세정보 에러", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadDetail();
  }, [id]);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded); // 펼치기/접기 토글
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Wrapper>
          <Container>
            {spot.img && <img src={spot.img} alt={spot.name}></img>}
            <h3>{spot.name}</h3>
            <Description isExpanded={isExpanded}>
              {isExpanded ? spot.description : shortDescription}
            </Description>
            <ExpandButton onClick={toggleDescription}>
              {isExpanded ? "접기" : "펼치기"}
            </ExpandButton>
            {/* <p>{spot.description}</p> */}
            <p>주소 : {spot.address}</p>
            <p>전화번호 : {spot.tel}</p>
          </Container>
        </Wrapper>
      )}
    </>
  );
};

export default Detail;

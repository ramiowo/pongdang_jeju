import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFoodSpots, fetchSpotDetails, fetchTouristSpots } from "../../api";
import Loading from "../../components/Loading";
import styled from "styled-components";
import Wrapper from "../../components/Wrapper";
import { mainStyle } from "../../GlobalStyled";
import Location from "./Location";
import useScrollTop from "../../lib/useScrollTop";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import PageTitle from "../../components/PageTitle";

const Container = styled.section`
  width: 100%;
  min-height: 100vh;
  max-width: 440px;
  margin: 0 auto;
  padding: 0 ${mainStyle.moPadding};
  img {
    margin-top: 10px;
    width: 100%;
    height: 250px;
    border-radius: 10px;
  }
`;

const TextWrap = styled.div`
  margin-top: 20px;
  div {
    display: flex;
    margin-top: 7px;
  }

  h3 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  span {
    width: 60px;
    font-size: 14px;
    font-weight: 500;
  }
  p {
    margin-left: 15px;
    font-size: 14px;
    color: #383838;
  }
`;

const Description = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #383838;
  line-height: 20px;
  white-space: ${({ $isExpanded }) => ($isExpanded ? "normal" : "nowrap")};
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ExpandButton = styled.button`
  all: unset;
  box-sizing: border-box;
  float: right;
  background-color: #7bbff0;
  color: white;
  border: none;
  padding: 4px 4px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const MapWrap = styled.div`
  margin-top: 100px;
`;

const Detail = () => {
  const { id } = useParams();
  const [spot, setSpot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shortDescription, setShortDescription] = useState("");
  const [touristSpots, setTouristSpots] = useState([]);
  const [foodSpots, setFoodSpots] = useState([]);
  useScrollTop();

  const MAX_DESCRIPTION_LENGTH = 300;

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const data = await fetchSpotDetails(id);
        setSpot(data);

        const spots = await fetchTouristSpots();
        const foods = await fetchFoodSpots();

        setTouristSpots(spots);
        setFoodSpots(foods);

        if (data.description.length > MAX_DESCRIPTION_LENGTH) {
          setShortDescription(
            data.description.slice(0, MAX_DESCRIPTION_LENGTH) + "..."
          );
        } else {
          setShortDescription(data.description);
        }
      } catch (error) {
        console.error("상세정보 에러:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadDetail();
  }, [id]);

  const toggleDescription = () => {
    setIsExpanded((prev) => !prev);
  };

  const currentSpot =
    touristSpots.find((spot) => spot.id === id) ||
    foodSpots.find((spot) => spot.id === id);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <PageTitle title={spot?.name} />
          <Wrapper>
            <Container>
              {spot?.img && <img src={spot.img} alt={spot.name} />}
              <TextWrap>
                <h3>{spot?.name}</h3>
                <div>
                  <span>주소</span>
                  <p>{spot?.address}</p>
                </div>
                <div>
                  <span>전화번호</span>
                  <p>{spot?.tel}</p>
                </div>
              </TextWrap>
              <Description $isExpanded={isExpanded}>
                {isExpanded ? spot.description : shortDescription}
              </Description>
              <ExpandButton onClick={toggleDescription}>
                {isExpanded ? <FaAngleUp /> : <FaAngleDown />}
              </ExpandButton>
              <MapWrap>
                {currentSpot && (
                  <Location
                    lat={currentSpot.lat}
                    lng={currentSpot.lng}
                    name={currentSpot.name}
                  />
                )}
              </MapWrap>
            </Container>
          </Wrapper>
        </>
      )}
    </>
  );
};

export default Detail;

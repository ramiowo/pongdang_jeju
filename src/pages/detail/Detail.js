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
  @media screen and (min-width: 441px) {
    max-width: 100%;
  }
  @media screen and (min-width: 769px) {
    padding: 0 ${mainStyle.tabletPadding};
    img {
      /* width: 80%; */
      height: 300px;
    }
  }
  @media screen and (min-width: 1025px) {
    img {
      width: 45%;
    }
  }
  @media screen and (min-width: 1441px) {
    padding: 0 ${mainStyle.pcPadding};
    img {
      width: 50%;
      height: 350px;
    }
  }
`;

const ConWrap = styled.div`
  @media screen and (min-width: 1025px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    margin-bottom: 40px;
  }
  span {
    width: 60px;
    font-size: 14px;
    font-weight: 500;
  }
  .information {
    margin-left: 15px;
    font-size: 14px;
    color: #383838;
  }
  @media screen and (min-width: 441px) {
  }
  @media screen and (min-width: 769px) {
    /* width: 80%; */
  }
  @media screen and (min-width: 1025px) {
    width: 45%;
  }
  @media screen and (min-width: 1441px) {
    width: 45%;
    h3 {
      font-size: 24px;
    }
    span {
      width: 80px;
      font-size: 16px;
      font-weight: 500;
    }
    .information {
      margin-left: 15px;
      font-size: 16px;
      color: #383838;
      margin-bottom: 14px;
    }
  }
`;

const Description = styled.p`
  margin-top: 40px;
  font-size: 14px;
  color: #383838;
  line-height: 24px;
  white-space: ${({ $isExpanded }) => ($isExpanded ? "normal" : "nowrap")};
  text-overflow: ellipsis;
  overflow: hidden;
  @media screen and (min-width: 1441px) {
    font-size: 16px;
  }
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1441) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
    };

    handleResize(); // 초기 상태 설정
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDescription = () => {
    if (window.innerWidth < 1441) {
      setIsExpanded((prev) => !prev);
    }
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
              <ConWrap>
                {spot?.img && <img src={spot.img} alt={spot.name} />}
                <TextWrap>
                  <h3>{spot?.name}</h3>
                  <div>
                    <span>주소</span>
                    <p className="information">{spot?.address}</p>
                  </div>
                  <div>
                    <span>전화번호</span>
                    <p className="information">{spot?.tel}</p>
                  </div>
                  <Description $isExpanded={isExpanded}>
                    {isExpanded ? spot.description : shortDescription}
                  </Description>
                  {window.innerWidth < 1441 && (
                    <ExpandButton onClick={toggleDescription}>
                      {isExpanded ? <FaAngleUp /> : <FaAngleDown />}
                    </ExpandButton>
                  )}
                </TextWrap>
              </ConWrap>
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

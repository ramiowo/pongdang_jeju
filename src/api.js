const fetch = require("node-fetch");

const BASE_URL = "https://api.visitkorea.or.kr";
const API_KEY =
  "jLc6WUPu4%2FUfB6qk2uZSC2HzMF8WKzB7SqFCxxg0UgzZt6xgJiCfUddlWVXOJzjSGbJoQiqJxXuXzu%2BEEyELJg%3D%3D";

// 관광지 정보 가져오기
export const fetchTouristSpots = async (
  areaCode = "39",
  numOfRows = 30,
  pageNo = 1
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/openapi/service/rest/KorService/areaBasedList?ServiceKey=${API_KEY}&areaCode=${areaCode}&numOfRows=${numOfRows}&pageNo=${pageNo}&contentTypeId=12&MobileOS=ETC&MobileApp=JEJUGO&_type=json`
    );
    const data = await response.json();

    const filterImg = data.response.body.items.item.filter(
      (item) => item.firstimage || item.firstimage2
    );

    return filterImg.map((item) => ({
      id: item.contentid,
      name: item.title,
      lat: item.mapy,
      lng: item.mapx,
      img: item.firstimage || item.firstimage2,
      description: item.overview || "설명이 없습니다.",
      address: item.addr1,
    }));
  } catch (error) {
    console.error("관광명소 에러:", error);
    return [];
  }
};

// 맛집 정보 가져오기
export const fetchFoodSpots = async (
  areaCode = "39",
  numOfRows = 20,
  pageNo = 1
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/openapi/service/rest/KorService/areaBasedList?ServiceKey=${API_KEY}&areaCode=${areaCode}&numOfRows=${numOfRows}&pageNo=${pageNo}&contentTypeId=39&MobileOS=ETC&MobileApp=JEJUGO&_type=json`
    );
    const data = await response.json();

    const filterImg = data.response.body.items.item.filter(
      (item) => item.firstimage || item.firstimage2
    );
    console.log(filterImg);
    return filterImg.map((item) => ({
      id: item.contentid,
      name: item.title,
      lat: item.mapy,
      lng: item.mapx,
      img: item.firstimage || item.firstimage2,
      description: item.overview || "설명이 없습니다.",
      address: item.addr1,
    }));
  } catch (error) {
    console.error("음식점 에러:", error);
    return [];
  }
};

export const fetchSpotDetails = async (contentId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/openapi/service/rest/KorService/detailCommon?ServiceKey=${API_KEY}&contentId=${contentId}&MobileOS=ETC&MobileApp=JEJUGO&defaultYN=Y&overviewYN=Y&_type=json`
    );
    const data = await response.json();
    const detail = data.response.body.items.item[0];
    console.log("디테일", detail);

    const touristSpots = await fetchTouristSpots();
    const foodSpots = await fetchFoodSpots();

    // contentId로 이미지와 주소 찾기
    const spot =
      touristSpots.find((item) => item.id === contentId) ||
      foodSpots.find((item) => item.id === contentId);

    return {
      id: detail.contentid,
      name: detail.title,
      description: detail.overview || "설명이 없습니다.",
      img: spot?.img || detail.firstimage2,
      lat: detail.mapy,
      lng: detail.mapx,
      address: spot?.address || "주소 정보가 없습니다.",
    };
  } catch (error) {
    console.log("디테일에러", error);
    return null;
  }
};

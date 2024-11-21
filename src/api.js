const fetch = require("node-fetch");

const BASE_URL = "https://api.visitkorea.or.kr";
const API_KEY =
  "jLc6WUPu4%2FUfB6qk2uZSC2HzMF8WKzB7SqFCxxg0UgzZt6xgJiCfUddlWVXOJzjSGbJoQiqJxXuXzu%2BEEyELJg%3D%3D";

const fetchDetails = async (contentId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/openapi/service/rest/KorService/detailCommon?ServiceKey=${API_KEY}&contentId=${contentId}&MobileOS=ETC&MobileApp=JEJUGO&overviewYN=Y&_type=json`
    );
    const data = await response.json();
    return data.response.body.items.item.overview || "설명이 없습니다.";
  } catch (error) {
    console.error(`설명 가져오기 실패: ${error}`);
    return "설명이 없습니다.";
  }
};
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
    return filterImg.map((item) => ({
      id: item.contentid,
      name: item.title,
      lat: item.mapy,
      lng: item.mapx,
      img: item.firstimage || item.firstimage2,
      description: item.overview || "설명이 없습니다.",
    }));
  } catch (error) {
    console.error("음식점 에러:", error);
    return [];
  }
};

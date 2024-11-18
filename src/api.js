const fetch = require("node-fetch");

BASE_URL = "https://api.visitkorea.or.kr";
API_KEY =
  "jLc6WUPu4%2FUfB6qk2uZSC2HzMF8WKzB7SqFCxxg0UgzZt6xgJiCfUddlWVXOJzjSGbJoQiqJxXuXzu%2BEEyELJg%3D%3D";

export const fetchTouristSpots = async (
  areaCode = "39", //제주도//
  numOfRows = 10,
  pageNo = 1
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/openapi/service/rest/KorService/areaBasedList?ServiceKey=${API_KEY}&areaCode=${areaCode}&numOfRows=${numOfRows}&pageNo=${pageNo}&MobileOS=ETC&MobileApp=JEJUGO&_type=json`
    );
    const data = await response.json();
    return data.response.body.items.item.map((item) => ({
      id: item.contentid,
      name: item.title,
      lat: item.mapy,
      lng: item.mapx,
      description: item.overview || "설명이 없습니다.",
    }));
  } catch (error) {
    console.error("Error fetching tourist spots:", error);
    return [];
  }
};

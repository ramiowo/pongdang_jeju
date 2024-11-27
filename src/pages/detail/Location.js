import { useEffect } from "react";

const { kakao } = window;

const Location = ({ lat, lng, name }) => {
  useEffect(() => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(lat, lng), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    //마커가 표시 될 위치
    const markerPosition = new kakao.maps.LatLng(lat, lng);

    // 마커를 생성
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커를 지도 위에 표시
    marker.setMap(map);

    const infowindow = new kakao.maps.InfoWindow({
      content: `<div style="padding:5px; font-size:12px;">${name}</div>`, // 마커 위에 표시할 내용
    });

    kakao.maps.event.addListener(marker, "mouseover", () => {
      infowindow.open(map, marker);
    });

    kakao.maps.event.addListener(marker, "mouseout", () => {
      infowindow.close();
    });
  }, [lat, lng, name]);

  return (
    <>
      <p style={{ fontSize: "18px", fontWeight: "500" }}>지도</p>
      <div
        id="map"
        style={{ width: "100%", height: "260px", margin: "20px 0 40px 0" }}
      ></div>
    </>
  );
};

export default Location;

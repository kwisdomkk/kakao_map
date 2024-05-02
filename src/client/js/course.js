const locationMap = document.getElementById("location-map");

// 다른 위치에 있어도 인식할 수 있도록 전역변수로 선언
let map;
let userLatitude;
let userLongitude;
let isMapDrawn = false;
let courseData = [];
let markers = [];
// 마커를 그리는 함수
const addMarker = (position) => {
  let marker = new kakao.maps.Marker({
    position: position,
  });
  marker.setMap(map);
  markers.push(marker);
};
// 마커를 지우는 함수
const delMarker = () => {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
};

const addCourseMarker = (course) => {
  //방문했으면 A이미지 안했으면 B이미지
  let markerImageUrl = "/file/map_not_done.png";
  let markerImageSize = new kakao.maps.Size(24, 35);
  const kakaoMarkerImage = new kakao.maps.MarkerImage(markerImageUrl, markerImageSize);
  const latlng = new kakao.maps.LatLng(course.course_latitude, course.course_longitude);
  new kakao.maps.Marker({
    map: map,
    position: latlng,
    title: course.course_name,
    image: kakaoMarkerImage,
  });
};

const setCourseMarker = () => {
  for (let i = 0; i < courseData.length; i++) {
    addCourseMarker(courseData[i]);
  }
};

const drawMap = (latitude, longitude) => {
  // 1번째 인자: 지도 그릴 DOM
  const option = {
    center: new kakao.maps.LatLng(latitude, longitude),
    level: 2,
  };
  map = new kakao.maps.Map(locationMap, option);
  map.setZoomable(false);
};

const configLocation = () => {
  if (navigator.geolocation) {
    // web api
    navigator.geolocation.watchPosition((pos) => {
      userLatitude = pos.coords.latitude;
      userLongitude = pos.coords.longitude;
      if (!isMapDrawn) {
        // 지도 그리기
        drawMap(userLatitude, userLongitude);
        // 마커 그리기
        // 목적지 마케
        setCourseMarker();
        // 변수값 변경
        isMapDrawn = true;
      }
      addMarker(new kakao.maps.LatLng(userLatitude, userLongitude));
    });
  }
};

const makeCourseNaviHTML = (data) => {
  const courseWrap = document.getElementById("courseWrap");
  let html = "";
  for (let i = 0; i < data.length; i++) {
    html += `<li class="course">`;
    html += `<p>${data[i].course_name}</p>`;
    html += `</li>`;
  }
  html += `<li id="myPosition" class="course on">나의 위치</li>`;
  courseWrap.innerHTML = html;
};

// 코스 데이터를 불러오는 fetch 함수 async-await
const getCourseList = async () => {
  const response = await fetch("/api/course");
  const result = await response.json();
  const data = result.data;
  courseData = data;
  makeCourseNaviHTML(data);
  configLocation();
};
getCourseList();

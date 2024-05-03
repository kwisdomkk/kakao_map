const userIdinput = document.getElementById("userId");
const userPasswordinput = document.getElementById("userPassword");
const joinBtn = document.querySelector(".join");
const loginBtn = document.querySelector(".login");

const loginFetch = async () => {
  const userId = userIdinput.value;
  const userPassword = userPasswordinput.value;

  if (!userId || !userPassword) {
    msgAlert("bottom", "모든 필드를 입력해 주세요", "error");
    return;
  }

  // 서버로 보내는 요청
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      userId,
      userPassword,
    }),
  });
  const result = await response.json();
  console.log(result);
  if (result.status === "success") {
    // ejs 사용하려면 localStorage 말고 cookie에 저장
    localStorage.setItem("accessToken", result.data.accessToken);
    msgAlert("center", "로그인 성공", "success");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } else {
    msgAlert("bottom", "로그인 실패", "error");
  }
};

loginBtn.addEventListener("click", loginFetch);
joinBtn.addEventListener("click", () => {
  window.location.href = "/join";
});

const checkError = () => {
  const notFoundAccessTokenError = getParameterByName("error");
  if (notFoundAccessTokenError == "not_found_access_token") {
    msgAlert("bottom", "인증에 실패하였습니다.", "error");
  } else if (notFoundAccessTokenError == "need_login") {
    msgAlert("bottom", "로그인이 필요합니다.", "error");
  }
  const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
  window.history.replaceState({}, document.title, cleanUrl);
};
checkError();

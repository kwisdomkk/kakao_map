const joinBtn = document.getElementById("joinBtn");

const userIdinput = document.getElementById("userId");
const userPasswordinput = document.getElementById("userPassword");
const userNameinput = document.getElementById("userName");

const joinFetch = async () => {
  const userId = userIdinput.value;
  const userPassword = userPasswordinput.value;
  const userName = userNameinput.value;

  if (!userId || !userPassword || !userName) {
    msgAlert("bottom", "모든 필드를 입력해 주세요", "error");
    return;
  }
  const response = await fetch("/api/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      userId,
      userPassword,
      userName,
    }),
  });
  const data = await response.json();
  if (data.status === "success") {
    msgAlert("bottom", "회원가입 성공", "success");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  } else {
    msgAlert("bottom", "회원가입 실패", "error");
  }
  console.log(data);
};

joinBtn.addEventListener("click", joinFetch);

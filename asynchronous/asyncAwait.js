// Async

async function getUser() {
  return "현화";
}

const user = getUser();
console.log(user, "user");
user.then((name) => console.log(name));

// 함수 앞에 async를 붙여주면 함수는 Promise를 반환하는 비동기 함수가 된다.
// 함수 안에서 어떤 값을 리턴해주면 -> 그 값은 Promise로 감싸져서 반환이 된다.

// 함수 안에서 Promise를 직접적으로 리턴하면?
const promise = new Promise((resolve) => resolve("개발자"));
async function getUser2() {
  return promise; // promise를 반환하면 어떻게될까? -> promise가 그대로 반환된다.
}

const user2 = getUser2();
console.log(user2, "user2");
user2.then((data) => console.log(data));

// getUser 함수가 비동기

function networkRequest() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

// async 함수 안에서 어떤 함수를 기다려야 할 경우엔 -> await 키워드를 붙인다
// await : promise가 완료될때까지 기다린다.
// Promise가 어떤 값으로 resolve가 된다면 -> const result = await networkRequest();
async function getUser3() {
  await networkRequest(); // 완료될때까지 기다려!
  return "현화";
}

const user3 = getUser3();
user3.then((name) => console.log(name));

// TODO : 시간, 오늘의 할일
async function getTime() {
  await networkRequest();
  return "오전 11시";
}

async function getTodo() {
  await networkRequest();
  return ["주방 정리하기", "빨래널기", "밥먹기"];
}

async function getTodoList() {
  const time = await getTime();
  const todos = await getTodo();

  console.log(`${time} : ${todos}`);
}

getTodoList();

// fetch API
async function fetchData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  // console.log(response);
  const data = await response.json();
  console.log(data);
}

fetchData();

# 1. 동기 VS 비동기

- 동기(Synchronous) : 코드가 작성된 순서대로 한번에 하나씩 실행됨. 호이스팅 이후부터 코드는 순차적으로 실행됨
- 비동기(Asynchrounous) : 코드 실행 순서를 예측할 수 없음. 언제 코드가 실행될 지 알 수 없음

### 자바스크립트의 싱글 스레드 특성

- 자바스크립트는 싱글 스레드 언어로, 한번에 하나의 일만 처리 가능함.
- 오래 걸리는 작업을 동기적으로 수행하면 💩블로킹 발생

### 비동기 프로그래밍

- 비동기 프로그래밍을 통해 블로킹을 피할 수 있음
- `setTimeout` 등의 비동기 함수를 사용하여 일정 시간이 지난 후에 작업을 실행할 수 있음

```jsx
setTimeout(() => {
	console.log('2);
}, 3000);

console.log('1);
```

- 위 코드의 실행은? : 1 → 3초후 → 2

### Web APIs와 멀티 쓰레드 환경

- 브라우저 : 자바스크립트 엔진(싱글 쓰레드) + WebAPIs(예: setTimeout, fetch, DOM 등 / 멀티 쓰레드 / 비동기적 작업)

# 2. 비동기 콜백

- 비동기 처리를 할때 주로 사용
- 나중에 다시(back) 불러줘(call)
- 다른 함수의 인자로 전달되는 함수
  - 콜백함수를 전달받는 함수는 전달받은 콜백을 함수 내부에서 필요할때 호출되도록 구현되어 있음

```jsx
function main(callback) {
	callback();
}

main(**function() {}**);
// main(**() => {}**);
```

- 콜백은 항상 비동기일때만 쓰이나 Nop 그러나 비동기 처리에 유용함!
  - 즉각적인 콜백
  - 비동기적인 콜백

### 비동기 콜백

- 어떤 작업을 비동기적으로 수행한다는 것은?
- → 해당 작업이 끝날때까지 기다리지 않고 바로 다음 작업으로 넘어가는 것
- 코드의 실행순서가 뒤죽박죽 되기도 한다.

**`후처리`**를 해야하는 경우에는? `콜백함수` 사용 ⇒ _비동기콜백_

```jsx
function getData() {
  setTimeout(() => {
    console.log("서버에서 데이터를 받아옴");
    callback(); // 이때 실행되게
  }, 2000);
}

getData();
console.log("전달받은 데이터는 📊📈📉 이다.");
```

→ 위 코드가 의도한대로(서버에서 데이터를 받아옴 → 전달받은 데이터는 OOO이다.) 실행되게 하려면?

```jsx
function getData(callback) {
  setTimeout(() => {
    console.log("서버에서 데이터를 받아옴");
    callback(); // 이때 실행되게
  }, 2000);
}
getData(() => {
  console.log("전달받은 데이터는 📊📈📉 이다.");
});
```

### 비동기콜백 연습 ++ , 콜백지옥

시나리오

1. 로그인
2. 장바구니에 넣기
3. 결제하기

```jsx
function login(userName, callback) {
  setTimeout(() => {
    callback(userName);
  }, 1000);
}

function addToCart(product, callback) {
  setTimeout(() => {
    callback(product);
  }, 1000);
}

function makePayment(cardNumber, product, callback) {
  setTimeout(() => {
    callback(cardNumber, product);
  }, 1000);
}

// 1 -> 2 -> 3 순서대로 하려면?
login("현화", (userName) => {
  console.log(`${userName}님, 안녕하세요`);

  addToCart("물건", (product) => {
    console.log(`${product}을/를 장바구니에 넣었습니다.`);

    makePayment("0000000000000000", product, (cardNumber, item) => {
      console.log(`${cardNumber.slice(0, 6)}로 ${product}를 구매했습니다.`);
    });
  });
});
```

- 💩 코드가 점점 복잡해진다. 더럽고, 지저분해보임! 가독성 💩
- 중첩의 중첩, 유지보수에도 어렵다.

**⇒ 👻 콜백지옥**

- 콜백지옥은 어떻게 피할까? → Promise !

# 3. Promise

### Promise란?

- `비동기 처리`에 사용되는 자바스크립트 `객체`
- 비동기 작업이 (언젠간) 맞이할 `성공` 혹은 `실패`를 나타냄

- 비동기 작업이 `완료`되면, (작업에 대한) 결과물로 채워진다.
- 진행중인 작업은 언젠간 끝나게 된다 `성공 or 실패`

- ✨ Promise는 객체다.

### Promise의 상태

- 대기 Pending : 진행중 / `비어있음`
- 성공 Fulfilled : 성공적으로 완료 / `결과값`
- 실패 Rejected : 실패함 / `에러`

### Promise는 자바스크립트 객체이다.

- State 상태
- Result 결과물

| State     | Result                        |
| --------- | ----------------------------- |
| Pending   | undefined                     |
| fulfilled | 결과값 (비동기 작업이 반환한) |
| rejected  | Error 객체                    |

### executor

- executor(실행함수)는 new Promise에 전달되는 함수이다.
- ✨ executor는 새로운 Promise 객체 인스턴스가 만들어질때 자동으로 실행된다.
- executor의 인수 resolve 와 reject 는 JS에서 제공하는 자체 콜백함수이다.
- resolve 나 reject 하나를 반드시 호출해야함
- `resolve` : 비동기 작업 완료 후 호출할 함수
- `reject` : 비동기 작업이 실패할 경우 호출할 함수

```jsx
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const data = null;
    if (data) {
      consolelog("네트워크 요청 성공");
      resolve(data);
    } else {
      reject(new Error("네트워크 에러!!!"));
    }
  }, 1000);
});

setTimeout(() => {
  console.log(promise);
}, 2000);
```

### Promise를 사용하는 비동기 함수 만들기

```jsx
function getData() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { name: "현화" };
      if (data) {
        console.log("성공!");
        resolve(data);
      } else {
        reject(new Error("에러!"));
      }
    }, 1000);
  });
  return promise;
}
const promise = getData();
setTimeout(() => {
  console.log(promise);
}, 2000);
```

### Promise를 리턴하는 비동기 함수 만들기

- then, catch, finally 로 값을 가공한다.
- promise chaining을 사용하여 여러개의 비동기 함수를 순차적으로 처리할 수 있다. (가독성도 좋음)

# 4. Async & Await

- Promise를 한단계 감싸서 더 보기 편하게 만든 문법
- chaining 없이 "동기적"으로 보이게 코드를 작성할 수 있다.

### async, await 사용하기

- 함수 앞에 async를 붙여주면 그 함수는 Promise를 리턴하는 비동기 함수가 된다.
- 함수 안에서 어떤 값을 리턴해주면 -> 그 값은 Promise로 감싸져서 반환이 된다.

```jsx
async function getUser() {
  return "현화";
}

const user = getUser();
console.log(user, "user");
user.then((name) => console.log(name));
```

- 함수 안에서 Promise를 리턴하면??

```jsx
const promise = new Promise((resolve) => resolve("개발자"));
async function getUser2() {
  return promise; // promise를 반환하면 어떻게될까? -> promise가 그대로 반환된다.
}

const user2 = getUser2();
console.log(user2, "user2");
user2.then((data) => console.log(data));
```

- async 함수 안에서 어떤 함수를 기다려야 할 경우엔 기다려야 하는 함수 앞에 await 키워드를 붙여준다.
- 만약 Promise가 어떤 값으로 resolve가 된다면 -> `const result = await networkRequest();`

```jsx
async function getUser3() {
  await networkRequest(); // 완료될때까지 기다려!
  return "현화";
}

const user3 = getUser3();
user3.then((name) => console.log(name));
```

### 시간, 오늘의 할일

```jsx
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
```

### fetch API에 async, await 사용해보기

```jsx
async function fetchData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  // console.log(response);
  const data = await response.json();
  console.log(data);
}

fetchData();
```

### await 함수는 반드시 async 함수 내부에서만 사용해야 한다.

Uncaught SyntaxError: await is only valid in async functions and the top level bodies of modules (at asyncAwait.js:63:1)

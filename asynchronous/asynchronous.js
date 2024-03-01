// 로그인
function login(userName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userName) {
        resolve(userName);
      } else {
        reject(new Error("아이디를 입력해주세요"));
      }
    }, 1000);
  });
}
// addToCart
function addToCart(product) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (product) {
        resolve(product);
      } else {
        reject(new Error("상품을 입력해주세요"));
      }
    }, 1000);
  });
}

// makePayment
function makePayment(cardNumber, product) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (cardNumber.length !== 16) {
        reject(new Error("잘못된 카드번호 입니다."));
        return;
      }
      if (!product) {
        reject(new Error("결제할 상품을 넣어주세요"));
        return;
      }
      resolve(product);
    }, 1000);
  });
}

// 함수 하나씩 각각 호출 -> 한번에 다 출력된다.
login("현화").then((userName) => {
  console.log(`${userName} 님 안녕하세요`);
});

addToCart("핸드폰").then((product) => {
  console.log(`${product}를 장바구니에 추가했습니다.`);
});

makePayment("1234123412341234", "핸드폰")
  .then((product) => {
    console.log(`${product}를 결제했습니다.`);
    console.log("=========================");
  })
  .catch((error) => {
    console.log(error.message);
  });

// 원하는건 로그인 되고 1초 후 -> 장바구니 추가하고 1초 후 -> 결제
// Promise Chaining
login("현화")
  .then((userName) => {
    console.log(`${userName} 님 안녕하세요`);
    return addToCart("핸드폰");
  })
  .then((product) => {
    console.log(`${product}를 장바구니에 추가했습니다.`);
    return makePayment("1234123412341234", product);
  })
  .then((product) => {
    console.log(`${product}를 결제했습니다.`);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("이용해주셔서 감사합니다.");
  });

// 로그인 실패에 대한 에러처리
login("")
  .catch(() => {
    return "익명";
  })
  .then((userName) => {
    console.log(`${userName} 님 안녕하세요`);
    return addToCart("핸드폰");
  })
  .then((product) => {
    console.log(`${product}를 장바구니에 추가했습니다.`);
    return makePayment("1234123412341234", product);
  })
  .then((product) => {
    console.log(`${product}를 결제했습니다.`);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("이용해주셔서 감사합니다.");
  });

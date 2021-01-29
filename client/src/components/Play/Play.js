import { useState, useEffect } from "react";
<<<<<<< HEAD
import queryString from "query-string";
import io from "socket.io-client";

import Board from "../Board/Board";
// import Chat from "../Chat/Chat";
const LINE_NUMBER = 15;

const ENDPOINT = "localhost:5000";

let socket;
//Todo: socket

const Play = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [turn, setTurn] = useState(1); //1 : black,  2 : white
  let [array, _] = useState(
    Array.from(Array(LINE_NUMBER), () => Array(LINE_NUMBER).fill(0))
  );

  //Render될 떄마다 표시
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  // console.log(`${turn === 1 ? "흑" : "백"}차례입니다.`);

  useEffect(() => {});

  // 값 관리
  const passValue = ({ target: { id } }) => {
    // id => M,N
    const [M, N] = id.split("-");
    if (isValid([M, N]) === true) {
      array[M][N] = turn;
      putStone(id);
      // socket.emit("passValue", id);

      if (isFive([M, N])) {
        turn === 1
          ? alert("흑돌이 승리하였습니다.")
          : alert("백돌이 승리하였습니다.");
      }
      turn === 1 ? setTurn(2) : setTurn(1);
      //Todo : socket으로 값 전달
    }
  };

  //이미 존재하는지
  const isValid = ([M, N]) => {
    if (array[M][N] !== 0) {
      alert("이미 존재하는 돌입니다.");
      return false;
    }
    return true;
  };

  //돌을 화면 위에 표시
  const putStone = (id) => {
    const stone = document.getElementById(id);
    stone.style.borderRadius = "50%";
    stone.style.backgroundColor = turn === 1 ? "black" : "white";
  };

  // 승리 판단
  const isFive = ([M, N]) => {
    M = Number(M);
    N = Number(N);

    let count = 1;
    let i = M;
    let j = N;

    //왼쪽에 붙일때
    while (count < 6) {
      if (j === 14) break;
      else if (array[i][j + 1] === turn) {
        count += 1;
        j += 1;
      } else break;
    }

    //오른쪽에 붙일때
    i = M;
    j = N;
    while (count < 6) {
      if (j === 0) break;
      else if (array[i][j - 1] === turn) {
        count += 1;
        j -= 1;
      } else break;
    }

    if (count === 5) {
      return true;
    }

    //아래쪽에 붙일때
    count = 1;
    i = M;
    j = N;
    while (count < 6) {
      if (i === 0) break;
      else if (array[i - 1][j] === turn) {
        count += 1;
        i -= 1;
      } else break;
    }

    //아래쪽에 붙일때
    i = M;
    j = N;
    while (count < 6) {
      if (i === 14) break;
      else if (array[i + 1][j] === turn) {
        count += 1;
        i += 1;
      } else break;
    }

    if (count === 5) {
      return true;
    }

    // ↙ 위에 붙일때
    count = 1;
    i = M;
    j = N;
    while (count < 6) {
      if (i === 14 || j === 0) break;
      else if (array[i + 1][j - 1] === turn) {
        count += 1;
        i += 1;
        j -= 1;
      } else break;
    }

    // ↗ 아래에 붙일때
    i = M;
    j = N;
    while (count < 6) {
      if (i === 0 || j === 14) break;
      else if (array[i - 1][j + 1] === turn) {
        count += 1;
        i -= 1;
        j += 1;
      } else break;
    }

    if (count === 5) {
      return true;
    }

    // ↘ 위에 붙일 때
    count = 1;
    i = M;
    j = N;
    while (count < 6) {
      if (i === 14 || j === 14) break;
      else if (array[i + 1][j + 1] === turn) {
        count += 1;
        i += 1;
        j += 1;
      } else break;
    }

    // ↖ 아래에 붙일 때
    i = M;
    j = N;
    while (count < 6) {
      if (i === 0 || j === 0) break;
      else if (array[i - 1][j - 1] === turn) {
        count += 1;
        i -= 1;
        j -= 1;
      } else break;
    }

    return count === 5 ? true : false;
  };

  //Todo : 쌍삼
  // const isSamSam = ([M, N]) => {};

  return (
    <div>
      <Board array={array} passValue={passValue} turn={turn} />
=======
import Board from "../Board/Board";
import Chat from "../Chat/Chat";

const Play = () => {
  return (
    <div>
      <Board />
>>>>>>> b0d09e06784ff9052ffad9cf9461f47820e16efe
      {/* <Chat /> */}
    </div>
  );
};

export default Play;

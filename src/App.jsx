import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  //入力boxに入れたたすくのStateを配列に入れる
  const [todoText, setTodoText] = useState("");
  //未完了タスクのstateを配列に入れる
  const [incompleteTodos, setIncompleteTodos] = useState([
    "肉食べる",
    "ふぐ食べる"
  ]);
  //完了タスクのStateを配列に入れる
  const [completeTodos, setCompleteTodos] = useState(["思いっきり寝る"]);

  //入力された値(event.target.value)の取得,stateの値を変える
  //この処理をしないとuseState('')が適用されタスクの入力ができない
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  //追加ボタンを押した時の処理
  const onClickAdd = () => {
    //todoTextがnullの場合は処理させない(入力できないようにするb)
    if (todoText === "") return;
    //...で配列を展開しnewTodosに設定するし、最後にtodoTextを繋げる
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  //削除ボタンを押した時の処理
  //indexには配列の何番目かが入ってくる
  const onClickDelete = (index) => {
    //...で配列を展開しnewTodosに設定
    const newTodos = [...incompleteTodos];
    //指定したindex番目の配列から1つ分要素を削除する
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  //完了ボタンを押した時の処理
  const onClickComplete = (index) => {
    //未完了エリアから対象を削除
    //...で配列を展開しnewIncompleteTodosに設定
    const newIncompleteTodos = [...incompleteTodos];
    //指定したindex番目の配列から1つ分要素を削除する
    newIncompleteTodos.splice(index, 1);

    //完了エリアに対象を追加
    //completeTodosに未完了エリアで完了としたものを追加する配列処理
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];

    //set関数に値を設定
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  //戻るボタンを押した時の処理
  const onClickBack = (index) => {
    //完了エリアから削除
    const newCompleteTodos = [...completeTodos];
    //指定したindex番目の配列から1つ分要素を削除する
    newCompleteTodos.splice(index, 1);

    //未完了エリアに追加
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];

    //set関数に値を設定
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />

      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>
          登録できるtodoは５個までだよ〜！消化しなさい！！！！
        </p>
      )}

      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />

      <CompleteTodos completeTodos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};

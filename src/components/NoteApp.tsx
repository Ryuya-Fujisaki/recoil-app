import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { notesAtom } from "../atoms/notesAtom";
import { NoteStats } from "./NoteStats";
import { NoteItem } from "./NoteItem";

/**
 * メモ帳のアプリケーションです。
 */
export const NoteApp: React.FC = () => {
  // Recoilの Atoms を呼び出して定義
  const setNotepad = useSetRecoilState(notesAtom);
  // ステートとして利用する
  const [notes] = useRecoilState(notesAtom);

  /**
   * メモ帳を新しく作成するコールバックです。
   */
  const handleCreate = () => {
    setNotepad((state) =>
      [
        ...state,
        { id: String(state.length + 1), value: "", isComplete: false },
      ].sort((a, b) => a.id.localeCompare(b.id)),
    );
  };

  return (
    <div>
      <NoteStats />
      <div className="noteList">
        {notes.map((note) => (
          <NoteItem key={note.id} item={note} />
        ))}
      </div>
      <div className="button_area">
        <button className="add-button" onClick={handleCreate}>追加</button>
      </div>
      <div>
        <Parent />
      </div>
    </div>
  );
};

type ChildProps = {
  onClick: () => void;
};

const Child = ({ onClick }: ChildProps) => {
  console.log("Child re-rendered");
  return <button onClick={onClick}>テストボタン</ button>
}

const Parent = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(prev => prev + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <Child onClick={handleClick} />;
    </div>
  );
};

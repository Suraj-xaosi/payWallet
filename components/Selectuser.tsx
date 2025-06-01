'use client';

import { p2ptransfer } from "@/app/lib/actions/p2ptransfer";
import { useRef, useState } from "react";
import { Button } from "./Button";
import { TextInput } from "./TextInput";
import { removeuser, updateposition } from "@/app/reducers/selectedpeepSlice";
import { useDispatch } from "react-redux";

interface Position {
  x: number;
  y: number;
}
type SelectUserProps = {
  id:number;
  name: string;
  number: string;
  positionI: Position;
};

export default function Selectuser({ id,name, number,positionI }: SelectUserProps) {
  const [amount, setAmount] = useState("");
  const [sent, setSent] = useState(false);
  const [position, setPosition] = useState(positionI);
  const dispatch=useDispatch();
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    setPosition({
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y,
    });
    dispatch(updateposition({id, x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y}));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleSend = async () => {
    const response = await p2ptransfer(number, Number(amount));
    if (response) {
      setSent(true);
    }
  };
  function removeUser(id:number){
    dispatch(removeuser({id:id}));
  }

  if (!name || !number) {
    return <div>Something went wrong here</div>;
  }

  return (
    <div
      className="fixed z-50 w-[300px] bg-white rounded shadow-md border"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
    >
      <div
        className="cursor-move bg-blue-600 text-white px-4 py-2 rounded-t "
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center justify-between">
            <span>Send Money To</span>
            <span className="bg-red-400 hover:bg-red-500 p-1 h-9 w-9 flex items-center justify-center cursor-pointer" onClick={() => removeUser(id)}>X</span>
        </div>

        
      </div>
      <div className="p-4 bg-blue-100">
        <div className="bg-blue-500 rounded-md p-2 mb-2">
            <div>Name: {name}</div>
            <div>Number: {number}</div>
        </div>
        
        <div className="mt-2 bg-blue-100 rounded-md p-2">
          <TextInput
            label="Amount"
            placeholder="100"
            onChange={(value) => setAmount(value)}
          />
          <Button onclick={handleSend}>SEND</Button>
        </div>
        
        {sent && (
          <div className="mt-2 text-green-600">Money sent successfully!</div>
        )}
      </div>
      <div className="bg-blue-100 hover:bg-blue-300 rounded w-full h-2 cursor-move" onMouseDown={handleMouseDown}>--------------</div>
    </div>
  );
}

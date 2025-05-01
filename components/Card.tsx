import { ReactNode } from "react";


interface  cardprops{
    title:string,
    children:ReactNode
}

export function Card({ title, children }: cardprops) {
    return (
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-xl mx-auto hover:shadow-2xl transition duration-300">
        <h1 className="text-gray-800 text-xl border-b pb-2 drop-shadow-sm">
          {title}
        </h1>
        <div className="text-gray-800 drop-shadow-sm">
          {children}
        </div>
      </div>
    );
}
  
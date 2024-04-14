"use client";
import Image from "next/image";
import { useState } from "react";
function minimizeCode(code: string) {
  return code.replace(/[\s]/g, (match) => {
    if (match === "\n") {
      return "\\n";
    } else if (match === "\t") {
      return "\\t";
    } else {
      return match;
    }
  })
  .replace(/"/g, '\\"')
  .replace(/'/g, "\\'");
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export default function Home() {
  const [code, setCode] = useState("");
  return (
    <main className="flex flex-col items-center p-12">
      <h1 className="text-2xl font-bold">Escape tab and line breaks.</h1>
      <textarea
        className="p-2 w-11/12 border-2 border-solid border-gray-400 rounded-lg min-h-half-screen"
        placeholder="paste your codes here"
        onChange={(e) => setCode(e.target.value)}
      />
      <p className="text-2xl font-bold mt-8">Escaped code 👇</p>
      <p className="min-code relative p-2 w-11/12 border-2 border-solid border-gray-400 rounded-lg min-h-half-screen">
        {minimizeCode(code)}
        <Image
          src="/copy.svg"
          alt=""
          width={24}
          height={24}
          className="absolute right-1 top-1 hover:bg-gray-200 cursor-pointer"
          onClick={() => {
            copyToClipboard(minimizeCode(code));
          }}
        />
      </p>
    </main>
  );
}

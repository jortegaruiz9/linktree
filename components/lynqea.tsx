"use client";

export default function Lynqea() {
  const word = "Lynqea";
  const letters = word.split("");

  return (
    <a
      href="https://www.lynqea.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="w-full flex items-end justify-center gap-x-1 text-xs"
    >
      <h6 className="text-white/50">Powered by</h6>
      <div className="lynqea-word font-semibold">
        {letters.map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </div>
    </a>
  );
}

import Image from "next/image";

export default function Page(){
  return (
    <div className="p-6">
      <a href="#main" className="skip-link sr-only focus:not-sr-only">Ga naar hoofdinhoud</a>
      <button className="rounded-full bg-[--color-brand] text-black px-4 py-2 focus-visible:ring-4 focus-visible:ring-yellow-300">
        Page content placeholder
      </button>
    </div>
  )
}


import Image from "next/image";
function icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-external-link inline-block mx-2"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  );
}
export default function Home() {
  return (
    <main className="">
      <Image
        className="block mx-auto mt-12 rounded-full"
        src={"/ui-images/piggy-bank.png"}
        alt="piggy bank"
        width={500}
        height={500}
      />
      <h1 className="text-center mt-8 mx-2">
        <span className="text-5xl text-green-600 ">we</span>
        <span className="text-5xl font-bold text-green-300 ">Bank</span>
      </h1>
      <p className="text-center text-3xl mt-8 mx-2  text-green-900 font-bold ">
        A "fictional" banking system that integrates with
        <a
          href="https://we-buy-omega.vercel.app/"
          className="text-pink-400 mx-3 transition-all hover:underline"
          target="_blank"
        >
          weBuy{icon()}
        </a>
        to make shopping easier
      </p>
    </main>
  );
}

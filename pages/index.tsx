import Image from "next/image";

export default function Home() {
  return (
    <div>
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
          className="text-pink-400 mx-3"
          target="_blank"
        >
          weBuy
        </a>
        to make shopping easier
      </p>
    </div>
  );
}

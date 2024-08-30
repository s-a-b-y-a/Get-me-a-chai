import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-white h-[44vh] px-5 md:px-0 text-xl md:text-base">
        <div className="font-bold text-3xl flex gap-2 justify-center items-center text-center">
          Buy me a Chai
          <span>
            <img className="invertimg" src="/chai.gif" width={90} alt="Chai GIF" />
          </span>
        </div>
        <p className="text-center">
          A crowdfunding platform for creators. Get funded by your fans and
          followers. Start Now!
        </p>
        <div className="my-3 flex gap-3 flex-wrap justify-center">
          <Link href="/login">
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Start here
            </button>
          </Link>
          <Link href="/about">
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Read more
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto py-4">
        <h1 className="text-center text-2xl font-bold my-4">
          Your fans can buy you a chai
        </h1>
        <div className="flex flex-col md:flex-row gap-5 justify-around items-center">
          <div className="item space-y-3 flex flex-col items-center justify-center text-center">
            <div className="bg-slate-400 rounded-full p-2 text-black">
              <img src="/man.gif" width={90} alt="Man GIF" />
            </div>
            <p className="font-bold">Fund Yourself</p>
            <p>Your fans are available to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center text-center">
            <div className="bg-slate-400 rounded-full p-2 text-black">
              <img src="/coin.webp" width={90} alt="Coin Image" />
            </div>
            <p className="font-bold">Monetize Your Creativity</p>
            <p>Engage your audience for support</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center text-center">
            <div className="bg-slate-400 rounded-full p-2 text-black">
              <img src="/group.gif" width={90} alt="Group GIF" />
            </div>
            <p className="font-bold">Build a Community</p>
            <p>Connect with your biggest supporters</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto py-4">
        <h1 className="text-center text-2xl font-bold my-4">
          Learn more about Us
        </h1>
        <div className="flex justify-center">
          <div className="w-full max-w-lg aspect-w-16 h-[350px]">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/07abU9Mnd7c?si=IXMQqCsfyN4DIoGC"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

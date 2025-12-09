import Image from "next/image";
import BubbleButton from "@/components/BubbleButton";

export default function Home() {
  return (
    <div className="flex min-h-screen  bg-white items-center justify-center font-sans ">
      <main className="flex min-h-screen w-full  flex-col items-center sm:items-start ">
        <div className="bg-brown-200 w-full p-3 flex justify-center">
          <Image
            src="/jpeg/tiny-gon-icon.jpg"
            width={100}
            height={100}
            alt="icon"
          />
        </div>

        <section className="flex flex-col gap-2 px-6 mt-10">
          <h1 className="font-margarine font-base text-3xl text-gray-800">
            Hello, Tinger!
          </h1>
          <p className="bg-rd-300 font-quicksand font-medium text-sm text-gray-800">
            This is your new creative playground. Explore, invent, and share
            your biggest ideas with us. Tingy is so excited for all the fun
            we'll have!
          </p>
        </section>

        <section className="w-full flex flex-col gap-4 mt-4 px-6">
          <h1 className="font-margarine text-gray-800 text-lg">My Workspace</h1>
          <div className="w-full grid grid-cols-1 gap-4 justify-between xs:grid-cols-2 md:grid-cols-3">
            {/* Bubble Card */}
            <BubbleButton name="sales" />
            <BubbleButton name="stocks" />
            <BubbleButton name="products" />
          </div>
        </section>
      </main>
    </div>
  );
}

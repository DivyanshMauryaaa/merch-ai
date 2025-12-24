import { CheckCircle2, Clock4Icon, FileSpreadsheet, FolderCheck, SearchCheck } from "lucide-react";
import Image from "next/image";
import Pricing from "@/components/Pricing";
import ScrollAnimation from "@/components/ScrollAnimation";

export default function Home() {
  return (
    <div className="p-6 scroll-smooth">
      <section className="min-h-[80vh] px-4 md:px-8 flex flex-col justify-center items-center space-y-6 py-20 md:py-0">
        <ScrollAnimation delay={0.1}>
          <p className="text-5xl md:text-6xl text-center leading-tight">Scalable, <span className="text-indigo-700">Depthful</span> Research automation for Startups</p>
        </ScrollAnimation>
        <ScrollAnimation delay={0.2}>
          <p className="text-gray-400 text-2xl md:text-4xl text-center max-w-4xl">AI Automation for Researches requiring more depth & accuracy.</p>
        </ScrollAnimation>
        <ScrollAnimation delay={0.3} className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-5 w-full md:w-auto items-center">
          <a href="#pricing" className="w-full md:w-auto">
            <button className="py-4 md:py-5 px-6 md:px-9 text-xl md:text-2xl cursor-pointer text-white bg-indigo-700 rounded-full hover:bg-indigo-800 w-full md:w-auto">Get Started</button>
          </a>
          <button className="py-4 md:py-5 px-6 md:px-9 text-xl md:text-2xl cursor-pointer rounded-full hover:underline w-full md:w-auto">Learn more</button>
        </ScrollAnimation>
      </section>
      <section className="min-h-[80vh] h-auto py-20 px-4">
        <ScrollAnimation>
          <p className="text-4xl md:text-6xl text-center mb-12"><span className="text-indigo-700">Why</span> Merch AI?</p>
        </ScrollAnimation>

        <div className="flex flex-col lg:flex-row justify-center items-center max-w-7xl mx-auto">
          <ScrollAnimation delay={0.1} className="border border-gray-400 lg:border-r-0 p-8 h-auto lg:h-[350px] w-full lg:w-1/3 rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl">
            <SearchCheck size={26} />
            <p className="text-2xl md:text-3xl font-semibold mt-4">Search through more than 10k Social media posts</p>
            <p className="text-base md:text-lg mt-4 text-gray-400">
              AI can search through more than 10k Social media posts without skipping a detail to give you the most relevent results for your prompt.
            </p>
          </ScrollAnimation>

          <ScrollAnimation delay={0.2} className="border border-gray-400 border-y-0 lg:border-y lg:border-x-0 p-8 h-auto lg:h-[350px] w-full lg:w-1/3">
            <FileSpreadsheet size={26} />
            <p className="text-2xl md:text-3xl font-semibold mt-4">Automatically generate Organized insights while researching in seconds</p>
            <p className="text-base md:text-lg mt-4 text-gray-400">
              As AI progresses through research process, it automatically organizes the learned insights in spreadsheets to provide you with the most relevant summary.
            </p>
          </ScrollAnimation>

          <ScrollAnimation delay={0.3} className="border border-gray-400 lg:border-l-0 p-8 h-auto lg:h-[350px] w-full lg:w-1/3 rounded-b-2xl lg:rounded-bl-none lg:rounded-r-2xl">
            <CheckCircle2 size={26} />
            <p className="text-2xl md:text-3xl font-semibold mt-4">Access to real-time data & Authenticated articles</p>
            <p className="text-base md:text-lg mt-4 text-gray-400">
              Optimized to give you the most recent & accurate insights possible            
            </p>
          </ScrollAnimation>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center max-w-7xl mx-auto mt-0 lg:mt-8">
          <ScrollAnimation delay={0.2} className="border border-gray-400 lg:border-r-0 p-8 h-auto lg:h-[350px] w-full lg:w-1/2 rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl border-t-0 lg:border-t">
            <Clock4Icon size={26} />
            <p className="text-2xl md:text-3xl font-semibold mt-4">Research with focus on Detail</p>
            <p className="text-base md:text-lg mt-4 text-gray-400">
              Merch Researches with focus on detail of the insights, time taken for the research may vary according to the time limit value you can optionally select before starting the research.
            </p>
          </ScrollAnimation>

          <ScrollAnimation delay={0.3} className="border border-gray-400 p-8 h-auto lg:h-[350px] w-full lg:w-1/2 rounded-b-2xl lg:rounded-bl-none lg:rounded-r-2xl border-t-0 lg:border-t">
            <FolderCheck size={26} />
            <p className="text-2xl md:text-3xl font-semibold mt-4">Full control over organization of project data & learned insights</p>
            <p className="text-base md:text-lg mt-4 text-gray-400">
              You can control the organization of project data & learned insights, you can also export the data in various formats.
              This helps AI to better understand the data & provide more accurate insights.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      <section className="mt-5 flex flex-col justify-center items-center px-4 py-20">
        <div className="mt-4 flex flex-col lg:flex-row justify-center gap-10 lg:gap-20 items-center max-w-7xl">

          <div className="w-full lg:w-1/3 flex flex-col justify-center order-2 lg:order-1">
            <ScrollAnimation delay={0.1}>
              <p className="text-lg md:text-xl text-start px-3 border border-gray-400 rounded-2xl w-fit mb-4">Merch in <span className="text-indigo-700">Action</span></p>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <p className="text-4xl md:text-6xl font-bold leading-tight">
                Make market decisions with  <span className="text-indigo-700">Evidence</span>, not guesses
              </p>
            </ScrollAnimation>
          </div>

          <ScrollAnimation delay={0.3} className="w-full lg:w-auto order-1 lg:order-2">
            <Image
              src="/demo.png"
              alt="Merch AI"
              width={700}
              height={700}
              className="border border-gray-400 rounded-2xl w-full h-auto"
            />
          </ScrollAnimation>

        </div>
      </section>
      <section className="min-h-[50vh] mt-3 flex flex-col justify-center items-center px-4 mb-20">

        <ScrollAnimation className="w-full md:w-[90%] lg:w-[80%] m-auto p-10 md:p-20 flex flex-col justify-center items-center bg-indigo-700 text-white rounded-2xl text-center">

          <p className="text-3xl md:text-6xl font-bold">Understand your market before you bet months of work on it</p>
          <a href="#pricing">
            <button className="py-4 md:py-5 px-6 md:px-8 mt-8 text-lg md:text-xl cursor-pointer text-white bg-indigo-800 rounded-full hover:bg-indigo-900 border border-indigo-600">Get Merch AI</button>
          </a>
        </ScrollAnimation>

      </section>

      <br />

      {/* Pricing section */}
      <Pricing />
    </div>
  );
}

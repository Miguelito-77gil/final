"use client";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const portfolioItems = [
    {
      id: 1,
      title: "Online Shop",
      description:
        "Modern e-commerce mockup with product browsing, search, cart, and secure checkout.",
      link: "https://projectday.vercel.app/",
      openInNewTab: true,
    },
  ];

  return (
    <main className="font-sans bg-gray-50 text-gray-900 min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-20 gap-10">
        <div className="md:w-1/2 space-y-6">
          <p className="text-indigo-600 font-semibold uppercase tracking-wide">
            Hello, I am Miguel Carillo
          </p>
          <p className="text-gray-700 text-lg max-w-lg leading-relaxed">
            Web developer passionate about building responsive, high-performance websites that deliver seamless and engaging user experiences.
          </p>
          <div className="flex gap-4">
            <a
              href="#portfolio"
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 transition"
            >
              View Projects
            </a>
            <a
              href="yyy.jpg"
              download
              className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-md hover:bg-indigo-600 hover:text-white transition"
            >
              Download Resume
            </a>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center md:justify-end">
          <div className="w-80 h-80 md:w-96 md:h-96 rounded-lg border-4 border-indigo-600 overflow-hidden shadow-lg">
            <img
              src="yw.jpg"
              alt="Miguel Carillo"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section
        id="about"
        className="max-w-5xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 p-10 my-16"
      >
        <h2 className="text-indigo-600 font-semibold uppercase tracking-wide mb-2">
          About Me
        </h2>
        <h3 className="text-gray-900 font-extrabold text-4xl uppercase mb-4">
          I Am Available For{" "}
          <span className="text-indigo-600">Web Dev Projects</span>
        </h3>
        <p className="text-gray-700 leading-relaxed text-lg">
          Hi, I’m Rey, a passionate software developer with a love for creating modern web applications. I use tools like React, Next.js, and Tailwind CSS to design and develop websites that are both functional and aesthetically pleasing. Problem-solving and innovation are what drive me every day.
        </p>
      </section>

      {/* Portfolio Section */}
      <section
        id="portfolio"
        className="max-w-7xl mx-auto px-6 md:px-0 my-16"
      >
        <h2 className="text-indigo-600 font-semibold uppercase text-center tracking-wide mb-2">
          My Work
        </h2>
        <h3 className="text-gray-900 font-extrabold uppercase text-5xl text-center mb-12">
          Recent Projects
        </h3>
        <div className="grid gap-8 md:grid-cols-2">
          <ProjectCard
            title="FCFS Scheduler Simulator"
            description="Interactive CPU scheduling table showing waiting and turnaround times."
            link="/fcfs"
            openInNewTab={false}
            className="shadow-lg rounded-lg hover:shadow-xl transition"
          />
          {portfolioItems.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              link={project.link}
              openInNewTab={project.openInNewTab}
              className="shadow-lg rounded-lg hover:shadow-xl transition"
            />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="max-w-5xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 p-10 my-16 text-center"
      >
        <h2 className="text-indigo-600 font-semibold uppercase tracking-wide mb-2">
          Contact
        </h2>
        <h3 className="text-gray-900 font-extrabold text-4xl uppercase mb-4">
          Let's build something{" "}
          <span className="text-indigo-600">amazing</span>
        </h3>
        <p className="text-gray-700 mb-8 text-lg">
          Reach out for collaborations, freelance projects, or just to say hello!
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a
            href="mailto:carillomiguel77@gmail.com"
            className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 transition uppercase"
          >
            Send Email
          </a>
          <a
            href="tel:+639951249589"
            className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-md hover:bg-indigo-600 hover:text-white transition uppercase"
          >
            Call Me
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
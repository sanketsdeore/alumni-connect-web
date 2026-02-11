import React from 'react'

const Section = ({ image, title, subtitle, btnText, onClick }) => {
  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="bg-black/50 p-8 rounded text-center">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-lg">{subtitle}</p>
        {btnText && (
          <button
            onClick={onClick}
            className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-full transition"
          >
            {btnText}
          </button>
        )}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="home pt-16">
      <Section
        image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
        title="Connect & Grow"
        subtitle="Build meaningful connections with alumni and students."
        btnText="Visit Alumni Network"
        onClick={() => window.location.replace("/network")}
      />

      <Section
        image="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
        title="Find Opportunities"
        subtitle="Discover and share jobs, internships, and projects."
        btnText="Explore Job Board"
        onClick={() => window.location.replace("/jobs")}
      />

      <Section
        image="https://images.unsplash.com/photo-1544531586-fde5298cdd40"
        title="Share Your Story"
        subtitle="Inspire others by sharing your journey and achievements."
        btnText="Share Your Story"
        onClick={() => window.location.replace("/alumni-network")}
      />
      <Section
        image="https://plus.unsplash.com/premium_photo-1681140560805-de6115554023"
        title="Give Back"
        subtitle="Support college initiatives and student projects."
        btnText="Donate Now"
        onClick={() => window.location.replace("/donate")}
      />
      <Section
        image="https://plus.unsplash.com/premium_photo-1691873264214-e757b6a358f3"
        title="Attend Events"
        subtitle="Stay updated with reunions, workshops, and campus activities."
        btnText="View Events"
        onClick={() => window.location.replace("/events")}
      />
    </div>
  );
}

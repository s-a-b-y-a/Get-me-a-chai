import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <h1 className="text-4xl font-extrabold text-white text-center mb-8">
        About Us
      </h1>

      <div className="mb-6 flex gap-3">
        <img
          src="/welcome.gif"
          alt="Welcome"
          className="w-16 h-16 mx-auto mb-4"
        />
        <p className="text-lg text-white">
          Welcome to our crowdfunding platform, a space where creators can bring
          their projects to life with the support of their fans. We believe in
          the power of community and the ability of fans to directly contribute
          to the creative endeavors they love.
        </p>
      </div>

      <div className="mb-6 flex gap-3">
        <img
          src="/support.gif"
          alt="Support"
          className="w-16 h-16 mx-auto mb-4"
        />
        <p className="text-lg text-white">
          Our platform is designed for creators like you, who have amazing ideas
          and need a little extra support to make them a reality. With our
          platform, your fans can show their appreciation and support by buying
          you a chai—a small gesture that can make a big difference in helping
          you achieve your creative goals.
        </p>
      </div>

      <div className="mb-6 flex gap-3">
        <img
          src="/community.gif"
          alt="Community"
          className="w-16 h-16 mx-auto mb-4"
        />
        <p className="text-lg text-white">
          Whether you're an artist, writer, musician, or any type of creator,
          our platform is here to help you unlock the potential of your fanbase.
          It's more than just funding; it's about building a community around
          your work, where your fans can feel directly connected to your
          success.
        </p>
      </div>

      <div className="mb-6 flex gap-3">
        <img src="/join.gif" alt="Join Us" className="w-16 h-16 mx-auto mb-4" />
        <p className="text-lg text-white">
          Join us today and start bringing your projects to life with the
          support of those who believe in you. Together, we can turn your
          creative dreams into reality, one chai at a time.
        </p>
      </div>
    </div>
  );
};

export default About;

export const metadata = {
  title: "About - Get me a chai",
};

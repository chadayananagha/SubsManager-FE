import React from "react";

const About = () => {
  return (
    <div className="my-28 flex-1">
      <div className="w-full px-4 md:px-12 lg:px-32 flex flex-wrap">
        <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
          <h1 className="text-3xl text-center font-bold mb-4 md:text-left">
            Redefining Sharing in the Digital Age
          </h1>
          <p className="mb-4">
            At [Your App Name], we know sharing is powerful. Whether it's
            streaming services, fitness memberships, or digital subscriptions,
            sharing is convenient, eco-friendly, and cost-effective. Our
            platform makes it easy to share your subscriptions with friends,
            family, or even strangers, while managing them effortlessly.
          </p>
          <p className="mb-4">
            Our platform is simple and convenient. With just a few clicks, you
            can share your favorite subscriptions or find new ones to join. No
            more hassle of managing multiple accounts and payments – with [Your
            App Name], everything is centralized and easy to handle.
          </p>
          <p className="mb-4">
            We're more than a subscription sharing platform. We're a community
            that believes in the power of sharing and collaboration. Whether you
            want to save money, reduce waste, or connect with like-minded
            people, [Your App Name] is the place for you.
          </p>
          <p className="mb-4">
            Join us in making sharing the new standard. Together, we can create
            a more sustainable and connected world, one subscription at a time.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center px-4">
          <img
            className="max-w-full md:max-w-96"
            src="/images/heroPic.png"
            alt="Hero Illustration"
          />
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Team</h2>

        <div className="flex justify-center flex-wrap gap-10">
          <div className="px-4 py-4 rounded-lg w-[300px] bg-primary">
            <div className="flex justify-center mb-4">
              <img
                src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
                alt="user"
              ></img>
            </div>

            <h3 className="text-lg text-center font-bold">Bogdan</h3>
          </div>
          <div className="px-4 py-4 rounded-lg w-[300px] bg-primary">
            <div className="flex justify-center mb-4">
              <img
                src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
                alt="user"
              ></img>
            </div>
            <h3 className="text-lg text-center font-bold">Dipali</h3>
          </div>
          <div className="px-4 py-4 rounded-lg w-[300px] bg-primary">
            <div className="flex justify-center mb-4">
              <img
                src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
                alt="user"
              ></img>
            </div>

            <h3 className="text-lg text-center font-bold">Javier</h3>
          </div>
          <div className="px-4 py-4 rounded-lg w-[300px] bg-primary">
            <div className="flex justify-center mb-4">
              <img
                src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
                alt="user"
              ></img>
            </div>

            <h3 className="text-lg text-center font-bold">Anagha</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

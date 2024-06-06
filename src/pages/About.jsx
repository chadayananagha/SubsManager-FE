import { FaLinkedin, FaGithub } from "react-icons/fa";
const About = () => {
  const team = ["Bogdan", "Dipali", "Javier", "Anagha"];

  const teamLinks = {
    Bogdan: {
      defaultImage:
        "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png",
      image: "/images/Bogdan.jpg",
      linkedin: "https://www.linkedin.com/in/lazar-bogdan/",
      github: "https://github.com/foreverbog",
    },
    Dipali: {
      defaultImage:
        "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png",
      image: "",
      linkedin:
        "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png",
      github:
        "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png",
    },
    Javier: {
      defaultImage:
        "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png",
      image: "/images/Javier.png",
      linkedin: "https://www.linkedin.com/in/javi-molcon/",
      github: "https://github.com/JaviMolCon",
    },
    Anagha: {
      defaultImage:
        "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png",
      image: "/images/Anagha.png",
      linkedin: "https://www.linkedin.com/in/anagha-chadayan",
      github: "https://github.com/chadayananagha",
    },
  };
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
            src="/images/about.svg"
            alt="Hero Illustration"
          />
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Team</h2>

        <div className="flex justify-center flex-wrap gap-10">
          {team.map((member) => (
            <div className="group px-4 py-4 rounded-lg w-[300px]  border-base-300 border bg-base-200 relative overflow-hidden hover:scale-105 transition-all duration-500">
              <div className="flex justify-center mb-4 ">
                <img
                  src={
                    teamLinks[member].image
                      ? teamLinks[member].image
                      : teamLinks[member].defaultImage
                  }
                  alt={`${member} avatar`}
                  className="rounded-lg max-h-[350px]"
                />
              </div>

              <h3 className="text-lg text-center font-bold absolute top-0 bg-base-100/30 text-base-100 w-full left-0 p-4 group-hover:bg-base-100/80 group-hover:text-primary-content transition duration-500 about-color  ">
                {member}
              </h3>
              <div className="flex justify-around items-center">
                <a href={teamLinks[member].linkedin} target="_blank">
                  <FaLinkedin className="text-4xl hover:text-[#0077B5]" />
                </a>
                <a href={teamLinks[member].github} target="_blank">
                  <FaGithub className="text-4xl hover:text-black" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;

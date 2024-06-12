import { useRef } from "react";
import { useInView } from "framer-motion";
const Section2 = () => {
  //*Row 1
  const imgRef1 = useRef(null);
  const textRef1 = useRef(null);
  const isInView1 = useInView(imgRef1, { once: true });
  const isInViewtext1 = useInView(textRef1, { once: true });
  //*Row 2
  const imgRef2 = useRef(null);
  const textRef2 = useRef(null);
  const imgRefPhone2 = useRef(null);
  const isInViewPhone2 = useInView(imgRefPhone2, { once: true });
  const isInView2 = useInView(imgRef2, { once: true });
  const isInViewtext2 = useInView(textRef2, { once: true });
  //*Row 3
  const imgRef3 = useRef(null);
  const textRef3 = useRef(null);
  const isInView3 = useInView(imgRef3, { once: true });
  const isInViewtext3 = useInView(textRef3, { once: true });
  //*Row 4
  const imgRef4 = useRef(null);
  const textRef4 = useRef(null);
  const imgRefPhone4 = useRef(null);
  const isInViewPhone4 = useInView(imgRefPhone4, { once: true });
  const isInView4 = useInView(imgRef4, { once: true });
  const isInViewtext4 = useInView(textRef4, { once: true });
  return (
    <div className="bg-sect min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center my-36 mx-2 md:mx-24 md:p-12 gap-16  overflow-hidden  ">
        <img
          ref={imgRef1}
          src="/images/Chat.svg"
          alt=""
          width={250}
          className={`justify-self-center transition-all duration-1000 ${
            isInView1 ? "opacity-100" : "opacity-0 -translate-x-24"
          }`}
        />
        <div
          ref={textRef1}
          className={`transition  duration-1000 flex flex-col justify-center items-start gap-8 ${
            isInViewtext1 ? "opacity-100" : "opacity-0 translate-x-24"
          }`}
        >
          <h3 className="font-extrabold text-5xl text-balance text-center md:text-start">
            Chat with Other Users
          </h3>
          <p className="text-xl text-balance text-center md:text-start">
            Connect and communicate with other users seamlessly through our
            integrated chat feature. Share ideas, ask questions, and stay in
            touch with your subscription community.
          </p>
        </div>
        <img
          ref={imgRefPhone2}
          src="/images/Add.svg"
          alt=""
          width={250}
          className={`md:hidden  justify-self-center transition-all duration-1000  ${
            isInViewPhone2 ? "opacity-100" : "opacity-0 translate-x-24"
          }`}
        />
        <div
          ref={textRef2}
          className={`transition  duration-1000 flex flex-col justify-center items-end gap-8 ${
            isInViewtext2 ? "opacity-100" : "opacity-0 -translate-x-24"
          }`}
        >
          <h3 className="font-extrabold text-5xl text-balance text-center md:text-end">
            Add a New Sharing Subscription
          </h3>
          <p className="text-xl text-balance text-center md:text-end">
            Add and manage your sharing subscriptions effortlessly. Whether it's
            a new service or a private subscription, keep everything organized
            in one place.
          </p>
        </div>
        <img
          ref={imgRef2}
          src="/images/Add.svg"
          alt=""
          width={250}
          className={`hidden md:block justify-self-center transition-all duration-1000${
            isInView2 ? "opacity-100" : "opacity-0 translate-x-24"
          }`}
        />
        <img
          ref={imgRef3}
          src="/images/Search.svg"
          alt=""
          width={250}
          className={`justify-self-center transition-all duration-1000 ${
            isInView3 ? "opacity-100" : "opacity-0 -translate-x-24"
          }`}
        />
        <div
          ref={textRef3}
          className={`transition  duration-1000 flex flex-col justify-center items-start gap-8 ${
            isInViewtext3 ? "opacity-100" : "opacity-0 translate-x-24"
          }`}
        >
          <h3 className="font-extrabold text-5xl text-balance text-center md:text-start">
            Search for Preferred Platforms
          </h3>
          <p className="text-xl text-balance text-center md:text-start">
            Easily find and subscribe to your preferred platforms. Use our
            powerful search tool to discover the best options that suit your
            needs.
          </p>
        </div>
        <img
          ref={imgRefPhone4}
          src="/images/Manage.svg"
          alt=""
          width={250}
          className={`md:hidden justify-self-center transition-all duration-1000 ${
            isInViewPhone4 ? "opacity-100" : "opacity-0 translate-x-24"
          }`}
        />
        <div
          ref={textRef4}
          className={`transition  duration-1000 flex flex-col justify-center items-end gap-8 ${
            isInViewtext4 ? "opacity-100" : "opacity-0 -translate-x-24"
          }`}
        >
          <h3 className="font-extrabold text-5xl text-balance text-center md:text-end">
            Manage All Subscriptions
          </h3>
          <p className="text-xl text-balance text-center md:text-end">
            Take full control of your subscriptions. Our intuitive dashboard
            lets you manage, update, and track all your subscriptions in one
            convenient location.
          </p>
        </div>
        <img
          ref={imgRef4}
          src="/images/Manage.svg"
          alt=""
          width={250}
          className={`hidden md:block justify-self-center transition-all duration-1000 ${
            isInView4 ? "opacity-100" : "opacity-0 translate-x-24"
          }`}
        />
      </div>
    </div>
  );
};

export default Section2;

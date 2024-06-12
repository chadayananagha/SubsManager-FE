import { MdLocalMovies, MdOutlineSportsSoccer, MdApps } from "react-icons/md";
import {
  FaMusic,
  FaSpotify,
  FaPlaystation,
  FaXbox,
  FaGraduationCap,
  FaBuilding,
} from "react-icons/fa";
import { IoLogoGameControllerA, IoMdArrowDropdown } from "react-icons/io";
import { HiMiniSquaresPlus } from "react-icons/hi2";
import { RiNetflixFill } from "react-icons/ri";
import { TbBrandHbo, TbBrandDisney } from "react-icons/tb";
import {
  SiAppletv,
  SiApplemusic,
  SiYoutubemusic,
  SiPrime,
  SiParamountplus,
  SiDazn,
  SiAdobe,
  SiCrunchyroll,
} from "react-icons/si";

export const categoryIcons = {
  All: <MdApps className="absolute top-2 -right-2 text-5xl" />,
  "Select your category": (
    <IoMdArrowDropdown className="absolute top-1/2 bottom-1/2 -translate-y-1/2 right-4 text-3xl" />
  ),
  Entertainment: <MdLocalMovies className="absolute top-2 -right-2 text-5xl" />,
  Music: <FaMusic className="absolute top-2 right-0 text-4xl" />,
  Gaming: (
    <IoLogoGameControllerA className="absolute top-0 -right-2 text-6xl" />
  ),
  "e-Learning": (
    <FaGraduationCap className="absolute top-2 -right-2 text-4xl" />
  ),
  Office: <FaBuilding className="absolute top-2 -right-2 text-4xl" />,
  Sports: (
    <MdOutlineSportsSoccer className="absolute top-2 -right-2 text-5xl" />
  ),
  Others: <HiMiniSquaresPlus className="absolute top-2 right-0 text-4xl" />,
};

export const platformName = {
  Netflix: (
    <RiNetflixFill className="absolute inset-y-0 right-2 translate-y-1/3  text-2xl text-red-700" />
  ),
  Amazon: (
    <SiPrime className="absolute inset-y-0 right-2 translate-y-1/3 text-2xl text-[#219BFF] " />
  ),
  HBO: (
    <TbBrandHbo className="absolute inset-y-0 right-2 translate-y-1/3 text-2xl " />
  ),
  Paramount: (
    <SiParamountplus className="absolute inset-y-0 right-2 translate-y-1/3 text-2xl  " />
  ),
  Disney: (
    <TbBrandDisney className="absolute inset-y-0 right-2 translate-y-1/3 text-2xl  " />
  ),
  "Apple TV": (
    <SiAppletv className="absolute inset-y-0 right-2 translate-y-1/3 text-2xl  " />
  ),
  Spotify: (
    <FaSpotify className="absolute inset-y-0 right-2 translate-y-1/3 text-2xl text-green-500 bg-black rounded-full" />
  ),
  "Apple Music": (
    <SiApplemusic className="absolute inset-y-0 right-2 translate-y-1/3 text-2xl text-[#FB5A72] bg-white rounded-lg" />
  ),
  Youtube: (
    <SiYoutubemusic className="absolute inset-y-0 right-2 translate-y-1/3 text-2xl text-[#FF0808] bg-white rounded-full " />
  ),
  Playstation: (
    <FaPlaystation className="absolute inset-y-0 right-2 translate-y-1/3 text-2xl " />
  ),
  PS: (
    <FaPlaystation className="absolute inset-y-0 right-2 translate-y-1/3 text-2xl " />
  ),
  Xbox: (
    <FaXbox className="absolute inset-y-0 right-2 translate-y-1/3 text-2xl" />
  ),
  Adobe: <SiAdobe className="text-red-500" />,
  Crunchyroll: <SiCrunchyroll className="text-orange-400" />,
};

// Function to get the platform icon based on the platform name
export const getPlatformIcon = (platform) => {
  // Convert the platform name to lowercase for case-insensitive comparison
  const platformLowercase = platform?.toLowerCase();

  // Iterate over each key in the platformName object
  for (const key in platformName) {
    // Convert the key to lowercase for case-insensitive comparison
    const keyLowercase = key.toLowerCase();
    // Check if the platform name includes the key as a substring
    if (platformLowercase.includes(keyLowercase)) {
      // Return the corresponding icon if there's a match
      return platformName[key];
    }
  }
  // Return null if there's no match (or for other platforms)
  return null;
};

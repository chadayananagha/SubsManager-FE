import React from "react";
import {
  FaSpotify,
  FaPlaystation,
  FaXbox,
  FaQuestionCircle,
  FaGlobe,
} from "react-icons/fa";
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
// import { getPlatformIcon } from "../utils/icons"; // Update the path to your actual file

const PlatformCard = ({ platformName, onClick }) => {
  // Get the corresponding icon for the given platform name

  const platformIcons = {
    Netflix: <RiNetflixFill className="text-red-700" />,
    Amazon: <SiPrime className="text-[#219BFF]" />,
    HBO: <TbBrandHbo />,
    Paramount: <SiParamountplus />,
    Disney: <TbBrandDisney className="text-green-700" />,
    "Apple TV": <SiAppletv />,
    Spotify: <FaSpotify className="text-green-500" />,
    "Apple Music": (
      <SiApplemusic className="text-[#FB5A72] bg-white rounded-lg" />
    ),
    Youtube: (
      <SiYoutubemusic className="text-[#FF0808] bg-white rounded-full" />
    ),
    Playstation: <FaPlaystation />,
    PS: <FaPlaystation />,
    Xbox: <FaXbox />,
    DAZN: <SiDazn className="text-black" />,
    Adobe: <SiAdobe className="text-red-500" />,
    Crunchyroll: <SiCrunchyroll className="text-orange-400" />,
    // Default: <FaQuestionCircle className="text-gray-500" />,
    Default: <FaGlobe className="text-gray-500" />,
  };

  const getPlatformIcon = (platform) => {
    // Convert the platform name to lowercase for case-insensitive comparison
    const platformLowercase = platform?.toLowerCase();

    // Iterate over each key in the platformIcons object
    for (const key in platformIcons) {
      // Convert the key to lowercase for case-insensitive comparison
      const keyLowercase = key.toLowerCase();
      // Check if the platform name includes the key as a substring
      if (platformLowercase.includes(keyLowercase)) {
        // Return the corresponding icon if there's a match
        return platformIcons[key];
      }
    }
    // Return the default icon if there's no match (or for other platforms)
    return platformIcons.Default;
  };

  const Icon = getPlatformIcon(platformName);
  return (
    <div
      onClick={onClick}
      className="w-48 h-36 p-4 rounded border border-slate-300 relative overflow-hidden group bg-color cursor-pointer flex flex-col justify-center items-center"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      <div className="relative z-10 flex flex-col items-center">
        <h3 className="font-medium text-lg text-slate-950 group-hover:text-white transition-colors duration-300">
          {platformName}
        </h3>
      </div>
      {Icon && (
        <div className="absolute -right-4 -top-1 text-7xl text-black">
          {Icon}
        </div>
      )}
    </div>
  );
};

export default PlatformCard;

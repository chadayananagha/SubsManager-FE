import {
  FaMusic,
  FaGamepad,
  FaGraduationCap,
  FaBook,
  FaBuilding,
  FaShieldAlt,
  FaBriefcaseMedical,
  FaCloud,
  FaLaptopCode,
} from "react-icons/fa";
import { MdOutlineSportsSoccer, MdLocalMovies, MdApps } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";

const categoryIcons = {
  All: MdApps,
  Music: FaMusic,
  Sports: MdOutlineSportsSoccer,
  Entertainment: MdLocalMovies,
  Gaming: FaGamepad,
  "e-Learning": FaGraduationCap,
  Reading: FaBook,
  Other: IoDocumentText,
  other: IoDocumentText,
  Office: FaBuilding,
  Security: FaShieldAlt,
  Software: FaLaptopCode,
  Cloud: FaCloud,
  Health: FaBriefcaseMedical,
};

export default categoryIcons;

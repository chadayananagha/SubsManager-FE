import {
  FaMusic,
  FaGamepad,
  FaGraduationCap,
  FaBuilding,
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
  Other: IoDocumentText,
  Office: FaBuilding,
};

export default categoryIcons;

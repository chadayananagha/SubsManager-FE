import {
  FaMusic,
  FaGamepad,
  FaGraduationCap,
  FaBuilding,
} from "react-icons/fa";
import { MdOutlineSportsSoccer, MdLocalMovies, MdApps } from "react-icons/md";
import { HiMiniSquaresPlus } from "react-icons/hi2";
const categoryIcons = {
  All: MdApps,
  Music: FaMusic,
  Sports: MdOutlineSportsSoccer,
  Entertainment: MdLocalMovies,
  Gaming: FaGamepad,
  "e-Learning": FaGraduationCap,
  Others: HiMiniSquaresPlus,
  Office: FaBuilding,
};

export default categoryIcons;

import "./assets/scss/global.scss";
import Header from "./layouts/Header/Header";
import SearchPage from "./pages/SearchPage/SearchPage";

const headerLayout = new Header();
const searchPage = new SearchPage();

document.body.appendChild(headerLayout.component);
document.body.appendChild(searchPage.component);

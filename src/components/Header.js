import { Link } from "react-router-dom";
import styled from "styled-components";
import { mainStyle } from "../GlobalStyled";
import image from "../img/image.png";

const Container = styled.section`
  width: 100%;
  max-width: 440px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px ${mainStyle.moPadding};
  margin: 0 auto;
`;
const Logo = styled.div`
  img {
    width: 98px;
    height: 20px;
  }
`;
const Menu = styled.ul`
  display: flex;
  li {
    margin-left: 30px;
  }
`;

const Header = () => {
  return (
    <Container>
      <Logo>
        <Link to={"/"}>
          <img src={image} alt="pongdangjeju_logo"></img>
        </Link>
      </Logo>

      <Menu>
        <li>
          <Link to={"/course"}>추천코스</Link>
        </li>
        <li>
          <Link to={"/search"}>검색</Link>
        </li>
      </Menu>
    </Container>
  );
};

export default Header;

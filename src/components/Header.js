import { Link } from "react-router-dom";
import styled from "styled-components";
import { mainStyle } from "../GlobalStyled";
import image from "../img/image.png";
import { IoSearch } from "react-icons/io5";

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
    height: 24px;
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
          <Link to={"/search"}>
            <IoSearch style={{ color: "#00A7C1", fontSize: "22px" }} />
          </Link>
        </li>
      </Menu>
    </Container>
  );
};

export default Header;

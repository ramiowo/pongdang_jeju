import { Link } from "react-router-dom";
import styled from "styled-components";
import { mainStyle } from "../GlobalStyled";
import image from "../img/image.png";
import { IoSearch } from "react-icons/io5";
import { useEffect, useRef } from "react";

const Container = styled.section`
  width: 100%;
  max-width: 440px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px ${mainStyle.moPadding};
  margin: 0 auto;
  z-index: 10;
  @media screen and (min-width: 441px) {
    max-width: 100%;
  }
  @media screen and (min-width: 769px) {
    padding: 0 ${mainStyle.tabletPadding};
  }
  @media screen and (min-width: 1441px) {
    padding: 0 ${mainStyle.pcPadding};
  }
`;
const Logo = styled.div`
  img {
    width: 98px;
    height: 24px;
  }
  @media screen and (min-width: 1441px) {
    img {
      width: 110px;
      height: 28px;
    }
  }
`;
const Menu = styled.ul`
  display: flex;
  li {
    margin-left: 30px;
  }
`;

const Header = () => {
  const headerRef = useRef();

  const scrollHandler = () => {
    const pageY = window.scrollY;
    const current = headerRef.current;

    if (pageY >= 300) {
      current.style.position = "fixed";
      current.style.backgroundColor = "rgba(255,255,,0.5)";
      current.style.backdropFilter = "blur(10px)";
    } else {
      current.style.position = "absolute";
      current.style.backgroundColor = "transparent";
      current.style.backdropFilter = "blur(0px)";
    }
  };

  useEffect(() => {
    return window.addEventListener("scroll", scrollHandler);
  });
  return (
    <Container ref={headerRef}>
      <Logo>
        <Link to={"/"}>
          <img src={image} alt="pongdangjeju_logo"></img>
        </Link>
      </Logo>

      <Menu>
        <li>
          <Link to={"/search"}>
            <IoSearch style={{ color: "#00A7C1", fontSize: "23px" }} />
          </Link>
        </li>
      </Menu>
    </Container>
  );
};

export default Header;

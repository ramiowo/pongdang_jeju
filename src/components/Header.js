import { Link } from "react-router-dom";
import styled from "styled-components";
import { mainStyle } from "../GlobalStyled";

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
const Logo = styled.div``;
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
        <Link to={"/"}>제주퐁당</Link>
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

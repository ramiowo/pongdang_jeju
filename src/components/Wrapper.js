import styled from "styled-components";
import { mainStyle } from "../GlobalStyled";

const Container = styled.div`
  padding: 70px ${mainStyle.moPadding};
`;

const Wrapper = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Wrapper;

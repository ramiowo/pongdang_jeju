import styled from "styled-components";
import { mainStyle } from "../GlobalStyled";

const Container = styled.div`
  padding: 60px ${mainStyle.moPadding} 0;
`;

const Wrapper = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Wrapper;

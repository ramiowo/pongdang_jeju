import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #fff;
  color: #fff;
  padding: 40px 20px;
  text-align: center;
`;
const Copyright = styled.p`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
  margin-top: 30px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Copyright>
        &copy; {new Date().getFullYear()} 퐁당제주. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;

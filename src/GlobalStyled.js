import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const mainStyle = {
  moPadding: "16px",
  tabletPadding: "40px",
  pcPadding: "10%",
};

export const GlobalStyled = createGlobalStyle`
${reset}
*{
    box-sizing: border-box;
}
body{
    background-repeat: no-repeat;
    font-family: "Noto Sans KR", sans-serif;
    background: rgb(242,253,255);
    background: linear-gradient(180deg, rgba(242,253,255,1) 0%, rgba(210,249,255,1) 102%);
}
a{
    text-decoration: none;
    color: #333;
}
img{
    width: 100%;
    display: block;
}
`;

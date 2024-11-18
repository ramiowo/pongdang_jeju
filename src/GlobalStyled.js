import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const mainStyle = {
  moPadding: "16px",
};

export const GlobalStyled = createGlobalStyle`
${reset}
*{
    box-sizing: border-box;
}
body{
    font-family: "Noto Sans KR", sans-serif;
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

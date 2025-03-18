import { css, keyframes } from "hono/css"

const ani = keyframes`
  from {
    --angle: 0deg;
  }
  to {
    --angle: 360deg;
  }
`

export const input = css`
border: none;
background: rgb(16,16,16);
color: white;
padding: 5px 10px;
`

export const button = css`
${input}
background: rgb(25,25,25);
cursor: pointer;
transition: all 0.3s ease-in-out;

&:hover {
  background: rgba(12, 12, 12);
}
`

const cardPseudo = css`
&::after, &::before{
  width: 100%;
  height: 100%;
  content: ' ';
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  z-index: -1;
  padding: 5px;
  border-radius: 10px;
  animation-name: ${ani};
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  background-image: conic-gradient(from var(--angle), #28af43, #108827, #057b1e,#007519,#28af43);
}
`
const cardBefore = css`
&::before {
  filter: blur(1.5em);
  opacity: 0.5;
}
`




export const card = css`
  width: 30dvw;
  background-color: #030303;
  padding: 2em;
  text-align: center;
  border-radius: 10px;
  margin: 25dvh auto;
  position: relative;
  ${cardPseudo}
  ${cardBefore}
`

export const errorCard = css`
  ${card}
  &::before, &::after {
    background-image: conic-gradient(from var(--angle), #F1959B, #DC1C13, #EA4C46, #F07470, #F1959B);
  }
`

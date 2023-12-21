import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
  &, &.light-mode{
  --color-grey-0: #fff;
  --color-grey-50: #fafaf9;
  --color-grey-100: #f5f5f4;
  --color-grey-200: #e7e5e4;
  --color-grey-300: #d6d3d1;
  --color-grey-400: #a8a29e;
  --color-grey-500: #78716c;
  --color-grey-600: #57534e;
  --color-grey-700: #44403c;
  --color-grey-800: #292524;
  --color-grey-900: #1c1917;

  --color-blue-100: #e0f2fe;
  --color-blue-700: #0369a1;
  --color-green-100: #dcfce7;
  --color-green-700: #15803d;
  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;
  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-indigo-100: #e0e7ff;
  --color-indigo-700: #4338ca;

  --color-red-100: #fef2f2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --backdrop-color: rgba(255, 255, 255, 0.1);
  --backdrop-color-grey-0: rgba(255, 255, 255, 0.7);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
  --shadow-around: 0px 0px 5rem 5px rgba(0, 0, 0, 0.1);

  --image-grayscale: 0;
  --image-opacity: 100%;
  }

  &.dark-mode{
  --color-grey-0: #191613;
  --color-grey-50: #1c1917;
  --color-grey-100: #292524;
  --color-grey-200: #44403c;
  --color-grey-300: #57534e;
  --color-grey-400: #78716c;
  --color-grey-500: #a8a29e;
  --color-grey-600: #d6d3d1;
  --color-grey-700: #e7e5e4;
  --color-grey-800: #f5f5f4;
  --color-grey-900: #fafaf9;

  --color-blue-100: #075985;
  --color-blue-700: #e0f2fe;
  --color-green-100: #052e16;
  --color-green-700: #C5FAC5;
  --color-yellow-100: #854d0e;
  --color-yellow-700: #fef9c3;
  --color-silver-100: #374151;
  --color-silver-700: #f3f4f6;
  --color-indigo-100: #3730a3;
  --color-indigo-700: #e0e7ff;

  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --backdrop-color: rgba(0, 0, 0, 0.3);
  --backdrop-color-grey-0: rgba(0, 0, 0, 0.7);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);
  --shadow-around: 0px 0px 5rem 5px rgba(0, 0, 0, 0.5);

  --image-grayscale: 10%;
  --image-opacity: 90%;

  input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(100%);
  }
}

  --color-brand-50: #f0fdf4;
  --color-brand-100: #dcfce7;
  --color-brand-200: #bbf7d0;
  --color-brand-500: #16a34a;
  --color-brand-600: #15803d;
  --color-brand-700: #166534;
  --color-brand-800: #14532d;
  --color-brand-900: #052e16;

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

@media (max-width: 550px){
  html {
    font-size: 56.25%
  }
}

body {
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.5px;
  color: var(--color-grey-700);
  background-color: var(--color-grey-50);
  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

*:focus-visible{
  outline: 2px solid var(--color-brand-600);
  outline-offset: -2px;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled,
textarea:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

input:not([type="checkbox"]):not([disabled]) {
  box-shadow: 0 0 0 3rem var(--color-grey-0) inset;
  transition: box-shadow 0.3s, border 0.3s;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 3rem var(--color-grey-0) inset;
  -webkit-background-clip: text;
  -webkit-text-fill-color: var(--color-grey-700);
  caret-color: var(--color-grey-700);
}

input:-webkit-autofill:disabled,
select:-webkit-autofill:disabled,
textarea:-webkit-autofill:disabled {
  box-shadow: 0 0 0 3rem var(--color-grey-200) inset;
  color: var(--color-grey-500);
}

`;

export default GlobalStyles;

import React from 'react';

const MagicScriptTag = () => {
  const codeToRunOnClient = `
(function() {
  let savedTheme = localStorage.getItem('theme');
  if (savedTheme !== 'dark' && savedTheme !== 'light') {
      // If matchMedia.matches returns empty string or other falsy value use dark mode
      savedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches !== false ? 'dark' : 'light';
  }
  if (savedTheme === 'light') {
      window.document.documentElement.classList.remove('dark');
  }
  else {
      window.document.documentElement.classList.add('dark');
  }
  localStorage.setItem('theme', savedTheme);
})()
  `;
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient, }} />;;
};

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<MagicScriptTag />);
};

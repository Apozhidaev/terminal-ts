export default function errorHandler() {
  window.onerror = (error) => {
    const message = `
${error}


Do you want continue?
`;
    if (!window.confirm(message)) {
      window.localStorage.clear();
      window.location.reload();
    }
  };
}

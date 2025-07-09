const hashCode = (str: string) =>
  str.split('').reduce((acc, char) => {
    return (acc * 31 + char.charCodeAt(0)) >>> 0;
  }, 0);

export default hashCode;

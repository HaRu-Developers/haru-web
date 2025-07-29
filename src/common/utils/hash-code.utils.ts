const hashCode = (value: string | number): number => {
  const str = value.toString();
  return str.split('').reduce((acc, char) => {
    return (acc * 31 + char.charCodeAt(0)) >>> 0;
  }, 0);
};

export default hashCode;

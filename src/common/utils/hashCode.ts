const hashCode = (str: string) => str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

export default hashCode;

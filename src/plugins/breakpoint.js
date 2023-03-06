export const screens = () => {
  const screenWidth = window.innerWidth
  return {
    mobile: screenWidth <= 425,
    tablet: screenWidth > 425 && screenWidth <= 768,
    desktop: screenWidth > 768,
  };
}

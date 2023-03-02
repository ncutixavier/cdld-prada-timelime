const breakpoint = () => {
 return {
   xs: window.innerWidth <= 425,
   sm: window.innerWidth > 425 && window.innerWidth <= 768,
   md: window.innerWidth > 768 && window.innerWidth <= 1439,
   lg: window.innerWidth >= 1440,
   mdAndUp: window.innerWidth > 768,
 };
}

export default breakpoint

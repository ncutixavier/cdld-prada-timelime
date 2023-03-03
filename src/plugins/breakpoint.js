import useBreakpoints from "vue-next-breakpoints";

export const breakpoint = useBreakpoints({
  mobile: 425,
  tablet: [426, 768],
  desktop: [769],
});

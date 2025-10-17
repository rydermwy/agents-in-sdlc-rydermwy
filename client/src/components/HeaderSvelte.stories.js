import HeaderSvelte from './HeaderSvelte.svelte';

export default {
  title: 'Components/Header',
  component: HeaderSvelte,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const Default = {
  render: (args) => ({
    Component: HeaderSvelte,
    props: args,
  }),
  args: {
    title: "Tailspin Toys",
    homeUrl: "/",
    showAbout: true,
  },
};

export const CustomTitle = {
  render: (args) => ({
    Component: HeaderSvelte,
    props: args,
  }),
  args: {
    title: "DevOps Games Hub",
    homeUrl: "/",
    showAbout: true,
  },
};

export const WithoutAboutLink = {
  render: (args) => ({
    Component: HeaderSvelte,
    props: args,
  }),
  args: {
    title: "Tailspin Toys",
    homeUrl: "/",
    showAbout: false,
  },
};

export const CustomHomeUrl = {
  render: (args) => ({
    Component: HeaderSvelte,
    props: args,
  }),
  args: {
    title: "Tailspin Toys",
    homeUrl: "/dashboard",
    showAbout: true,
  },
};

export const LongTitle = {
  render: (args) => ({
    Component: HeaderSvelte,
    props: args,
  }),
  args: {
    title: "Tailspin Toys - The Ultimate DevOps Board Game Collection Platform",
    homeUrl: "/",
    showAbout: true,
  },
};
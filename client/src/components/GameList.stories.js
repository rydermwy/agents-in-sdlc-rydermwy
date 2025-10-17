import GameList from './GameList.svelte';

const mockGames = [
  {
    id: 1,
    title: "DevOps: The Board Game",
    description: "Navigate through the complex world of software deployment, continuous integration, and team collaboration.",
    publisher_name: "Agile Games Inc.",
    category_name: "Strategy"
  },
  {
    id: 2,
    title: "Scrum Master",
    description: "Lead your development team through sprints, manage stakeholders, and deliver value in this fast-paced game.",
    publisher_name: "Sprint Studios",
    category_name: "Management"
  },
  {
    id: 3,
    title: "Bug Hunt",
    description: "Race against time to find and fix bugs in your codebase before the deployment deadline.",
    publisher_name: "Debug Entertainment",
    category_name: "Adventure"
  },
  {
    id: 4,
    title: "Code Review Chronicles",
    description: "Collaborate with your team to improve code quality while balancing speed and precision.",
    publisher_name: "Quality Assurance Games",
    category_name: "Cooperative"
  }
];

export default {
  title: 'Components/GameList',
  component: GameList,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const Default = {
  render: (args) => ({
    Component: GameList,
    props: args,
  }),
  args: {
    games: mockGames,
  },
};

export const EmptyState = {
  render: (args) => ({
    Component: GameList,
    props: args,
  }),
  args: {
    games: [],
  },
};

export const LoadingState = {
  render: () => ({
    Component: GameList,
    props: {},
  }),
};

export const SingleGame = {
  render: (args) => ({
    Component: GameList,
    props: args,
  }),
  args: {
    games: [mockGames[0]],
  },
};
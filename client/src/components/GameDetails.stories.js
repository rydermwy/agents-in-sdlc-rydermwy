import GameDetails from './GameDetails.svelte';

const mockGame = {
  id: 1,
  title: "DevOps: The Board Game",
  description: "Navigate through the complex world of software deployment, continuous integration, and team collaboration. Build pipelines, manage infrastructure, and lead cross-functional teams to deliver high-quality software. Experience the challenges and rewards of modern software development lifecycle in this engaging strategic board game.",
  publisher: {
    id: 1,
    name: "Agile Games Inc."
  },
  category: {
    id: 1,
    name: "Strategy"
  },
  starRating: 4.5
};

const mockGameWithoutRating = {
  id: 2,
  title: "Scrum Master",
  description: "Lead your development team through sprints, manage stakeholders, and deliver value in this fast-paced game.",
  publisher: {
    id: 2,
    name: "Sprint Studios"
  },
  category: {
    id: 2,
    name: "Management"
  },
  starRating: null
};

const mockGameMinimal = {
  id: 3,
  title: "Bug Hunt",
  description: "Race against time to find and fix bugs in your codebase before the deployment deadline.",
  publisher: null,
  category: null,
  starRating: 3.0
};

export default {
  title: 'Components/GameDetails',
  component: GameDetails,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const FullDetails = {
  render: (args) => ({
    Component: GameDetails,
    props: args,
  }),
  args: {
    game: mockGame,
  },
};

export const WithoutRating = {
  render: (args) => ({
    Component: GameDetails,
    props: args,
  }),
  args: {
    game: mockGameWithoutRating,
  },
};

export const MinimalDetails = {
  render: (args) => ({
    Component: GameDetails,
    props: args,
  }),
  args: {
    game: mockGameMinimal,
  },
};

export const LoadingState = {
  render: (args) => ({
    Component: GameDetails,
    props: args,
  }),
  args: {
    gameId: 1,
  },
};

export const HighRating = {
  render: (args) => ({
    Component: GameDetails,
    props: args,
  }),
  args: {
    game: {
      ...mockGame,
      title: "Perfect DevOps Game",
      starRating: 5.0
    },
  },
};

export const LowRating = {
  render: (args) => ({
    Component: GameDetails,
    props: args,
  }),
  args: {
    game: {
      ...mockGame,
      title: "Buggy Release Simulator",
      starRating: 1.5
    },
  },
};
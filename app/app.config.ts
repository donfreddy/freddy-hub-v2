export default defineAppConfig({
  global: {
    meetingLink: 'https://cal.com/donfreddy/15min',
    available: true,
  },
  profile: {
    name: 'Don Freddy',
    job: 'Fullstack Developer',
    email: 'freddytamwo@gmail.com',
    phone: '(+237) 6 71 84 27 01',
    picture: 'https://avatars.githubusercontent.com/u/71938701?v=4',
  },
  socials: {
    github: 'https://github.com/donfreddy',
    twitter: 'https://twitter.com/',
    linkedin: 'https://www.linkedin.com/in/',
    instagram: 'https://www.instagram.com/',
    spotify: 'https://open.spotify.com/user/',
  },
  ui: {
    colors: {
      primary: 'indigo',
      neutral: 'zinc',
    },
    container: {
      base: 'w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'
    },
    button: {
      slots: {
        base: 'cursor-pointer',
      },
      defaultVariants: {
        color: 'neutral',
      },
    },
  },
});

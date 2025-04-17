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
  socials: [
    {
      name: 'GitHub',
      icon: 'mdi:github',
      url: 'https://github.com/donfreddy',
    },
    {
      name: 'LinkedIn',
      icon: 'mdi:linkedin',
      url: 'https://linkedin.com/in/don-freddy-237ba4193',
    },
    {
      name: 'Twitter',
      icon: 'mdi:twitter',
      url: 'https://x.com/don_freddy_',
    },
    {
      name: 'Telegram',
      icon: 'mdi:telegram',
      url: 'https://t.me/dfreddy0',
    },
  ],
  ui: {
    colors: {
      primary: 'indigo',
      neutral: 'zinc',
    },
    container: {
      base: 'w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8',
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

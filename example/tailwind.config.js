module.exports = {
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui'),
    require('..')({
      path: 'dist/tailwind.ts',
      exportClassesChoice: true,
      exportClassesList: true,
      exportClassNamesHelper: true,
      exportConstants: true,
    }),
    }),
  ],
};

declare module "tailwindcss" {
  const tailwindcss: (config: object) => import("postcss").Plugin<any>;

  export = tailwindcss;
}

declare module "*.toml" {
  const init: (opts?: any) => Promise<any>;
  export * from "*";
}

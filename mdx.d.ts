declare module "*.mdx" {
  function MDXComponent(props: { [key: string]: any }): JSX.Element;
  export default MDXComponent;
}

import { NavLink } from "react-router-dom";

type RouterLinkProps = {
  children: React.ReactNode;
  href: string;
} & React.ComponentProps<'a'>;

export const RouterLink = ({ children, href, ...props }: RouterLinkProps) => {
  return (
    <NavLink to={href} {...props}>{children}</NavLink>
  );
};
interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps): React.JSX.Element => {
  return (
    <header>
      <h1>{props.name}</h1>
    </header>
  );
};

export default Header;

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="container grid max-w-7xl items-center gap-8">
      {children}
    </div>
  );
};

export default Container;

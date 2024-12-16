import Logo from "./logo";

const LoadingIndicator = () => (
  <div className="inset-0 absolute flex items-center justify-center opacity-40">
    <div className="animate-slow-pulse pointer-events-none">
      <Logo />
    </div>
  </div>
);

export default LoadingIndicator;

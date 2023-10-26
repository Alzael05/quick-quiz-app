import Image from "next/image";

const Logo = ({ width, height }) => {
  return (
    <div className="row">
      <div className="d-flex justify-content-center align-items-center">
        <Image src="/images/logo.png" alt="Logo" width={width} height={height} priority />
      </div>
    </div>
  );
};

export default Logo;

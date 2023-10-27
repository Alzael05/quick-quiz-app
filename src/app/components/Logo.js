// import Image from "next/image";

const Logo = ({ maxWidth }) => {
  console.log(maxWidth);
  return (
    <div className="logo">
      <img
        src="/images/logo.png"
        // width={100}
        // height={100}
        alt="Logo"
        style={{ maxWidth }}
      />
    </div>
  );
};

export default Logo;

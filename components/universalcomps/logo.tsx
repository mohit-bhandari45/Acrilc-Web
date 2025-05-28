import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="relative left-[-5] text-black font-poppins">
      <span className={`text-5xl font-bold`}>a</span>
      <span className="text-4xl font-bold">c</span>
      <span className="text-4xl font-bold">r</span>
      <span className="text-4xl font-bold">i</span>
      <span className="text-4xl font-bold">l</span>
      <span className="text-4xl font-bold">c</span>
    </div>
    </Link>
  );
};

export default Logo;
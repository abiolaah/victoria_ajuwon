import { useRouter } from "next/navigation";

interface NavbarItemProps {
  label: string;
  link: string;
}

const NavbarItem = ({ label, link }: NavbarItemProps) => {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => router.push(link)}
        className="text-white text-3xl cursor-pointer hover:text-gray-300 transition"
      >
        {label}
      </div>
    </>
  );
};

export default NavbarItem;

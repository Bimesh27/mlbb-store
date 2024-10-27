import AddDiamondForm from "@/components/form/AddDiamondForm";
import StockAccountForm from "@/components/form/StockAccountForm";
import Sidebar from "@/components/Sidebar";
import { MdAdminPanelSettings } from "react-icons/md";

const AdminPage = () => {
  return (
    <div className="min-h-screen w-full flex text-white py-4 flex-col items-center">
      <div className="flex gap-2 h-fit items-center ">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
        <MdAdminPanelSettings className="text-2xl font-semibold text-green-500" />
      </div>
      <div className="flex gap-20 mt-10 max-md:flex-col">
        <AddDiamondForm />
        <StockAccountForm/>
      </div>
    </div>
  );
};

export default AdminPage;

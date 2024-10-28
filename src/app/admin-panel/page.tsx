import AddDiamondForm from "@/components/form/AddDiamondForm";
import StockAccountForm from "@/components/form/StockAccountForm";
import Sidebar from "@/components/Sidebar";
import { MdAdminPanelSettings } from "react-icons/md";
import { GrOverview } from "react-icons/gr";
import User from "@/models/User";
import UserPost from "@/models/UserPost";
import MlAccount from "@/models/MlAccount";

const AdminPage = () => {
  async function getUserCount() {
    try {
      const count = await User.countDocuments(); // Count all users
      return count;
    } catch (error) {
      console.error("Error counting users:", error);
    }
  }

  async function getPostCount() {
    try {
      const count = await UserPost.countDocuments(); // Count all posts
      return count;
    } catch (error) {
      console.error("Error counting posts:", error);
    }
  }

  async function getStockAccountCount() {
    try {
      const count = await MlAccount.countDocuments(); // Count all stock accounts
      return count;
    } catch (error) {
      console.error("Error counting stock accounts:", error);
    }
  }

  const userCount = getUserCount();
  const postCount = getPostCount();
  const stockAccountCount = getStockAccountCount();

  return (
    <div className="min-h-screen w-full flex text-white py-4 flex-col items-center">
      <div className="flex gap-2 h-fit items-center ">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
        <MdAdminPanelSettings className="text-2xl font-semibold text-green-500" />
      </div>
      <div className="flex gap-20 mt-10 max-md:flex-col p-4 justify-center w-full items-center border-b border-[#dadada49]">
        <AddDiamondForm />
        <StockAccountForm />
      </div>
      <div className="w-full h-screen flex flex-col items-center">
        <div className="flex items-center justify-center mt-4 gap-2 bg-blue-600 px-4 py-1">
          <h1 className=" uppercase text-xl font-semibold">Overview</h1>
          <GrOverview />
        </div>

        <div className="border w-[90%] h-full mt-4 flex justify-around p-10 border-[#dadada5c]">
          <div className="text-center">
            <h1 className="text-xl font-semibold text-green-500"> No of Stock Account</h1>
            <p>{stockAccountCount}</p>
          </div>
          <div className="text-center">
            <h1 className="text-xl font-semibold text-green-500"> No of Posts</h1>
            <p>{postCount}</p>
          </div>
          <div className="text-center">
            <h1 className="text-xl font-semibold text-green-500"> No of Users</h1>
            <p>{userCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/useAuthStore";
import { SignOut } from "../Api/Actions/Auth";
import { useMutation } from "@tanstack/react-query";
import { errorNotify, successNotify } from "../utils/tostifyHelp";

const Header = () => {
  const { userDetails, loggedIn } = useAuthStore((s: any) => s);
  const navigate = useNavigate()

  const {mutate} = useMutation(
    {
      mutationFn: SignOut,
      onSuccess: () => {
        navigate('/')
        loggedIn({
          isAuthenticated: false,
          userDetails: {},
        });
        successNotify("User logged out successfully!")
      },
      onError: (e) => {
        errorNotify((e as any).response.data.message)
      }
    }
  )

  const handleClick = () => {
    mutate()
  }

  return (
    <div className="bg-blue-800 py-6">
      <div className=" container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">MernHoliday.com</Link>
        </span>
        <span className="flex space-x-2">
          {userDetails?.isAuthenticated ? (
            <>
              <Link
                to="/mybookings"
                className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
              >
                My Bookings
              </Link>
              <Link
                to="/myhotels"
                className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
              >
                My Hotels
              </Link>
              <Link
                to={''}
                onClick={handleClick}
                className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
              >
                Sign Out
              </Link>
            </>
          ) : (
            <Link
              to="/signin"
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;

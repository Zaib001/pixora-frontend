import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCredits } from "../../redux/actions/creditActions";
import ProfileCard from "../../components/dashboard/ProfileCard";
import CreditCard from "../../components/dashboard/CreditCard";

export default function Profile() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCredits());
  }, [dispatch]);

  return (
    <div className="p-6 space-y-6">
      {/* <CreditCard /> */}
      <ProfileCard />
    </div>
  );
}

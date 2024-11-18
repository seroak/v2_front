import { useMutation } from "@tanstack/react-query";
import { emissionGuest } from "@/services/api";
import { useCustomAlert } from "@/pages/components/CustomAlert";

interface GuestType {
  id: number;
  name: string;
  email: string;
  status: number | string;
}

interface props {
  guest: GuestType;
  getClassroomRefetch: () => void;
}

const Guest = ({ guest, getClassroomRefetch }: props) => {
  const { openAlert, CustomAlert } = useCustomAlert();
  const useEmissoionGuestMutation = () => {
    return useMutation({
      mutationFn: emissionGuest,
      onSuccess: () => {
        openAlert("방출되었습니다.");
        getClassroomRefetch();
      },
      onError: (error) => {
        console.error("An error occurred:", error);
        openAlert("방출에 실패했습니다.");
      },
    });
  };
  const emissionGuestMutation = useEmissoionGuestMutation();
  const id = Number(guest.id);
  const handleEmissionGuest = () => {
    emissionGuestMutation.mutate(id);
  };

  return (
    <>
      <CustomAlert />
      <li style={{ minWidth: "250px" }}>
        <div className="data03-name">
          <p>{guest.name}</p>
          <span>{guest.email}</span>
        </div>
        <div className="data03-btns">
          <button className="red" onClick={handleEmissionGuest}>
            방출
          </button>
        </div>
      </li>
    </>
  );
};
export default Guest;

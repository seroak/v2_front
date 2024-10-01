import { useMutation } from "@tanstack/react-query";
interface GuestType {
  id: number;
  name: string;
  email: string;
  status: number | string;
}
interface props {
  guest: GuestType;
}
const fetchEmissionGuest = async (classroomAccountId: number) => {
  try {
    const response = await fetch(
      `http://localhost:8080/edupi-lms/v1/classroom/account?classroomAcountId=${classroomAccountId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

const Guest = ({ guest }: props) => {
  const useEmissoionGuestMutation = () => {
    return useMutation({
      mutationFn: fetchEmissionGuest,
      onSuccess: () => {
        alert("방출되었습니다.");
      },
      onError: (error) => {
        console.error("An error occurred:", error);
        alert("방출에 실패했습니다.");
      },
    });
  };
  const emissionGuestMutation = useEmissoionGuestMutation();
  console.log(guest);
  const id = Number(guest.id);
  const handleEmissionGuest = () => {
    emissionGuestMutation.mutate(id);
  };
  return (
    <li>
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
  );
};
export default Guest;

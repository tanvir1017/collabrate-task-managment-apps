import { User } from "lucide-react";
import Image from "next/image";
import { Button } from "react-day-picker";
import { Members, userDataType } from "../../../type/global";

const ShowAvatarTeam = ({
  members,
  registeredUser,
}: {
  members: Members[];
  registeredUser: userDataType[];
}) => {
  // Get email values from the members array
  const targetedUser = members.map((t) => t.email);

  // Filter the registeredUser array to include only objects with matching email values
  const filteredObjects = registeredUser.filter((user: userDataType) =>
    targetedUser.includes(user.email)
  );

  return (
    <div className="mt-3 flex -space-x-2 overflow-hidden">
      hello
      {filteredObjects.map((user: userDataType, i: number) => (
        <div key={i} className="relative rounded-full overflow-hidden w-8 h-8 ">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={`${user.name} avatar`}
              layout="fill"
              objectFit="cover"
              className="absolute "
            />
          ) : (
            <Button className="flex">
              <div className="absolute m-auto">
                <User className="w-4 h-4" />
              </div>
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShowAvatarTeam;

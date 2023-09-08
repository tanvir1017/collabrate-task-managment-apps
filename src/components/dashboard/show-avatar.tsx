import { User } from "lucide-react";
import Image from "next/legacy/image";
import { userDataType } from "../../../type/global";
import { Button } from "../ui/button";

const ShowAvatar = ({
  members,
  registeredUser,
}: {
  members: string[];
  registeredUser: userDataType[];
}) => {
  const filteredObjects = registeredUser.filter((user: userDataType) =>
    members.includes(user.email)
  );

  return (
    <div className="mt-3 flex -space-x-2 overflow-hidden">
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

export default ShowAvatar;

// This is the most messy file.
// If don't want a headache, don't read it.
import lazy from "next/dynamic";
import Image from "next/image";

import useGlobalStore from "@/store/globalData";
import { courseByLegacySku } from "@/store/products";
import { relativeTime } from "@/utils/helpers";
import getServerUser from "@/utils/user/server";

const UserProgress = lazy(() => import("./UserProgress"));
const UserXP = lazy(() => import("./UserXP"));

interface Props {
  field: "email" | "photoURL" | "displayName" | "uid" | "xp" | "xp-raw" | "status" | "expires" | "courses";
}

export default function UserData({ field }: Props) {
  const { userData } = useGlobalStore.getState();
  const user = getServerUser();

  const purchasedCourses = [...Object.keys(userData?.courses || {}), ...Object.keys(userData?.products || {}).map(courseByLegacySku)].filter(Boolean);

  return (
    <>
      {field === "email" && user?.email}
      {field === "photoURL" && (
        <Image src={user?.picture ?? "/img/ui/avatar.svg"} alt="avatar" height={48} width={48} className="max-w-full rounded-full" />
      )}
      {field === "displayName" && user?.name}
      {field === "uid" && user?.user_id}
      {field === "xp" && <UserXP />}
      {field === "xp-raw" && <UserProgress />}
      {field === "expires" && userData?.expires && `Your PRO access expires ${relativeTime(userData?.expires)}`}
      {
        /* Uses the `!!` otherwise a `0` is present at its place */
        field === "courses" && !!purchasedCourses?.length && (
          <>
            <h3 className="font-display text-white font-normal">Purchased Courses</h3>
            <ul className="mb-10">
              {purchasedCourses.map(course => (
                <li key={course}>
                  <a className="text-blue-500 no-underline" href={`/courses/${course}`}>
                    {course}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )
      }
      {field === "status" && <span className={userData?.pro_status ?? "basic"}>{userData?.pro_status ?? "basic"}</span>}
    </>
  );
}

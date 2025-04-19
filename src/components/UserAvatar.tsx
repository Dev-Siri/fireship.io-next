import lazy from "next/dynamic";
import Link from "next/link";

import { IfBasic, IfCanceled, IfEnterprise, IfLifetime, IfPro } from "./ConditionalUserDataRender";
import IfUser from "./IfUser";
import UserProgress from "./UserProgress";

const UserImage = lazy(() => import("./UserImage"));

export default function UserAvatar() {
  const label = "absolute bottom-0 left-1/2 -translate-x-1/2 font-display text-center block mx-auto px-2 text-xs rounded-sm shadow-lg cursor-help";

  return (
    <Link href="/dashboard">
      <div className="relative top-1 overflow-clip w-12">
        <IfUser show={<UserImage />} />
        <IfPro>
          <span className={`${label} bg-green-500`} title="all access pass">
            PRO
          </span>
        </IfPro>
        <IfLifetime>
          <span className={`${label} bg-green-500`} title="you are a total chad">
            Lifer
          </span>
        </IfLifetime>
        <IfEnterprise>
          <span className={`${label} bg-blue-500`} title="enterprise account">
            SUDO
          </span>
        </IfEnterprise>
        <IfCanceled>
          <span className={`${label} bg-orange-500`} title="thank you for being a former member">
            Vet
          </span>
        </IfCanceled>
        <IfBasic>
          <span className={`${label} bg-gray6`} title="upgrade for all access">
            Basic
          </span>
        </IfBasic>
      </div>
      <span
        className="absolute top-0 -right-8 text-green-500 text-sm p-1 font-bold min-w-[5ch] text-center cursor-help bg-black bg-opacity-50 rounded-full shadow-xl"
        title="experience points"
      >
        <UserProgress />
      </span>
    </Link>
  );
}

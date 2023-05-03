import lazy from "next/dynamic";

import useGlobalStore from "@/store/globalData";
import getServerUser from "@/utils/user/server";

import { courseByLegacySku } from "@/store/products";
import { relativeTime } from "@/utils/helpers";

import { IfEnterprise } from "@/components/ConditionalUserDataRender";
import LoadingSpinner from "@/components/LoadingSpinner";
import UserProgress from "@/components/UserProgress";

const DeleteAccount = lazy(() => import("@/components/DeleteAccount"));
const SignOutButton = lazy(() => import("@/components/SignOutButton"));
const UserCharges = lazy(() => import("@/components/UserCharges"));
const ModalAction = lazy(() => import("@/components/ModalAction"));
const ChangeEmail = lazy(() => import("@/components/ChangeEmail"));
const SeatAssign = lazy(() => import("@/components/SeatAssign"));

export const metadata = {
  title: "Dashboard",
  openGraph: {
    title: "Dashboard",
  },
  twitter: {
    title: "Dashboard",
  },
};

export default function Dashboard() {
  const { userData } = useGlobalStore.getState();
  const user = getServerUser();

  const purchasedCourses = [...Object.keys(userData?.courses || {}), ...Object.keys(userData?.products || {}).map(courseByLegacySku)].filter(Boolean);

  return (
    <main className="container prose dark:prose-invert p-8">
      <div className="max-w-3xl mx-auto">
        {user ? (
          <>
            <h2 className="text-5xl text-center">
              <span className="text-green-500 font-display">
                <UserProgress />
              </span>
              XP
            </h2>
            <div className="mx-auto w-24 h-1 my-12 bg-gradient-to-r from-green-600 to-green-400 rounded-full"></div>
            <p className="text-xl">
              User ID: <span className="text-white font-bold">{user?.user_id}</span>
            </p>
            <p className="text-xl">
              PRO Status:
              <span className="font-display text-white">
                {" "}
                <span className={userData?.pro_status ?? "basic"}>{userData?.pro_status ?? "basic"}</span>
              </span>
            </p>
            <p className="text-xl">
              Account Email:{" "}
              <span className="text-white font-bold">
                {user?.email}
                <ChangeEmail>
                  <LoadingSpinner />
                </ChangeEmail>
              </span>
            </p>
            <p className="text-xl text-yellow-500">{userData?.expires && `Your PRO access expires ${relativeTime(userData?.expires)}`}</p>
            {!!purchasedCourses?.length && (
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
            )}
            <SignOutButton>Sign Out</SignOutButton>
            <IfEnterprise>
              <h2 className="text-5xl text-center">Enterprise Account</h2>
              <div className="mx-auto w-24 h-1 my-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
              <p>
                Use the form below to assign your seats. Each account will get a welcome email and have full access after signing in. You can always
                revoke access later.
              </p>
              <SeatAssign>
                <LoadingSpinner />
              </SeatAssign>
            </IfEnterprise>
            <h2 className="text-5xl text-center">Manage account</h2>
            <div className="mx-auto w-24 h-1 my-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
            <div className="my-6">
              <UserCharges>
                <LoadingSpinner />
              </UserCharges>
            </div>
            <div className="my-6">
              <user-invoices></user-invoices>
            </div>
            <div className="my-6">
              <update-address></update-address>
            </div>
            <div className="my-6">
              <update-payment></update-payment>
            </div>
            <div className="my-6">
              <manage-subscription></manage-subscription>
            </div>
            <h2 className="text-5xl text-center">FAQ</h2>
            <div className="mx-auto w-24 h-1 my-12 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"></div>
            <h3 className="font-sans font-bold">How do I get my T-shirt & Sticker?</h3>
            <p>
              You should have received an email with a link to a Google Form after upgrading. If not, you can access with the <code>/pro</code>{" "}
              command in Discord
            </p>
            <h3 className="font-sans font-bold">Can I customize my invoice or receipt details?</h3>
            <p>
              Yes, you can modify your name and address by clicking the
              <strong>change address</strong> button above. Once updated, it should be reflected on all invoices and receipts.
            </p>
            <h3 className="font-sans font-bold">How do I cancel my subscription?</h3>
            <p>
              Click the <strong>manage subscription</strong> button above. Your pro status will remain active until the billing period ends.
            </p>
            <h2 className="text-5xl text-center">Get in Touch</h2>
            <div className="mx-auto w-24 h-1 my-12 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full"></div>
            <p>Need help with your account? Reach via your favorite channel and we&apos;ll respond in 24 hours or less.</p>
            <ul>
              <li>
                Email <strong>hello@fireship.io</strong>
              </li>
              <li>
                Chat on <a href="https://discord.gg/fireship">Discord</a>
              </li>
              <li>
                DM via Twitter
                <a href="https://twitter.com/fireship_dev">@fireship_dev</a>
              </li>
            </ul>
            <h2 className="text-5xl text-center">Danger Zone</h2>
            <div className="mx-auto w-24 h-1 my-12 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
            <p>In accordance with GDPR, use this button to delete your account and wipe all data from our servers forever.</p>
            <DeleteAccount>
              <LoadingSpinner />
            </DeleteAccount>
          </>
        ) : (
          <>
            <p className="text-xl">You&apos;re signed out... This page is useless to you.</p>
            <ModalAction name="signin" type="open">
              <button className="btn btn-blue">Sign in Now</button>
            </ModalAction>
          </>
        )}
      </div>
    </main>
  );
}

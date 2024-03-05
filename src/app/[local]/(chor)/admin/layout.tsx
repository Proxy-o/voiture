import { redirect } from "next/navigation";
import { validateRequest } from "~/server/lucia/validateRequests";
import { api } from "~/trpc/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  const currentUser = await api.user.getOne.query(parseInt(user.id));
  if (!currentUser) {
    return redirect("/login");
  }
  if (currentUser.is_admin === false) {
    return redirect("/");
  }
  return <>{children}</>;
}

import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { validateRequest } from "~/server/lucia/validateRequests";
import { api } from "~/trpc/server";

export default async function Home() {
  noStore();
  const { user } = await validateRequest();
  if (!user) {
    redirect("/login");
  }
  const currentUser = await api.user.getOne.query(parseInt(user.id));
  if (!currentUser) {
    redirect("/login");
  }
  if (currentUser.is_admin) {
    redirect("/admin");
  }
  redirect("/user");
}

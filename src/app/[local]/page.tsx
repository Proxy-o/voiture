import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";

export default async function Home() {
  noStore();

  redirect("/user");
}

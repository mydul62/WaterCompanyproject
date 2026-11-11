import { redirect } from "next/navigation";

export default function LegacyQPailRedirectPage() {
  redirect("/products");
}

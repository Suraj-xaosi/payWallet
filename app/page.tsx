import { cookies } from "next/headers";
import { verifyToken } from "./lib/auth";
import { redirect } from "next/navigation";



export default async function Home() {
  const cookieStore = cookies();
     const token = (await cookieStore).get("auth_token")?.value;
     const user = token ? await verifyToken(token) : null;
     if (user) {
         redirect('/dashboard');
     }else{
      redirect('/login')
     }
}

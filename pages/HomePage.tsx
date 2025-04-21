

import { cookies } from 'next/headers';
import { verifyToken } from "../app/lib/auth";
import LogoutButton from '../components/logoutbutton';
import Notlogged from '../components/Notlogged';
import { Card } from '@/components/Card';
import Balance from '@/components/Balance';
import TransferM from '@/components/TransferM';
import StoreProvider from '@/components/StoreProvider';



export  default  async function  Home(){
    const cookieStore: ReturnType<typeof cookies> = cookies();
    const token = (await cookieStore).get('auth_token')?.value;


  
    const user = token ? verifyToken(token) : null;
    console.log("user is "+JSON.stringify(user));
    if (!user) {
      
      return <div> <Notlogged/> </div>
    }
    if(!user.balance){
      console.log("here is a problem");
    }
  
    return (
      <Homecard username={user.username} number={user.number}/>
    );
}

function Homecard({username,number}:{username:string,number:string}){
  return (
    <StoreProvider>
      <div>
      <div>
        <Card title="Payment  app">
          <h1>Welcome, {username}!</h1>
          <h1>phone number : {number}</h1>
          <div><Balance /></div>
          <div><LogoutButton/></div>
        </Card>
      </div>

      <div>
        <TransferM/>
      </div>
          
    </div>
    </StoreProvider>
  )
}
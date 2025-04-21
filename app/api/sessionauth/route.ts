import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { signToken } from "../../lib/auth";
import { prisma } from '@/prismaclient';

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("session auth body is "+JSON.stringify(body));
  const already  = body.already;
  const dummynumber=body.number
  const dummypassword=body.password
  
  if(already){
    try{
      console.log("login api called, going to check if user exists")
      const user = await prisma.user.findFirst({
          where: {
              number:dummynumber
          },
          include: { balance: true },
      })
      
      if(user){
          console.log("user found")
          if(user.password === dummypassword){
              console.log("password matched")
              const username=user.username;
              const number=user.number;
              const balance:string=String(user.balance?.amount);
              //return NextResponse.json(
              //    { user: { username: user.username, number: user.number ,balance:user.balance?.amount} },
               //   { status: 200 }
              //);
              const token = signToken({ username,number,balance });
              console.log("token is :" +JSON.stringify(token))
              const response = NextResponse.json({ success: true });
              response.cookies.set({
                name: 'auth_token',
                value: token,
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 24, // 1 day
              });

              return response;
          }
          return NextResponse.json({message:"wrong password"});
      }
      return NextResponse.json({message:"you dont have an account .go to signup page"},{status:400})
    
    }
    catch(e){
      console.log(e)
      return NextResponse.json({message:"something went wrong during loging in "},{status:500});
    }
  }
  else{
    const dummyname=body.username;
    console.log("going to check if user exists")
    const existingUser = await prisma.user.findFirst({
        where: {
            number:dummynumber
        }
    });
    if(existingUser){
        console.log("user already exists")
        return NextResponse.json({ message: "User already exists. Please log in." }, { status: 400 });
    }
    try{
        console.log("going to create user")
        const user=await prisma.user.create({
            data: {
                username:dummyname,
                password:dummypassword,
                number:dummynumber,
                balance:{
                    create:{
                        amount:2000,
                    },
                },
                
            },
            include: {
                balance: true, // To return the balance data along with the user
            },
        })
        console.log("user created successfully")
        //console.log(user)
        //return NextResponse.json({
        //    user:{name:user.username,number:user.number,balance:user.balance?.amount}, 
        //    message:"user created successfully"
        //},{status:201})
        const username=user.username;
        const number=user.number;
        const balance:string=String(user.balance?.amount);
        const token = signToken({ username,number,balance });
        console.log("token is :" +JSON.stringify(token))
        const response = NextResponse.json({ success: true });
        response.cookies.set({
          name: 'auth_token',
          value: token,
          httpOnly: true,
          path: '/',
          maxAge: 60 * 60 * 24, // 1 day
        });

        return response;

    }catch(e){
        console.error("Signup error:", e);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
  }
  

}

  // Dummy check — replace with real DB check
  
    

  //return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });

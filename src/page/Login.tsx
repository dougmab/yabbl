import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import LoginForm from "@/components/auth/LoginForm.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import RegisterForm from "@/components/auth/RegisterForm.tsx";

const Login = () => {
  return (
    <div className="flex justify-center m-4">
      <Tabs defaultValue="login" className="w-[500px]">
        <TabsList className="w-full">
          <TabsTrigger value="login" className="w-full">Login</TabsTrigger>
          <TabsTrigger value="register" className="w-full">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Welcome Back!</CardTitle>
              <CardDescription>Log in and and continue chatting with your friends.</CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm/>
            </CardContent>
            <CardFooter>
              <a href="#" className="text-blue-500">Forgot password?</a>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Join Us!</CardTitle>
              <CardDescription>Register and connect with others.</CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm/>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default Login

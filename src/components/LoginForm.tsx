import {useForm} from "react-hook-form";
import {z} from "zod";
import {loginSchema} from "@/schema/authSchemas.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormField} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import SimpleFormItem from "@/components/SimpleFormItem.tsx";
import {Button} from "@/components/ui/button.tsx";

const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    }
  })

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    alert(JSON.stringify(data))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="username"
          render={({field}) => (
            <SimpleFormItem label="Username">
              <Input placeholder="Your username" {...field} />
            </SimpleFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <SimpleFormItem label="Password">
              <Input type="password" placeholder="Your password" {...field} />
            </SimpleFormItem>
          )}
        />
        <Button type="submit">Login</Button>
      </form>
    </Form>
  )
}

export default LoginForm

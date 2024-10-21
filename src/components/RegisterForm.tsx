import {registerSchema} from "@/schema/authSchemas.ts";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormField} from "@/components/ui/form.tsx";
import SimpleFormItem from "@/components/SimpleFormItem.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

const RegisterForm = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  })

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    alert(JSON.stringify(data))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="username"
          render={({field}) => (
            <SimpleFormItem  label="Username" description="Enter a unique username.">
              <Input placeholder="Your username" {...field} />
            </SimpleFormItem>
          )}
          />

        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <SimpleFormItem  label="Email" description="Enter a valid email address (e.g., john.doe@example.com).">
              <Input type="email" placeholder="Your email address" {...field} />
            </SimpleFormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <SimpleFormItem  label="Password" description="Create a password at least 8 characters long and containing at least one uppercase letter, one lowercase letter, and one number.">
              <Input type="password" placeholder="Create your password" {...field} />
            </SimpleFormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({field}) => (
            <SimpleFormItem  label="Confirm Password" description="Re-enter your password.">
              <Input type="password" placeholder="Confirm your password" {...field} />
            </SimpleFormItem>
          )}
        />

        <Button type="submit">Register</Button>
      </form>
    </Form>
  )
}
export default RegisterForm;

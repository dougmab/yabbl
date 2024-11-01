import {registerSchema} from '@/schema/authSchemas.ts';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {Form, FormField} from '@/components/ui/form.tsx';
import SimpleFormItem from '@/components/SimpleFormItem.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Button} from '@/components/ui/button.tsx';
import {useAuth} from '@/context/auth-provider.tsx';

const RegisterForm = () => {
  const {register, isLoading} = useAuth();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      handle: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    void register(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="handle"
          render={({field}) => (
            <SimpleFormItem label="Handle" description="Enter a unique handle, this will be used as your identifier.">
              <div className="flex items-center rounded-md border border-input bg-accent">
                <span className="px-2 text-opacity-5">
                  @
                </span>
                <Input className="border-none rounded-l-none bg-background" placeholder="your_handle" {...field} />
              </div>
            </SimpleFormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <SimpleFormItem label="Email" description="Enter a valid email address (e.g., john.doe@example.com).">
              <Input type="email" placeholder="Your email address" {...field} />
            </SimpleFormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <SimpleFormItem label="Password"
                            description="Create a password at least 8 characters long and containing at least one uppercase letter, one lowercase letter, and one number.">
              <Input type="password" placeholder="Create your password" {...field} />
            </SimpleFormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({field}) => (
            <SimpleFormItem label="Confirm Password" description="Re-enter your password.">
              <Input type="password" placeholder="Confirm your password" {...field} />
            </SimpleFormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>Register</Button>
      </form>
    </Form>
  );
};
export default RegisterForm;

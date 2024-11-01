import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {loginSchema} from '@/schema/authSchemas.ts';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormField} from '@/components/ui/form.tsx';
import {Input} from '@/components/ui/input.tsx';
import SimpleFormItem from '@/components/SimpleFormItem.tsx';
import {Button} from '@/components/ui/button.tsx';
import {useAuth} from '@/context/auth-provider.tsx';

const LoginForm = () => {
  const {signIn, isLoading} = useAuth();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    void signIn(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <SimpleFormItem label="Email">
              <Input type="email" placeholder="Your email" {...field} />
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
        <Button type="submit" disabled={isLoading}>Login</Button>
      </form>
    </Form>
  );
};

export default LoginForm;

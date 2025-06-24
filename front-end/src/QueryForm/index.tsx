import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const formSchema = z.object({
	firstName: z.string().min(1, { message: 'This field is required' }),
	lastName: z.string().min(1, { message: 'This field is required' }),
	email: z.string().min(1, { message: 'Please enter a valid email address' }).email('Please enter a valid email address'),
	queryType: z.string().min(1, { message: 'Please select a query type' }),
	message: z.string().min(1, { message: 'This field is required' }),
	checkbox: z.boolean().refine((val) => val === true, {
		message: 'To submit this form, please consent to being contacted',
	}),
});

export default function QueryForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			queryType: '',
			message: '',
			checkbox: false,
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<Form {...form}>
			<p>Contact Us</p>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name='firstName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								First Name <span>*</span>
							</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				></FormField>

				<FormField
					control={form.control}
					name='lastName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Last Name <span>*</span>
							</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				></FormField>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Email Address <span>*</span>
							</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				></FormField>

				<FormField
					control={form.control}
					name='message'
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Message <span>*</span>
							</FormLabel>
							<FormControl>
								<Textarea className='resize-none' {...field} />
							</FormControl>
						</FormItem>
					)}
				></FormField>

				<Button>Submit</Button>
			</form>
		</Form>
	);
}

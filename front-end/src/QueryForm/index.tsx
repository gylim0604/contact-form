import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const formSchema = z.object({
	firstName: z.string().min(1, { message: 'This field is required' }),
	lastName: z.string().min(1, { message: 'This field is required' }),
	email: z.string().min(1, { message: 'Please enter a valid email address' }),
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
	return (
		<Form {...form}>
			<p>Contact Us</p>
			<form>
				<FormField
					control={form.control}
					name='firstName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>First Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
						</FormItem>
					)}
				></FormField>
			</form>
		</Form>
	);
}

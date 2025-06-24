import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
			<h3>Contact Us</h3>
			<form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				{/* First Name */}
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
				/>
				{/* Last Name */}
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
				{/* Email */}
				<div className='md:col-span-2'>
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
					/>
				</div>
				{/* Query Type */}
				<div className='md:col-span-2'>
					<FormField
						control={form.control}
						name='queryType'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Query Type <span>*</span>
								</FormLabel>
								<FormControl>
									<RadioGroup onValueChange={field.onChange}>
										<FormItem>
											<FormControl>
												<RadioGroupItem value='general' />
											</FormControl>
											<FormLabel>General Enquiry</FormLabel>
										</FormItem>
										<FormItem>
											<FormControl>
												<RadioGroupItem value='support'></RadioGroupItem>
											</FormControl>
											<FormLabel>Support Request</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
								<FormMessage data-testid='queryType-error' />
							</FormItem>
						)}
					/>
				</div>
				{/* Message */}

				<div className='md:col-span-2'>
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
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				{/* Checkbox */}
				<div className='md:col-span-2'>
					<FormField
						control={form.control}
						name='checkbox'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Checkbox checked={field.value} onCheckedChange={field.onChange} id='consent-checkbox' />
								</FormControl>
								<FormLabel htmlFor='consent-checkbox'>
									I consent to being contacted by the team <span>*</span>
								</FormLabel>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='md:col-span-2'>
					<Button>Submit</Button>
				</div>
			</form>
		</Form>
	);
}

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
			<h3 className='text-xl font-semibold text-left mb-6'>Contact Us</h3>
			<form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8'>
				{/* First Name */}
				<FormField
					control={form.control}
					name='firstName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								First Name <span className='text-green-600'>*</span>
							</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage className='text-left' />
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
								Last Name <span className='text-green-600'>*</span>
							</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage className='text-left' />
						</FormItem>
					)}
				></FormField>
				{/* Email */}
				<div className='sm:col-span-2'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Email Address <span className='text-green-600'>*</span>
								</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage className='text-left' />
							</FormItem>
						)}
					/>
				</div>
				{/* Query Type */}
				<div className='sm:col-span-2'>
					<FormField
						control={form.control}
						name='queryType'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Query Type <span className='text-green-600'>*</span>
								</FormLabel>
								<FormControl>
									<RadioGroup onValueChange={field.onChange} className='flex gap-4'>
										<FormItem className='flex-1 flex items-center border-1 rounded px-4 py-2'>
											<FormControl>
												<RadioGroupItem value='general' />
											</FormControl>
											<FormLabel>General Enquiry</FormLabel>
										</FormItem>
										<FormItem className='flex-1 flex items-center border-1 rounded px-4 py-2'>
											<FormControl>
												<RadioGroupItem value='support'></RadioGroupItem>
											</FormControl>
											<FormLabel>Support Request</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
								<FormMessage className='text-left' data-testid='queryType-error' />
							</FormItem>
						)}
					/>
				</div>
				{/* Message */}

				<div className='sm:col-span-2'>
					<FormField
						control={form.control}
						name='message'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Message <span className='text-green-600'>*</span>
								</FormLabel>
								<FormControl>
									<Textarea className='resize-none' {...field} />
								</FormControl>
								<FormMessage className='text-left' />
							</FormItem>
						)}
					/>
				</div>
				{/* Checkbox */}
				<div className='sm:col-span-2'>
					<FormField
						control={form.control}
						name='checkbox'
						render={({ field }) => (
							<FormItem>
								<div className='flex gap-2'>
									<FormControl>
										<Checkbox checked={field.value} onCheckedChange={field.onChange} id='consent-checkbox' />
									</FormControl>
									<FormLabel htmlFor='consent-checkbox'>
										I consent to being contacted by the team <span className='text-green-600'>*</span>
									</FormLabel>
								</div>
								<FormMessage className='text-left' />
							</FormItem>
						)}
					/>
				</div>
				<div className='sm:col-span-2'>
					<Button className='w-full bg-teal-700'>Submit</Button>
				</div>
			</form>
		</Form>
	);
}

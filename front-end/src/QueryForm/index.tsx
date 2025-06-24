import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
		showToast();
	}

	function showToast() {
		toast.dismiss();
		toast(
			<div>
				<p className='flex gap-2 mb-2 items-center font-bold'>
					<CircleCheck size={16} />
					Message Sent!
				</p>
				<p>Thanks for completing the form. We'll be in touch soon!</p>
			</div>,
			{
				duration: Infinity,
				style: {
					background: 'oklch(37.8% 0.077 168.94)',
					color: 'white',
					border: 'none',
				},
			}
		);
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
							<FormLabel className='text-neutral-600 data-[error=true]:text-neutral-600 mb-1'>
								First Name <span className='text-green-600'>*</span>
							</FormLabel>
							<FormControl>
								<Input className='border-neutral-400 rounded-sm hover:cursor-pointer hover:border-teal-600 focus-visible:ring-0 focus-visible:border-teal-600' {...field} />
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
							<FormLabel className='text-neutral-600 data-[error=true]:text-neutral-600 mb-1'>
								Last Name <span className='text-green-600'>*</span>
							</FormLabel>
							<FormControl>
								<Input className='border-neutral-400 rounded-sm hover:cursor-pointer hover:border-teal-600 focus-visible:ring-0 focus-visible:border-teal-600' {...field} />
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
								<FormLabel className='text-neutral-600 data-[error=true]:text-neutral-600 mb-1'>
									Email Address <span className='text-green-600'>*</span>
								</FormLabel>
								<FormControl>
									<Input className='border-neutral-400 rounded-sm hover:cursor-pointer hover:border-teal-600 focus-visible:ring-0 focus-visible:border-teal-600' {...field} />
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
								<FormLabel className='text-neutral-600 data-[error=true]:text-neutral-600 mb-2'>
									Query Type <span className='text-green-600'>*</span>
								</FormLabel>
								<FormControl>
									<RadioGroup onValueChange={field.onChange} className='flex gap-4'>
										<FormItem className='flex-1'>
											<FormLabel htmlFor='query-general' className={cn(' flex items-center rounded-sm px-4 py-3 border text-neutral-600 data-[error=true]:text-neutral-600 hover:cursor-pointer', field.value === 'general' ? 'border-teal-600 bg-teal-50' : 'border-neutral-400')}>
												<FormControl className='border-neutral-300 aria-invalid:ring-neutral-300 aria-invalid:border-neutral-300'>
													<RadioGroupItem id='query-general' value='general' className='hover:cursor-pointer [&_svg]:fill-teal-600 data-[state=checked]:border-teal-600 focus-visible:ring-0'></RadioGroupItem>
												</FormControl>
												General Enquiry
											</FormLabel>
										</FormItem>
										<FormItem className='flex-1'>
											<FormLabel htmlFor='query-support' className={cn(' flex items-center rounded-sm px-4 py-3 border text-neutral-600 data-[error=true]:text-neutral-600 hover:cursor-pointer', field.value === 'support' ? 'border-teal-600 bg-teal-50' : 'border-neutral-400')}>
												<FormControl className='border-neutral-300 aria-invalid:ring-neutral-300 aria-invalid:border-neutral-300'>
													<RadioGroupItem id='query-support' value='support' className='hover:cursor-pointer [&_svg]:fill-teal-600 data-[state=checked]:border-teal-600 focus-visible:ring-0' />
												</FormControl>
												Support Request
											</FormLabel>
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
								<FormLabel className='text-neutral-600 data-[error=true]:text-neutral-600 mb-1'>
									Message <span className='text-green-600'>*</span>
								</FormLabel>
								<FormControl>
									<Textarea className='resize-none h-24 border-neutral-400 rounded-sm hover:cursor-pointer hover:border-teal-600 focus-visible:ring-0' {...field} />
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
								<div className='flex gap-4'>
									<FormControl>
										<Checkbox className='border-neutral-300 border-2 rounded-none aria-invalid:ring-neutral-300 aria-invalid:border-neutral-300 focus-visible:ring-0 focus-visible:border-teal-600 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600' checked={field.value} onCheckedChange={field.onChange} id='consent-checkbox' />
									</FormControl>
									<FormLabel className='text-neutral-600 data-[error=true]:text-neutral-600' htmlFor='consent-checkbox'>
										I consent to being contacted by the team <span className='text-green-600'>*</span>
									</FormLabel>
								</div>
								<FormMessage className='text-left' />
							</FormItem>
						)}
					/>
				</div>
				<div className='sm:col-span-2'>
					<Button className='w-full bg-teal-700 hover:cursor-pointer hover:bg-teal-900'>Submit</Button>
				</div>
			</form>
		</Form>
	);
}

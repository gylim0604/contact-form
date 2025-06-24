import { z } from 'zod';

export const formSchema = z.object({
	firstName: z.string().min(1, { message: 'This field is required' }),
	lastName: z.string().min(1, { message: 'This field is required' }),
	email: z.string().min(1, { message: 'Please enter a valid email address' }),
	queryType: z.string().min(1, { message: 'Please select a query type' }),
	message: z.string().min(1, { message: 'This field is required' }),
	checkbox: z.literal(true, {
		errorMap: () => ({ message: 'To submit this form, please consent to being contacted' }),
	}),
});

export function QueryForm() {
	return (
		<>
			<p>Contact Us</p>
		</>
	);
}

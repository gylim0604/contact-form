import { z } from 'zod';

export const formSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: z.string().min(1),
	queryType: z.string().min(1),
	message: z.string().min(1),
	checkbox: z.boolean(),
});

export function QueryForm() {
	return (
		<>
			<p>Contact Us</p>
		</>
	);
}

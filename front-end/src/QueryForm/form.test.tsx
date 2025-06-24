import { describe, expect, it } from 'vitest';
import { formSchema } from '.';

describe('form schema', () => {
	it('passes with valid input', () => {
		const result = formSchema.safeParse({
			firstName: 'John',
			lastName: 'Doe',
			email: 'johndoe@example.com',
			queryType: 'general',
			message: 'Lorem ipsum',
			checkbox: true,
		});
		expect(result.success).toBe(true);
	});
});

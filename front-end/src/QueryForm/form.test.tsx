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

	it('fails with empty fields', () => {
		const result = formSchema.safeParse({
			firstName: '',
			lastName: '',
			email: '',
			queryType: '',
			message: '',
			checkbox: false,
		});
		expect(result.success).toBe(false);
		if (!result.success) {
			const errors = result.error.format();
			expect(errors.firstName?._errors[0]).toEqual('This field is required');
			expect(errors.lastName?._errors[0]).toEqual('This field is required');
			expect(errors.email?._errors[0]).toEqual('Please enter a valid email address');
			expect(errors.queryType?._errors[0]).toEqual('Please select a query type');
			expect(errors.message?._errors[0]).toEqual('This field is required');
			expect(errors.checkbox?._errors[0]).toEqual('To submit this form, please consent to being contacted');
		}
	});
});

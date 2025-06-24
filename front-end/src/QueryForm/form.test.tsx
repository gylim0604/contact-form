import { beforeEach, describe, expect, it } from 'vitest';
import { formSchema } from '.';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import QueryForm from '.';
import userEvent from '@testing-library/user-event';
import { email } from 'zod/v4-mini';

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

describe('form should render', () => {
	beforeEach(() => {
		render(<QueryForm />);
	});

	it('render with first name field', () => {
		const firstNameInput = screen.getByLabelText(/first name/i);
		expect(firstNameInput).toBeInTheDocument();
		expect(firstNameInput).toHaveAttribute('name', 'firstName');
	});

	it('throw error when first name submit with empty value', async () => {
		const submitButton = screen.getByRole('button', { name: /submit/i });

		await userEvent.click(submitButton);
		const input = screen.getByLabelText(/first name/i);
		expect(input).toHaveAttribute('aria-invalid', 'true');
		expect(input).toHaveAccessibleDescription(/This field is required/i);
	});

	it('render with last name field', () => {
		const lastNameInput = screen.getByLabelText(/Last Name/i);
		expect(lastNameInput).toBeInTheDocument();
		expect(lastNameInput).toHaveAttribute('name', 'lastName');
	});

	it('throw error when last name submit with empty value', async () => {
		const submitButton = screen.getByRole('button', { name: /submit/i });

		await userEvent.click(submitButton);
		const input = screen.getByLabelText(/last name/i);
		expect(input).toHaveAttribute('aria-invalid', 'true');
		expect(input).toHaveAccessibleDescription(/This field is required/i);
	});

	it('render with email address', () => {
		const lastNameInput = screen.getByLabelText(/Email Address/i);
		expect(lastNameInput).toBeInTheDocument();
		expect(lastNameInput).toHaveAttribute('name', 'email');
	});

	it('throw error when email address submit with empty value', async () => {
		const submitButton = screen.getByRole('button', { name: /submit/i });

		await userEvent.click(submitButton);
		const input = screen.getByLabelText(/Email Address/i);
		expect(input).toHaveAttribute('aria-invalid', 'true');
		expect(input).toHaveAccessibleDescription(/Please enter a valid email address/i);
	});

	it('throw error when email address submit with invalid value', async () => {
		const emailInput = screen.getByLabelText(/email/i);
		const submitButton = screen.getByRole('button', { name: /submit/i });

		await userEvent.type(emailInput, 'not-an-email');

		await userEvent.click(submitButton);

		expect(emailInput).toHaveAttribute('aria-invalid', 'true');
		expect(emailInput).toHaveAccessibleDescription(/Please enter a valid email address/i);
	});

	it('render with message', () => {
		const input = screen.getByLabelText(/Message/i);
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute('name', 'message');
	});
});

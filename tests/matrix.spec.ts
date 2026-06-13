import { test, expect } from '@playwright/test'

test.describe('Matrix Calculator Automation Suite', () => {

	test.beforeEach(async ({ page }) => {
		await page.goto('/')
	})


	test('should verify 3x3 default dimension on load', async ({ page }) => {
		const inputN = page.locator('input[type="number"]').first()
		const inputM = page.locator('input[type="number"]').nth(1)


		await expect(inputN).toHaveValue('3')
		await expect(inputM).toHaveValue('3')
	})

	test('should apply focus group styling on labels', async ({ page }) => {
		const inputN = page.locator('input[type="number"]').first()
		const labelN = page.locator('span:has-text("n:")')

		await inputN.focus()
		await expect(inputN).toBeFocused()
		await expect(labelN).toHaveClass(/group-focus-within:text-gruv-fg1/)
	})

	test('should clear previous result calculations on cell value edit', async ({ page }) => {
		await page.selectOption('#operation-select', 'transpose');

		await page.getByRole('button', { name: '=' }).click();

		const resultHeading = page.getByRole('heading', { name: 'Result' });
		await expect(resultHeading).toBeVisible();

		const firstCell = page.getByPlaceholder('0').first()
		await firstCell.fill('5');

		await expect(resultHeading).not.toBeVisible();
	})

	test('should swap function on pressing swap', async ({ page }) => {
		await page.selectOption('#operation-select', 'add');

		const firstCellA = page.locator('div:has(> h3:text("A"))').getByPlaceholder('0').first()
		const firstCellB = page.locator('div:has(> h3:text("B"))').getByPlaceholder('0').first()

		await firstCellA.fill('5');
		await firstCellB.fill('10')

		await expect(firstCellA).toHaveValue('5')
		await expect(firstCellB).toHaveValue('10')

		await page.getByRole('button', { name: '⇄' }).click();

		await expect(firstCellB).toHaveValue('5')
		await expect(firstCellA).toHaveValue('10')


	})
})

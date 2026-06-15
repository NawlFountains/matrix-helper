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

	test('should only accept number for matrix element', async ({ page }) => {
		await page.selectOption('#operation-select', 'add');

		const firstCell = page.locator('div:has(> h3:text("A"))').getByPlaceholder('0').first()
		const secondCell = page.locator('div:has(> h3:text("A"))').getByPlaceholder('0').nth(1)

		await firstCell.fill('ab');
		await secondCell.fill('2')

		await expect(firstCell).toHaveValue('')
		await expect(secondCell).toHaveValue('2')


		await firstCell.fill('1');

		await expect(firstCell).toHaveValue('1')
		await expect(secondCell).toHaveValue('2')

		await firstCell.fill('-3');
		await secondCell.fill('')

		await expect(firstCell).toHaveValue('-3')
		await expect(secondCell).toHaveValue('')

	})

	test('should not show additional function when selecting single operations', async ({ page }) => {
		await page.selectOption('#operation-select', 'transpose')
		const matrixB = page.locator('div:has(> h3:text("B"))')

		await expect(matrixB).not.toBeVisible()

		await page.selectOption('#operation-select', 'determinant')
		await expect(matrixB).not.toBeVisible()
	})

	test('should only show additional function when selected binary operations', async ({ page }) => {
		const matrixB = page.locator('div:has(> h3:text("B"))')
		await expect(matrixB).not.toBeVisible()

		await page.selectOption('#operation-select', 'add')
		await expect(matrixB).toBeVisible()

		await page.selectOption('#operation-select', 'transpose')
		await expect(matrixB).not.toBeVisible()

		await page.selectOption('#operation-select', 'subtract')
		await expect(matrixB).toBeVisible()

		await page.selectOption('#operation-select', 'multiply')
		await expect(matrixB).toBeVisible()
	})

	test('should keep elements when removing/adding rows', async ({ page }) => {
		const firstCellA = page.locator('div:has(> h3:text("A"))').getByPlaceholder('0').first()
		const secondCellA = page.locator('div:has(> h3:text("A"))').getByPlaceholder('0').nth(1)
		const thirdCellA = page.locator('div:has(> h3:text("A"))').getByPlaceholder('0').nth(2)

		const fourthCellA = page.locator('div:has(> h3:text("A"))').getByPlaceholder('0').nth(3) // 2nd row

		const removeRowBtn = page.getByTestId('remove-row-btn')

		await firstCellA.fill('1')
		await secondCellA.fill('2')
		await thirdCellA.fill('3')
		await fourthCellA.fill('4')

		await expect(firstCellA).toHaveValue('1')
		await expect(secondCellA).toHaveValue('2')
		await expect(thirdCellA).toHaveValue('3')
		await expect(fourthCellA).toHaveValue('4')

		await page.getByTestId('add-row-btn').click();

		await expect(firstCellA).toHaveValue('1')
		await expect(secondCellA).toHaveValue('2')
		await expect(thirdCellA).toHaveValue('3')
		await expect(fourthCellA).toHaveValue('4')

		await removeRowBtn.click();

		await expect(firstCellA).toHaveValue('1')
		await expect(secondCellA).toHaveValue('2')
		await expect(thirdCellA).toHaveValue('3')
		await expect(fourthCellA).toHaveValue('4')

		await removeRowBtn.click();

		await expect(firstCellA).toHaveValue('1')
		await expect(secondCellA).toHaveValue('2')
		await expect(thirdCellA).toHaveValue('3')
		await expect(fourthCellA).toHaveValue('4')

		await removeRowBtn.click();

		await expect(firstCellA).toHaveValue('1')
		await expect(secondCellA).toHaveValue('2')
		await expect(thirdCellA).toHaveValue('3')
		await expect(fourthCellA).not.toBeVisible()

		await page.getByTestId('add-row-btn').click();

		await expect(firstCellA).toHaveValue('1')
		await expect(secondCellA).toHaveValue('2')
		await expect(thirdCellA).toHaveValue('3')
		await expect(fourthCellA).toHaveValue('')
	})

	test('should keep elements when removing/adding cols', async ({ page }) => {
		const firstCellA = page.locator('div:has(> h3:text("A"))').getByPlaceholder('0').first()
		const secondCellA = page.locator('div:has(> h3:text("A"))').getByPlaceholder('0').nth(1)
		const thirdCellA = page.locator('div:has(> h3:text("A"))').getByPlaceholder('0').nth(2)

		const fourthCellA = page.locator('div:has(> h3:text("A"))').getByPlaceholder('0').nth(3) // 2nd row

		await firstCellA.fill('1')
		await secondCellA.fill('2')
		await thirdCellA.fill('3')
		await fourthCellA.fill('4')

		// The nth element will move as the matrix grow or shrinks
		// eg. fourth is [1][0] but if one more col is added then the fourth
		//     it's [0][3]

		await expect(firstCellA).toHaveValue('1')
		await expect(secondCellA).toHaveValue('2')
		await expect(thirdCellA).toHaveValue('3')
		await expect(fourthCellA).toHaveValue('4')

		await page.getByTestId('add-col-btn').click();

		await expect(firstCellA).toHaveValue('1')
		await expect(secondCellA).toHaveValue('2')
		await expect(thirdCellA).toHaveValue('3')
		await expect(fourthCellA).toHaveValue('')

		await page.getByTestId('remove-col-btn').click();

		await expect(firstCellA).toHaveValue('1')
		await expect(secondCellA).toHaveValue('2')
		await expect(thirdCellA).toHaveValue('3')
		await expect(fourthCellA).toHaveValue('4')

		await page.getByTestId('remove-col-btn').click();

		await expect(firstCellA).toHaveValue('1')
		await expect(secondCellA).toHaveValue('2')
		await expect(thirdCellA).toHaveValue('4')
		await expect(fourthCellA).toHaveValue('')

		await page.getByTestId('remove-col-btn').click();

		await expect(firstCellA).toHaveValue('1')
		await expect(secondCellA).toHaveValue('4')
		await expect(thirdCellA).toHaveValue('')
		await expect(fourthCellA).not.toBeVisible()
	})

	test('should not allow to remove rows for 1 x m matrix', async ({ page }) => {
		const firstCell = page.locator('div:has(> h3:text("A"))').getByPlaceholder('0').first()
		await firstCell.fill('5');

		const removeRowBtn = page.getByTestId('remove-row-btn')

		await expect(firstCell).toHaveValue('5')
		await removeRowBtn.click() // 1x2
		await expect(firstCell).toHaveValue('5')
		await removeRowBtn.click() // 1x1
		await expect(firstCell).toHaveValue('5')
		await removeRowBtn.click() // 1x1
		await expect(firstCell).toHaveValue('5')
		await removeRowBtn.click() // 1x1
		await expect(firstCell).toHaveValue('5')

	})

	test('should not allow to remove cols for n x 1 matrix', async ({ page }) => {
		const firstCell = page.locator('div:has(> h3:text("A"))').getByPlaceholder('0').first()
		await firstCell.fill('5');

		const removeColBtn = page.getByTestId('remove-col-btn')

		await expect(firstCell).toHaveValue('5')
		await removeColBtn.click() // 2x1
		await expect(firstCell).toHaveValue('5')
		await removeColBtn.click() // 1x1
		await expect(firstCell).toHaveValue('5')
		await removeColBtn.click() // 1x1
		await expect(firstCell).toHaveValue('5')
		await removeColBtn.click() // 1x1
		await expect(firstCell).toHaveValue('5')

	})



	test('should display steps when clicking result button', async ({ page }) => {
		await page.selectOption('#operation-select', 'add');

		const firstCellA = page.locator('div:has(> h3:text("A"))').getByPlaceholder('0').first()
		const firstCellB = page.locator('div:has(> h3:text("B"))').getByPlaceholder('0').first()

		const resultSection = page.locator('div:has(> h3:text("Step by step"))')

		const resultBtn = page.getByRole('button', { name: '=' })

		await firstCellA.fill('5');
		await firstCellB.fill('10')

		await expect(resultSection).not.toBeVisible()

		await resultBtn.click();
		await expect(resultSection).toBeVisible()

		await page.selectOption('#operation-select', 'add');
		await expect(resultSection).not.toBeVisible()

		await resultBtn.click();
		await expect(resultSection).toBeVisible()

		await page.selectOption('#operation-select', 'determinant');
		await expect(resultSection).not.toBeVisible()

		await resultBtn.click();
		await expect(resultSection).toBeVisible()
	})
})

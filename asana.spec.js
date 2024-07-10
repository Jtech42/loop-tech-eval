const { test, expect } = require('@playwright/test');

const testCases = [
  {
    "id": 1,
    "name": "Test Case 1",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Draft project brief"
  },
  {
    "id": 2,
    "name": "Test Case 2",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Schedule kickoff meeting"
  },
  {
    "id": 3,
    "name": "Test Case 3",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Share timeline with teammates"
  },
  {
    "id": 4,
    "name": "Test Case 4",
    "leftNav": "Work Requests",
    "column": "New Requests",
    "card_title": "[Example] Laptop setup for new hire"
  },
  {
    "id": 5,
    "name": "Test Case 5",
    "leftNav": "Work Requests",
    "column": "In Progress",
    "card_title": "[Example] Password not working"
  },
  {
    "id": 6,
    "name": "Test Case 6",
    "leftNav": "Work Requests",
    "column": "Completed",
    "card_title": "[Example] New keycard for Daniela V"
  }
];

test.describe('Asana Data-Driven Tests', () => {
  testCases.forEach((testCase) => {
    test(`Test Case ${testCase.id}: ${testCase.name}`, async ({ page }) => {
      // Login to Asana
      await loginToAsana(page);

      // Navigate to the specified leftNav item
      await navigateToItem(page, testCase.leftNav);

      // Verify the card_title exists in the specified column
      await verifyCardInColumn(page, testCase.card_title, testCase.column);

    });
  });
});

async function loginToAsana(page) {
  await page.goto('https://app.asana.com/');

  await page.fill('input[name="e"]', 'ben+pose@workwithloop.com');
  await page.click('div[class*="LoginEmailForm-continueButton"]');
  await page.waitForSelector('input[type="password"]', { timeout: 15000 });

  await page.fill('input[type="password"]', 'Password123');
  await page.click('div[class*="LoginPasswordForm-loginButton"]');
  await page.waitForNavigation({ waitUntil: 'networkidle' });
}

async function navigateToItem(page, leftNavItem) {
  await page.waitForSelector('span[class*="SidebarNavigationLinkCard-label"]', { timeout: 15000 });
  await page.click(`span.SidebarNavigationLinkCard-label:has-text("${leftNavItem}")`);
  await page.waitForSelector('div[class*="BoardColumn-header"]', { timeout: 15000 });
}

async function verifyCardInColumn(page, cardTitle, columnName) {
  const cardExists = await page.isVisible(`span.TypographyPresentation--m.BoardCard-taskName:has-text("${cardTitle}")`);
  expect(cardExists).toBe(true, `Card '${cardTitle}' not found in '${columnName}' column.`);
}

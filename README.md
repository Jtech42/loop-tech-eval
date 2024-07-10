# loop-tech-eval
A technical evaluation for Loop.


Assuming node and playwright are both installed:

Get dependencies
```
npm install
```

Run the Data Driven tests using:
```
npx playwright test "asana.spec.js"
```

To (briefly) see the browser and tests run with the --headed flag

```
npx playwright test "asana.spec.js" --headed
```

Challenges and Solutions: Generally if a piece of UI is important enough to automate, then it should also be important enough to have accessibility ids or test-ids, most of the text elements here did not. The work around is to use other identifying information and the text. That works for now, but will be less stable in the long run than prebuilt ids.

Recommendations: Abstract the elements to page object files seperate from the test, and import the exact element ids from the actual apps accessibillity or test ids. This will improve maintence time when elements change and help with adoption by the app team.

Abstract sensitive data used to login like passwords to a design that can be hidden using the preferred methods of the operations team (EX AWS Parameter Store) to avoid having passwords in plaintext.

Abstract playwright and its functions to its own class per single responsibility principal. Avoiding creating a playwright monolith where your business test cases are described by playwright commands that only work with playwright rather than automation test case logic that works with any UI framework. 
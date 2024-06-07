## Product scraping demo

1. Entry point is src/index.ts where we initialize the storage type based on env variables. In the future we can modify and load config object as parameter for easier testing

2. We create a Product controller which we use for this demo

3. Start scraping!

4. Scraping service scrapes the url using scraping bee, extracts the imgs and body from the html and prompts chatgpt with default instruction for this demo.

5. Product will be validated before being saved to storage

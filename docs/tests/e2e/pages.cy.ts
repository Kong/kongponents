describe('Docs Pages match snapshots', () => {
  const docsPages = Cypress.env('docsPages')

  // Loop over the docs pages and ensure they match the snapshot
  docsPages.forEach((page: string) => {
    const testName = page.replace(/^\/components\//, '').replace(/\//g, '-')
    describe(testName, () => {
      it(`should display the ${page.split('/').pop()}.md page and match the snapshot`, () => {
        // The kongponents.konghq.com URL
        cy.visit(`${page}.html`)

        cy.matchImageSnapshot()
      })
    })
  })
})

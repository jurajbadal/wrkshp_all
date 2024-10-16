describe('BROKEN_LINKS', function() {

   it('Broken Links', function() {    
      const testUrl = 'https://www.tesena.com/tesena-fest-2024/a-189/'
      cy.viewport(1480, 1477)
      cy.visit(testUrl)
      
      

      let brokenLinks = 0
      let activeLinks = 0
      let brokenLinksList = []

      cy.get('a').each(($link, index) => {
          const href = $link.attr('href')
          if (href) {
              cy.request({ url: href, failOnStatusCode: false }).then((response) => {
                  if (response.status >= 400) {

                      cy.log(`**** link  ${index + 1} is Broken Link *** ${href} `)
                      brokenLinks++
                      brokenLinksList.push(href)
                  }
                  else {
                      cy.log(`*** link  ${index + 1} is Active Link *** ${href}`)
                      activeLinks++

                  }

              })


          }

      }).then(($links) => {

          const totalLinks = $links.length
          cy.log(`**** total links **** ${totalLinks}`)
          cy.log(`**** broken links **** ${brokenLinks}`)
          cy.log(`**** active links **** ${activeLinks}`)
          cy.log('**** List of broken links ****')
          brokenLinksList.forEach(link => cy.log(link))

          // Create and download text file with broken links
          const content = `Tested URL: ${testUrl}\n\n` +
                          `Total Links: ${totalLinks}\n` +
                          `Broken Links: ${brokenLinks}\n` +
                          `Active Links: ${activeLinks}\n\n` +
                          `List of Broken Links:\n` +
                          brokenLinksList.join('\n')       
          cy.writeFile('cypress/downloads/broken_links.txt', content)
      }) 
   })
   
   
  

})
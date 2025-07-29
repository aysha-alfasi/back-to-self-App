describe("Cover Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });
  
    it("should display the main title", () => {
      cy.contains("Back").should("exist");
      cy.contains("to self").should("exist");
    });
  
    it("should display and click the Dive in button", () => {
      cy.contains("Dive in").should("be.visible").click();
    });
  });
  
describe("Full flow to write a reflection", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("navigates from CoverPage to OptionsPage to ReflectionWritingArea and saves a reflection", () => {

    cy.contains("Dive in").click();


    cy.contains("Reflection Space").click();


    cy.get("[data-testid=writing-area]").type("This is reflection writing test!");

    
    cy.contains("Save").click();


    cy.contains("Your Reflection is added 🌸").should("be.visible");

    cy.contains("Ok").click();


    cy.contains("Your Reflection is added 🌸").should("not.exist");
  });

  it("does not save empty reflection", () => {
    cy.contains("Dive in").click();
    cy.contains("Reflection Space").click();


    cy.contains("Save").click();


    cy.contains("Your Reflection is added 🌸").should("not.exist");
  });
});

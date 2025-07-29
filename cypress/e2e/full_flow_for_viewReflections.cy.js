describe("Full app flow for ViewReflections with Cypress", () => {
  beforeEach(() => {
    const dummyReflections = [
      { text: "Reflection 1\nMore text" },
      { text: "Reflection 2\nMore text" },
    ];

    cy.visit("http://localhost:3000", {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          "reflections",
          JSON.stringify(dummyReflections)
        );
      },
    });
  });

  it("navigates from CoverPage to OptionsPage to ViewReflections, then reads, edits, saves, and deletes a reflection", () => {
    cy.contains("Dive in").click();
    cy.contains("View Reflection").click();

    cy.contains("Read more").should("be.visible");

    cy.contains("Read more").first().click();

    cy.contains("Reflection 1").should("be.visible");
    cy.contains("More text").should("be.visible");

    cy.contains("Edit").click();

    cy.get('[data-testid="edit-area"]')
      .clear()
      .type("Reflection 1\nAfter edit");

    cy.contains("Save").click();

    cy.contains("Your reflection was updated successfully!").should(
      "be.visible"
    );

    cy.contains("Close").click();

    cy.contains("Delete").first().click();

    cy.contains("Are you sure you want to delete this reflection?").should(
      "be.visible"
    );

    cy.contains("Yes, delete").click();

    cy.contains("Reflection deleted successfully! 🗑️").should("be.visible");

    cy.contains("Close").click();
  });
});

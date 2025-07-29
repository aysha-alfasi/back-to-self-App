import { render, screen, fireEvent, act } from "@testing-library/react";
import ViewReflections from "./ViewReflections";

const mockReflections = [
  { text: "Reflection 1\nMore text" },
  { text: "Reflection 2\nMore text" },
];

describe("ViewReflections Component", () => {
    
  let deleteReflectionMock;
  let editReflectionMock;

  beforeEach(() => {
    deleteReflectionMock = jest.fn();
    editReflectionMock = jest.fn();
  });

  beforeEach(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  });
  
  afterEach(() => {
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
  });

  it("renders reflections list", () => {
    render(
      <ViewReflections
        reflections={mockReflections}
        deleteReflection={deleteReflectionMock}
        editReflection={editReflectionMock}
      />
    );

    expect(screen.getByText(/Reflection 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Reflection 2/i)).toBeInTheDocument();
  });

  it("opens modal with full text on Read more click", () => {
    render(
      <ViewReflections
        reflections={mockReflections}
        deleteReflection={deleteReflectionMock}
        editReflection={editReflectionMock}
      />
    );
  
    fireEvent.click(screen.getAllByText("Read more")[0]);
    
    expect(
      screen.getByText((content) =>
        content.includes("Reflection 1") && content.includes("More text")
      )
    ).toBeInTheDocument();
  
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  it("starts editing mode when Edit button clicked", () => {
    render(
      <ViewReflections
        reflections={mockReflections}
        deleteReflection={deleteReflectionMock}
        editReflection={editReflectionMock}
      />
    );

    fireEvent.click(screen.getAllByText("Read more")[0]);
    fireEvent.click(screen.getByText("Edit"));

    expect(screen.getByTestId("edit-area")).toBeInTheDocument();
});

  it("saves edited reflection and calls editReflection", () => {
    render(
      <ViewReflections
        reflections={mockReflections}
        deleteReflection={deleteReflectionMock}
        editReflection={editReflectionMock}
      />
    );

    fireEvent.click(screen.getAllByText("Read more")[0]);
    fireEvent.click(screen.getByText("Edit"));

    const editableDiv = screen.getByTestId("edit-area");

 
    act(() => {
      editableDiv.innerText = "Updated reflection text";
      fireEvent.input(editableDiv);
    });

    fireEvent.click(screen.getByText("Save"));

    expect(editReflectionMock).toHaveBeenCalledWith(0, "Updated reflection text");
    expect(screen.getByText("Your reflection was updated successfully!")).toBeInTheDocument();
  });

  it("shows error on saving empty edited reflection", () => {
    render(
      <ViewReflections
        reflections={mockReflections}
        deleteReflection={deleteReflectionMock}
        editReflection={editReflectionMock}
      />
    );

    fireEvent.click(screen.getAllByText("Read more")[0]);
    fireEvent.click(screen.getByText("Edit"));

    const editableDiv = screen.getByTestId("edit-area");

    act(() => {
      editableDiv.innerText = "   ";
      fireEvent.input(editableDiv);
    });

    fireEvent.click(screen.getByText("Save"));

    expect(screen.getByText("You cannot save an empty reflection!")).toBeInTheDocument();
    expect(editReflectionMock).not.toHaveBeenCalled();
  });

  it("opens confirm delete modal and deletes reflection", () => {
    render(
      <ViewReflections
        reflections={mockReflections}
        deleteReflection={deleteReflectionMock}
        editReflection={editReflectionMock}
      />
    );

    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(screen.getByText("Are you sure you want to delete this reflection?")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Yes, delete"));

    expect(deleteReflectionMock).toHaveBeenCalledWith(0);
    expect(screen.getByText("Reflection deleted successfully! 🗑️")).toBeInTheDocument();
  });
});

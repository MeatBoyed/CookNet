import { Prisma } from "@prisma/client";

export const handlePrismaCreateErrors = (
  error: Prisma.PrismaClientKnownRequestError,
): string => {
  switch (error.code) {
    case "P2002":
      // Unique Constraint Violation
      // Handle: Check for duplicate entries before inserting, or provide a meaningful message to the user.
      console.error("Unique Constraint Violation:", error);
      return "You've already created this item";

    case "P2014":
      // Foreign Key Constraint Violation
      // Handle: Ensure that the referenced records exist before attempting to create the relationship.
      console.error("Foreign Key Constraint Violation:", error);
      return "An item you've referenced hasn't been created. Most likely an Ingredient";

    case "P2018":
    case "P2019":
      // Invalid Input Value
      // Handle: Validate input data before sending it to Prisma, and provide clear validation messages.
      console.error("Invalid Input Value:", error);
      return "The Recipe's input value is invalid";

    case "P2025":
      // Transaction Rollback
      // Handle: Rollback the transaction explicitly and provide a clear error message.
      console.error("Transaction Rollback:", error);
      return "A network error occured :(";

    case "P2015":
      // Concurrency Issues (Optimistic Locking)
      // Handle: Implement a strategy for handling concurrent updates, such as retrying the operation or notifying users about conflicts.
      console.error("Concurrency Issues (Optimistic Locking):", error);
      return "You're making more than 1 Recipe concurrently";

    default:
      // Unexpected Errors
      // Handle: Implement a generic error handling mechanism to log and notify administrators about unexpected errors.
      console.error("Unexpected Error:", error);
      return "An unexpected error occurred. Please Try Agaain";
  }
};

export const handlePrismaUpdateErrors = (
  error: Prisma.PrismaClientKnownRequestError,
): string => {
  switch (error.code) {
    case "P2025":
      return "Record Not Found (Update): The record you are trying to update does not exist.";
    case "Varies": // Replace 'Varies' with the actual error code for database connection issues
      return "Database Connection Issues: Issues connecting to the database server. Implement robust error handling for database connection issues, such as retry mechanisms or notifying administrators.";
    case "Varies": // Replace 'Varies' with the actual error code for unexpected errors
      return "Unexpected Errors: Unexpected errors that might occur due to various reasons. Implement a generic error handling mechanism to log and notify administrators about unexpected errors.";
    case "P2025":
      return "Transaction Rollback: A transaction is rolled back due to an error. Rollback the transaction explicitly and provide a clear error message.";
    case "P2015":
      return "Concurrency Issues (Optimistic Locking): Attempting to update a record that has been modified by another transaction. Implement a strategy for handling concurrent updates, such as retrying the operation or notifying users about conflicts.";
    case "P2014":
      return "Foreign Key Constraint Violation: Attempting to reference a non-existing foreign key. Ensure that the referenced records exist before attempting to update the relationship.";
    case "P2018":
    case "P2019":
      return "Invalid Input Value: Providing invalid input values (e.g., null in a non-nullable field). Validate input data before sending it to Prisma and provide clear validation messages.";
    default:
      return "Unknown Error: An unknown error occurred. Please contact support for assistance.";
  }
};

export const handlePrismaDeleteErrors = (
  error: Prisma.PrismaClientKnownRequestError,
): string => {
  switch (error.code) {
    case "P2025":
      // Record Not Found
      return "The record you are trying to delete does not exist or has already been deleted.";
    case "P2014":
      // Foreign Key Constraint Violation
      return "Cannot delete the record due to a foreign key constraint violation. Ensure referenced records exist.";
    case "P2015":
      // Concurrency Issues (Optimistic Locking)
      return "Concurrency issue: Another transaction has modified the record. Consider retrying or notifying users about conflicts.";
    case "P2018":
    case "P2019":
      // Invalid Input Value
      return "Invalid input values detected. Please validate the input data before deleting.";
    case "P2025":
      // Record Not Found or Transaction Rollback
      return "Error: The record does not exist, or a transaction was rolled back.";
    default:
      // Unexpected Errors or Database Connection Issues
      return "An unexpected error occurred. Please try again later or contact support.";
  }
};

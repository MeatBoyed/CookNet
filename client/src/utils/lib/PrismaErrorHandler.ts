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

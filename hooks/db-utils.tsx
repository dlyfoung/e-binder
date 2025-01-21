import * as SQLite from "expo-sqlite";

/**
 * Open a connection to the internal database.
 * @returns database.
 */
export function openDatabase(): SQLite.SQLiteDatabase {
  return SQLite.openDatabaseSync("ebinder");
}

/**
 * Check if the given error is of the specified type.
 * @param e Error thrown
 * @param errorType Error type to check
 * @returns whether the given error is of the specified type.
 */
export function checkDbError(e: Error, errorType: DbError): boolean {
  return getDbError(e) === errorType;
}

/**
 * Parse the error message to typify it.
 * @param e Error thrown.
 * @returns the error type.
 */
function getDbError(e: Error): DbError {
  if (contains(e, "no such table")) {
    return "no such table";
  }
  return "unknown";
}

function contains(e: Error, text: string): boolean {
  return e.message.indexOf(text) > -1;
}

export type DbError = "no such table" | "unknown";

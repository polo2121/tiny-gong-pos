export type ErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "DATABASE_ERROR"
  | "CONFLICT"
  | "UNKNOWN_ERROR";
  
export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  VALIDATION_ERROR: "Please check the form fields and try again.",
  UNAUTHORIZED:     "You need to log in to continue.",
  FORBIDDEN:        "You don't have permission to do this.",
  NOT_FOUND:        "The item you're looking for doesn't exist.",
  DATABASE_ERROR:   "Something went wrong. Please try again.",
  CONFLICT:         "This item already exists.",
  UNKNOWN_ERROR:    "Something went wrong. Please try again.",
};

  type AppErrorOptions = {
    code?: ErrorCode;

    userMsg?: string;
    context?: string;
    cause?: unknown;
    details?: unknown;
  }

  export class AppError extends Error {
    code: ErrorCode;
    userMsg: string;
    context: string;
    cause: unknown;
    details: unknown;

    constructor(message: string, options: AppErrorOptions = {}) {
        super(message);
        this.name = "AppError";
        this.code = options.code ?? "UNKNOWN_ERROR";
        this.userMsg = options.userMsg ?? ERROR_MESSAGES[this.code];
        this.context = options.context ?? "Unexpected Error";
        this.cause = options.cause ?? "No case attached to this eror.";
        this.details = options.details ?? "no details were attached to this error.";
    }
  }

  export function normalizeError(error: unknown): AppError {
    if(error instanceof AppError) return error;

    if(error instanceof Error) 
        return new AppError(error.message, {cause: error})

    return new AppError("An unexpected error occurred.", {cause: error})
  }

  export function getUserMessage(error: unknown): string {
    console.log(error)
    return normalizeError(error).userMsg as string;
  }
type Result<T, E extends Error = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

class CustomError extends Error {
  constructor(message: string, public custom: string = "custom value") {
    super(message);
  }
}

function foo(): Result<number, CustomError> {
  if (Math.random() > 0.5) {
    return { success: true, data: 5 };
  } else {
    return { success: false, error: new CustomError("pepito") };
  }
}

const result = foo();

if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error.custom);
}

async function asyncFoo(url: string): Promise<Result<number, CustomError>> {
  try {
    const result = await fetch(url);
    if (!result.ok) {
      return {
        success: false,
        error: new CustomError(result.statusText),
      };
    }
    const json = await result.json();
    if (typeof json !== "number") {
      return {
        success: false,
        error: new CustomError(
          `Se esperaba el tipo "number", pero se obtuvo el tipo "${typeof json}"`
        ),
      };
    }
    return { success: true, data: json };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error!";
    return { success: false, error: new CustomError(message) };
  }
}

const asyncResult = await asyncFoo("...");

if (asyncResult.success) {
  console.log(asyncResult.data);
} else {
  console.error(asyncResult.error);
}

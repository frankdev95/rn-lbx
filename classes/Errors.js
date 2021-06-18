export class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = "ConflictError";
    this.status = 409;
  }
}

export class UserValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserValidationError";
    this.status = 404;
  }
}

export class PasswordValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "PasswordValidationError";
    this.status = 401;
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.staus = 404;
  }
}

export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.status = 404;
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.status = 400;
  }
}

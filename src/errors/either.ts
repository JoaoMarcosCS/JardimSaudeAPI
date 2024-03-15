/* eslint-disable @typescript-eslint/no-unused-vars */
export type Either<E, S> = Error<E, S> | Success<E, S>;

export class Error<E, S> {
  value: E;

  constructor(value: E) {
    this.value = value;
  }

  isError(): this is Error<E, S> {
    return true;
  }

  isSuccess(): this is Success<E, S> {
    return false;
  }
}

export class Success<E, S> {
  value: S;

  constructor(value: S) {
    this.value = value;
  }

  isError(): this is Error<E, S> {
    return false;
  }

  isSuccess(): this is Success<E, S> {
    return true;
  }
}

export const error = <E, S>(error: E): Either<E, S> => {
  return new Error(error);
};

export const success = <E, S>(success: S): Either<E, S> => {
  return new Success(success);
};

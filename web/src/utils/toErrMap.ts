import { InputError } from "../generated/graphql";

export const toErrMap = (errors: InputError[]) => {
  const errMap: Record<string, string> = {};
  errors.forEach(({field, message}) => {
    errMap[field] = message
  })

  return errMap
}
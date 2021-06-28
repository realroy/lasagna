export type WrapPromiseArg<Arg, Return> = {
  f: (args: Arg) => Promise<Return>,
  args: Arg
}

export const wrapPromise = async <Arg, Return>({ f, args }: WrapPromiseArg<Arg, Return>): Promise<[Return, Error]> => {
  try {
    const result = await f(args)
    
    return [result, null]
  } catch (err) {
    return [null, err]
  }
}
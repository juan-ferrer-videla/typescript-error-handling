function foo(): number {
  if (Math.random() > 0.5) {
    return 1;
  } else {
    throw new Error("Ups!");
  }
}

const result = foo();

async function asyncFoo(url: string): Promise<number> {
  const result = await fetch(url);
  const json = await result.json();
  return json;
}

const asyncResult = await asyncFoo(
  "https://jsonplaceholder.typicode.com/todos/1"
);

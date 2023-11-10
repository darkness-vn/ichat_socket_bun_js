function identity1<T>(arg: T): T {
  return arg
}
function identity2<Type>(arg: Type): Type {
  return arg
}

let myIdentity: <Type>(arg: Type) => Type = identity2

class Model<T> {

  protected _doc!: T

  constructor(data: T) {
    this._doc = data
  }

  set doc(input: T) {
    console.log(`[SET] New value has been set to this model`)
    this._doc = input
  }

  get doc(): T {
    console.log(`[GET] Get this model data`)
    return this._doc
  }

  err() {
    console.log(`error`)
  }

}

interface User {
  username: string
  password: string
}

const user = new Model<User>({ username: "123", password: "321" })

user.doc = { username: "333", password: "555" }

console.log(user.doc)

type Person = { age: number; name: string; alive: boolean }
type Age = Person["age"]
type I1 = Person["age" | "name"]

class Human {

  public name!: string
  public age!: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}


class Gay extends Human {

  private isGay!: boolean

  constructor(name: string, age: number, isGay: boolean) {
    super(name, age)
    this.isGay = true
  }
}

// Free class
class FreeClass {
  [property: string]: string | ((property: string) => string);
 
  logger(property: string) {
    return this[property] as string;
  }
}

const member = new FreeClass()
member.name = "tung"
member.age = "25"

console.log(member.logger("age"))

interface Pingable {
  ping(): void;
}
 
class Sonar implements Pingable {
  ping() {
    console.log("ping!");
  }
}

interface MemberInfo {
  age: number;
  fullName: string;
}
 
type MemberName = "Tung" | "Linh";
 
const members: Record<MemberName, MemberInfo> = {
  Tung: { age: 10, fullName: "Persian" },
  Linh: { age: 5, fullName: "Maine Coon" }
};

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
 
type TodoPick = Pick<Todo, "title" | "completed">;
type TodoOmit = Omit<Todo, "completed">

const todo1: TodoPick = {
  title: "Clean room",
  completed: false,
};
const todo2: TodoOmit = {
  title: "Clean room",
  description: "123123123",
};
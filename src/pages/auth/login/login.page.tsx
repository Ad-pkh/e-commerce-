import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export function Login() {
  return (
    <form className=" items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 bg-teal-200">
      <div className="max-w-xl lg:max-w-3xl">
      <div>
        <div className="mb-2 block  text-black">
          <Label htmlFor="email1" value="Your email" style={{ color: "black" }}  /> 
        </div>
        <TextInput id="email1" type="email" placeholder="name@mail.com" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" style={{ color: "black" }}/>
        </div>
        <TextInput id="password1" type="password" required />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember" style={{ color: "black" }}>Remember me</Label>
      </div>
      <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
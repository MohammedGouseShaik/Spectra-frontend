import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image'

export default function LoginForm() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6 h-full">
          <Card className="overflow-hidden min-h-[84vh] flex flex-col">
            <CardContent className="grid p-0 md:grid-cols-2 flex-grow">
              <form className="p-6 md:p-8 flex flex-col items-center justify-center">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Forgot Password?</h1>
                    <p className="w-full text-muted-foreground">
                      Enter your email address to get the password reset link
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      aria-label="Email Address"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Password Reset
                  </Button>
                  <div className="text-center text-sm">
                    <a href="/" className="underline underline-offset-4">
                      Back to login
                    </a>
                  </div>
                </div>
              </form>
              <div className="relative hidden md:block">
                <Image
                  src="/logo_4.jpg"
                  width={1000}
                  height={1000}
                  alt="Login Image"
                  priority
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  )
}

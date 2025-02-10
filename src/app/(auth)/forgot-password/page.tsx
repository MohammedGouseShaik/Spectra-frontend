import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image';
export default function LoginForm() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
    <div className="flex flex-col gap-6 h-auto">
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                  <Image src="/logo.png" alt="Spectra-Logo" width={180} height={100} />
                                   
                <h1 className="text-xl font-bold mt-2">Forgot Password?</h1>
                <p className="w-full text-muted-foreground mt-2">
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
                />
              </div>
              
            
              <Button type="submit" className="w-full">
                Password Reset
              </Button>
              <div className="text-center text-sm">
                <a href="/login" className="underline underline-offset-4">
                  Back to login
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
          <Image
  src="/login_3.jpg"
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
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
    </div>
    </div>
  )
}
"use client"
import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {z} from "zod";

const nameSchema = z.string().min(3, "Name must be at least 3 characters").max(16, "Name cannot exceed 16 characters");
const emailSchema = z.string().email();
const passwordSchema = z.string().min(8, "Password must be at least 8 characters").max(32, "Password cannot exceed 32 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/, "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character");

const SignInSchema = z.object({
    email: emailSchema,
    password: passwordSchema });

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the sign-in logic
    if(validateInputs()){
        console.log('success')
    }else{
        console.log('error')
    }
  }
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name:""
  });

  const validateInputs = () => {
    let valid = true;
    const newErrors = { password: "", email: "", name:""};

    // Validate email
    const emailValidation = emailSchema.safeParse(email);
    if(!emailSchema.safeParse(email).success) {
      valid = false;
      newErrors.email = emailValidation.error.errors[0].message;    
    }

    // Validate password
    const passwordValidation = passwordSchema.safeParse(password);
    if(!passwordSchema.safeParse(password).success) {
      valid = false;
      newErrors.password = passwordValidation.error.errors[0].message;    
    }
    const nameValidation = nameSchema.safeParse(name);
    if(!nameSchema.safeParse(name).success) {
      valid = false;
      newErrors.name = nameValidation.error.errors[0].message;    
    }

    setErrors(newErrors);
    return valid;
    }

  return (
    <div className='flex h-screen items-center justify-center'>
        <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="name" className='text-sm font-semibold'>Name:</Label>
            {errors.name && <p className="text-red-500 text-sm font-semibold">{errors.name}</p>}
            <Input 
              id="name" 
              type="name" 
              placeholder="Enter your name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className='text-sm font-semibold'>Email:</Label>
            {errors.email && <p className="text-red-500 text-sm font-semibold">{errors.email}</p>}
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className='text-sm font-semibold'>Password:</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            {errors.password && <p className="text-red-500 text-sm font-semibold">{errors.password}</p>}
          </div>
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground font-semibold">
        Already have an account? {' '}
          <Link href="/sign-in" className="text-primary hover:underline text-sm font-semibold">
          Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
    </div>
  )
}
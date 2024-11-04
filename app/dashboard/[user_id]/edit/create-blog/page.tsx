"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import MultipleSelector, { Option } from '@/components/ui/multi-selector';
import { z } from "zod";

let Editor = dynamic(() => import("../../../../../components/editor/editor"), {
  ssr: false,
});

// Define Zod schemas for validation
const titleSchema = z.string().min(20, "Title must be at least 20 characters").max(125, "Title cannot exceed 125 characters");
const descriptionSchema = z.string().min(50, "Description must be at least 50 characters").max(255, "Description cannot exceed 255 characters");
const contentSchema = z.object({
  blocks: z.array(z.any()).min(1, "Content cannot be empty"),  // Customize based on your Editor's content structure
});
const categorySchema = z.array(z.string()).min(1, "Categories cannot be empty");
const OPTIONS: Option[] = [
  { label: 'nextjs', value: 'nextjs' },
  { label: 'React', value: 'react' },
  { label: 'Remix', value: 'remix' },
  { label: 'Vite', value: 'vite' },
  { label: 'Nuxt', value: 'nuxt' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Angular', value: 'angular' },
  { label: 'Ember', value: 'ember', disable: true },
  { label: 'Gatsby', value: 'gatsby', disable: true },
  { label: 'Astro', value: 'astro' },
];


export default function CreateBlog({ params }: { params: { user_id: string } }) {
  const [content, setContent] = useState({ blocks: [] });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    content: "",
    categories: ""
  });

  const validateInputs = () => {
    let valid = true;
    const newErrors = { title: "", description: "", content: "", categories: "" };

    // Validate title
    const titleValidation = titleSchema.safeParse(title);
    if (!titleValidation.success) {
      valid = false;
      newErrors.title = titleValidation.error.errors[0].message;
    }

    // Validate description
    const descriptionValidation = descriptionSchema.safeParse(description);
    if (!descriptionValidation.success) {
      valid = false;
      newErrors.description = descriptionValidation.error.errors[0].message;
    }

    // Validate content
    const contentValidation = contentSchema.safeParse(content);
    if (!contentValidation.success) {
      valid = false;
      newErrors.content = contentValidation.error.errors[0].message;
    }
    // Validate categories
    const categoryValidation = categorySchema.safeParse(categories);
    if (!categoryValidation.success) {
      valid = false;
      newErrors.categories = categoryValidation.error.errors[0].message;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      // Proceed with form submission
      console.log("Form is valid. Submitting...");
    } else {
      console.log("Form has validation errors.");
    }
  };

  return (
    <div className="flex p-4  flex-col w-full items-center justify-center gap-4">
      <div className="w-full bg-white  sticky top-0 z-10  flex items-center justify-center ">
      <div className="w-full md:w-6/12   p-2 bg-white flex items-center justify-between">
          <h1 className="text-3xl font-bold">Medium</h1>
          <div className="flex gap-4 items-center">
            <Button onClick={handleSubmit} size={"sm"} className=" font-semibold">Publish</Button>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div></div>
          </div>
      </div>
      </div>
      
      {/* Title Input */}
      <Input
        type="text"
         className="w-full md:w-5/12 "
        maxLength={125}
        minLength={20}
        placeholder="Title for the blog"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {errors.title && <p className="text-red-500">{errors.title}</p>}
      
      {/* Description Textarea */}
      <Textarea
        className="  h-32 md:w-5/12 "
        maxLength={255}
        minLength={50}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
       
      />
      {errors.description && <p className="text-red-500">{errors.description}</p>}

      {/* Categories */}  
      
      <MultipleSelector
        defaultOptions={OPTIONS}
        placeholder="Type something that does not exist in dropdowns..."
        creatable
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            no results found.
          </p>
        }
        onChange={(selectedOptions) => setCategories(selectedOptions.map((option) => option.value))}
         className=" w-full ml-auto mr-auto md:w-5/12"
         
      />
       {errors.categories && <p className="text-red-500 text-sm font-semibold">{errors.categories}</p>}
      
      {/* Editor */}
      <Editor
        data={content}
        onChange={(e: any) => setContent(e)}
        readOnly={false}
      />
      {errors.content && <p className="text-red-500">{errors.content}</p>}

      
    </div>
  );
}

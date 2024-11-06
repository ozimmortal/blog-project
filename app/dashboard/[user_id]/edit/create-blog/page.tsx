"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import MultipleSelector, { Option } from '@/components/ui/multi-selector';
import { set, z } from "zod";

let Editor = dynamic(() => import("../../../../../components/editor/editor"), {
  ssr: false,
});

// Define Zod schemas for validation
const titleSchema = z.string().min(20, "Title must be at least 20 characters").max(125, "Title cannot exceed 125 characters");
const descriptionSchema = z.string().min(50, "Description must be at least 50 characters").max(255, "Description cannot exceed 255 characters");
const contentSchema = z.object({
  blocks: z.array(z.any()).min(1, "Content cannot be empty"),  // Customize based on your Editor's content structure
});
const categorySchema = z.array(z.string()).min(1, "Categories cannot be empty").max(5, "Categories cannot exceed 5");
const OPTIONS: Option[] = [
  { label: 'Technology', value: 'technology' },
  { label: 'Programming', value: 'programming' },
  { label: 'Web Development', value: 'web-development' },
  { label: 'Mobile Development', value: 'mobile-development' },
  { label: 'Data Science', value: 'data-science' },
  { label: 'Machine Learning', value: 'machine-learning' },
  { label: 'Artificial Intelligence', value: 'artificial-intelligence' },
  { label: 'Blockchain', value: 'blockchain' },
  { label: 'Cybersecurity', value: 'cybersecurity' },
  { label: 'Cloud Computing', value: 'cloud-computing' },
  { label: 'DevOps', value: 'devops' },
  { label: 'Software Engineering', value: 'software-engineering' },
  { label: 'Game Development', value: 'game-development' },
  { label: 'Health', value: 'health' },
  { label: 'Lifestyle', value: 'lifestyle' },
  { label: 'Fitness', value: 'fitness' },
  { label: 'Finance', value: 'finance' },
  { label: 'Investing', value: 'investing' },
  { label: 'Personal Development', value: 'personal-development' },
  { label: 'Travel', value: 'travel' },
  { label: 'Food', value: 'food' },
  { label: 'Fashion', value: 'fashion' },
  { label: 'Parenting', value: 'parenting' },
  { label: 'Education', value: 'education' },
  { label: 'Science', value: 'science' },
  { label: 'Environment', value: 'environment' },
  { label: 'Politics', value: 'politics' },
  { label: 'Entertainment', value: 'entertainment' },
  { label: 'Movies', value: 'movies' },
  { label: 'Music', value: 'music' },
  { label: 'Books', value: 'books' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Entrepreneurship', value: 'entrepreneurship' },
  { label: 'Real Estate', value: 'real-estate' },
  { label: 'Photography', value: 'photography' },
  { label: 'Self-Help', value: 'self-help' },
  { label: 'Spirituality', value: 'spirituality' },
  { label: 'History', value: 'history' },
  { label: 'Psychology', value: 'psychology' },
  { label: 'Philosophy', value: 'philosophy' },
  { label: 'Design', value: 'design' },
  { label: 'Architecture', value: 'architecture' },
  { label: 'DIY', value: 'diy' },
  { label: 'Gardening', value: 'gardening' },
  { label: 'Pets', value: 'pets' },
  { label: 'Automotive', value: 'automotive' },
  { label: 'Sports', value: 'sports' },
  { label: 'News', value: 'news' },
];



export default function CreateBlog({ params }: { params: { user_id: string } }) {
  const [content, setContent] = useState({ blocks: [] });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [maxAmount, setOnMaxAmount] = useState("");
  const [amount, setAmount ] = useState(0);
  const max_options = 5;
  
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    content: "",
    categories: ""
  });
  useEffect(() => {
    console.log("Updated categories:", categories);
  }, [categories]);

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
        onChange={(selectedOptions) => {
          const l = selectedOptions.map((option) => option.value);
          setCategories(l); 
          setAmount(l.length); 
        }}
        
      
        maxSelected={max_options}
        onMaxSelected={(maxLimit) => {
          setOnMaxAmount("border-red-500 focus:border-red-500");
        }} 
         className={` w-full ml-auto mr-auto md:w-5/12  ${maxAmount}`}
         amount={amount}
         
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

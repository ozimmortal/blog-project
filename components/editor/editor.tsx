"use client";

import React, { useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Code from "@editorjs/code";
import List from "@editorjs/list";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import Quote from '@editorjs/quote';
import './editor.css';



interface EditorProps {
  data: OutputData;
  onChange: (data: OutputData) => void;
  readOnly?: boolean;
}

function Editor({ data, onChange,readOnly }: EditorProps) {
  // Add a reference to EditorJS instance
  const editorInstance = useRef<EditorJS | null>(null);
  const holderId = "editorjs";

  useEffect(() => {
    
    if (!editorInstance.current) {
      // Initialize EditorJS only if not already initialized
      const editor = new EditorJS({
        holder: holderId,
        placeholder: "Start writing here...",
        readOnly,
        autofocus: true,
        tools: {
           header:Header,
           code: Code,
           list: List,
           quote: Quote,
           image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: 'http://localhost:8008/api/upload-image', // Your backend file uploader endpoint
              }
            },
          }
          
        },
        
        data,
        async onChange(api) {
          const content = await api.saver.save();
          onChange(content);
        },
      });

      editorInstance.current = editor;
    }

    // Cleanup function to destroy the editor instance on unmount
    return () => {
      if (editorInstance.current && editorInstance.current.destroy) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);

  return (
    <div
      id={holderId}
      style={{
        width: "100%",
        minHeight: 500,
        borderRadius: "7px",
        backgroundColor: "#fff",
        
      }}
      
    />
  );
}

const style = {
  h1:{
    fontSize: "2rem",
    fontWeight: 700,
    lineHeight: 1.4
  }
}
export default Editor;
